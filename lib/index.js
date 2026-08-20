/**
 * dsh-plugin-manager — host half.
 *
 * A Typert Remote service exposed as `pluginManager.*` through the api
 * gateway's SRC-mode discovery (no generated typert artifacts needed): the
 * browser half calls it over the generic `/api` RPC channel.
 *
 * What it does:
 *  - `list()`: a snapshot of every loader entry plus every `dsh.profile.bundles`
 *    layer. Each entry/bundle carries an `origin` computed by two-anchor
 *    resolution — a package that resolves from the profile's own
 *    `node_modules` is a user-installed plugin, anything else is native to the
 *    installation (or a system row).
 *  - `setRowEnabled(entryId, enabled)`: writes `- id: <entryId>` +
 *    `disabled: true|false` into the profile's user patch layer
 *    (`cordis.patch.yml`). The profile boot already hot-watches that file
 *    (`watchUserPatches`), so host rows re-apply live; browser rows need a
 *    page refresh.
 *  - `setBundleEnabled(packageName, enabled)`: same, for every row a
 *    user-installed bundle's patch inserts. Native bundles are read-only here.
 *
 * Rows that would take the surface down with themselves (loader/typert/
 * transport/boot rows) are protected and refuse to toggle.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as yaml from "js-yaml";
import { entryListSchema } from "@deepseek-ai/cordis-plugin-include";
import { Remote, TypertRemoteService } from "@deepseek-ai/dsh-typert-protocol";

/** Wire namespace of this service (also its cordis service key). */
const NAME = "pluginManager";
/** The user patch layer file inside a profile directory (hot-reloaded). */
const PATCH_FILENAME = "cordis.patch.yml";
/** Bundles shipped with the installation; everything else in the bundles list is user-installed. */
const NATIVE_BUNDLES = new Set([
	"@deepseek-ai/dsh-base",
	"@deepseek-ai/dsh-web-app",
	"@deepseek-ai/dsh-headless"
]);
/** Rows that must never be toggled from the UI — disabling them breaks the surface. */
const PROTECTED_ROWS = new Set([
	"timer",
	"hmr",
	"loader",
	"include",
	"llm",
	"session",
	"typert",
	"typert-loader",
	"typert-gateway",
	"settings",
	"credentials",
	"modules",
	"connection",
	"api-gateway",
	"api-remotes",
	"client-runtime",
	"cordis-client-runner",
	"web-runtime",
	"webserver",
	"web-startup",
	"storage",
	"storage-json",
	"storage-domain",
	"locale",
	"ui-layout",
	"ui-settings",
	"ui-settings-general",
	"ui-settings-models",
	"ui-settings-plugins",
	"ui-settings-plugin-inventory",
	"ui-sidebar",
	"ui-conversation",
	"plugin-manager"
]);
/** Cordis Fiber state numbers → wire phase labels (mirrors the shipped inventory). */
const FIBER_PHASE = {
	0: "pending",
	1: "loading",
	2: "active",
	3: "failed",
	4: null,
	5: "unloading"
};
/** Strip a module specifier down to its package name (`@scope/pkg/sub` → `@scope/pkg`). */
function packageNameOf(spec) {
	if (typeof spec !== "string" || spec === "") return spec;
	if (spec.startsWith("@")) {
		const rest = spec.slice(1);
		const slash = rest.indexOf("/");
		if (slash !== -1) return `@${rest.slice(0, slash)}`;
	}
	const slash = spec.indexOf("/");
	return slash === -1 ? spec : spec.slice(0, slash);
}

// Compiled TC39-decorator helpers (this Node does not enable decorators by
// default; the shipped packages compile to this exact shape).
var __runInitializers = function(thisArg, initializers, value) {
	var useValue = arguments.length > 2;
	for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	return useValue ? value : void 0;
};
var __esDecorate = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	function accept(f) {
		if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
		return f;
	}
	var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	var _, done = false;
	for (var i = decorators.length - 1; i >= 0; i--) {
		var context = {};
		for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
		for (var p in contextIn.access) context.access[p] = contextIn.access[p];
		context.addInitializer = function(f) {
			if (done) throw new TypeError("Cannot add initializers after decoration has completed");
			extraInitializers.push(accept(f || null));
		};
		var result = (0, decorators[i])(kind === "accessor" ? {
			get: descriptor.get,
			set: descriptor.set
		} : descriptor[key], context);
		if (kind === "accessor") {
			if (result === void 0) continue;
			if (result === null || typeof result !== "object") throw new TypeError("Object expected");
			if (_ = accept(result.get)) descriptor.get = _;
			if (_ = accept(result.set)) descriptor.set = _;
			if (_ = accept(result.init)) initializers.unshift(_);
		} else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
		else descriptor[key] = _;
	}
	if (target) Object.defineProperty(target, contextIn.name, descriptor);
	done = true;
};

let _instanceExtraInitializers = [];
let _list_decorators;
let _setRowEnabled_decorators;
let _setBundleEnabled_decorators;

export default class PluginManagerGateway extends TypertRemoteService {
	static {
		const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(TypertRemoteService[Symbol.metadata] ?? null) : void 0;
		_list_decorators = [Remote("list")];
		__esDecorate(this, null, _list_decorators, {
			kind: "method",
			name: "list",
			static: false,
			private: false,
			access: {
				has: (obj) => "list" in obj,
				get: (obj) => obj.list
			},
			metadata: _metadata
		}, null, _instanceExtraInitializers);
		_setRowEnabled_decorators = [Remote("setRowEnabled")];
		__esDecorate(this, null, _setRowEnabled_decorators, {
			kind: "method",
			name: "setRowEnabled",
			static: false,
			private: false,
			access: {
				has: (obj) => "setRowEnabled" in obj,
				get: (obj) => obj.setRowEnabled
			},
			metadata: _metadata
		}, null, _instanceExtraInitializers);
		_setBundleEnabled_decorators = [Remote("setBundleEnabled")];
		__esDecorate(this, null, _setBundleEnabled_decorators, {
			kind: "method",
			name: "setBundleEnabled",
			static: false,
			private: false,
			access: {
				has: (obj) => "setBundleEnabled" in obj,
				get: (obj) => obj.setBundleEnabled
			},
			metadata: _metadata
		}, null, _instanceExtraInitializers);
		if (_metadata) Object.defineProperty(this, Symbol.metadata, {
			enumerable: true,
			configurable: true,
			writable: true,
			value: _metadata
		});
	}

	static inject = ["loader"];

	constructor(ctx) {
		super(ctx, NAME);
		this.profileDir = fileURLToPath(new URL(".", ctx.baseUrl));
		this.profileRequire = createRequire(join(this.profileDir, "package.json"));
		this.patchPath = join(this.profileDir, PATCH_FILENAME);
		this.pkgMetaCache = new Map();
		__runInitializers(this, _instanceExtraInitializers);
	}

	// ── Remote surface ──────────────────────────────────────────────────────

	/** Snapshot of bundles and entries with origins and toggle affordances. */
	list() {
		return this.snapshot();
	}

	/** Toggle one loader entry through the user patch layer. */
	setRowEnabled(entryId, enabled) {
		if (typeof entryId !== "string" || entryId === "") throw new Error("setRowEnabled: entryId must be a non-empty string");
		if (typeof enabled !== "boolean") throw new Error("setRowEnabled: enabled must be a boolean");
		const entry = this.findEntry(entryId);
		if (entry === void 0) throw new Error(`setRowEnabled: no loader entry named "${entryId}"`);
		const rowId = this.rowIdOf(entry);
		if (PROTECTED_ROWS.has(rowId)) throw new Error(`setRowEnabled: "${rowId}" is a protected core row and cannot be toggled`);
		this.applyIntent([[rowId, !enabled]]);
		return this.snapshot();
	}

	/** Toggle every row a user-installed bundle owns. Native bundles are read-only. */
	setBundleEnabled(packageName, enabled) {
		if (typeof packageName !== "string" || packageName === "") throw new Error("setBundleEnabled: packageName must be a non-empty string");
		if (typeof enabled !== "boolean") throw new Error("setBundleEnabled: enabled must be a boolean");
		if (NATIVE_BUNDLES.has(packageName)) throw new Error(`setBundleEnabled: "${packageName}" is a native system bundle; toggle its rows individually`);
		const owned = this.rowsOwnedBy(packageName).filter((id) => this.findEntry(id) !== void 0);
		if (owned.length === 0) throw new Error(`setBundleEnabled: "${packageName}" owns no live rows (is it a bundle with an insert patch?)`);
		const protectedOwned = owned.filter((id) => PROTECTED_ROWS.has(id));
		if (protectedOwned.length > 0) throw new Error(`setBundleEnabled: "${packageName}" owns protected core rows (${protectedOwned.join(", ")}) and cannot be toggled as a bundle`);
		this.applyIntent(owned.map((id) => [id, !enabled]));
		return this.snapshot();
	}

	// ── snapshot ────────────────────────────────────────────────────────────

	snapshot() {
		const bundles = this.readProfileManifest()?.dsh?.profile?.bundles ?? [];
		const bundleRows = new Map();
		for (const packageName of bundles) bundleRows.set(packageName, this.rowsOwnedBy(packageName));
		const ownedBy = new Map();
		for (const [packageName, rows] of bundleRows) for (const id of rows) if (!ownedBy.has(id)) ownedBy.set(id, packageName);
		const intent = this.readIntent();
		const entries = [];
		const byId = new Map();
		for (const entry of this.ctx.loader.entries()) {
			if (entry.options.group) continue;
			const row = this.entryView(entry, ownedBy, intent);
			entries.push(row);
			byId.set(row.rowId, row);
		}
		const bundleViews = bundles.map((packageName) => {
			const rows = (bundleRows.get(packageName) ?? []).filter((id) => byId.has(id));
			const enabled = rows.length === 0 ? true : rows.some((id) => this.effectiveEnabled(byId.get(id), intent));
			return {
				packageName,
				origin: NATIVE_BUNDLES.has(packageName) ? "native" : "user",
				enabled,
				rowCount: rows.length,
				rows
			};
		});
		const phaseCounts = { active: 0, failed: 0, disabled: 0 };
		for (const row of entries) {
			if (!row.enabled) phaseCounts.disabled += 1;
			else if (row.fiberPhase === "active") phaseCounts.active += 1;
			else if (row.fiberPhase === "failed") phaseCounts.failed += 1;
		}
		return {
			profile: {
				name: this.profileDir.split(/[\\/]+/).filter(Boolean).pop() ?? "",
				patchPath: this.patchPath
			},
			bundles: bundleViews,
			entries,
			phaseCounts,
			protectedRows: [...PROTECTED_ROWS]
		};
	}

	entryView(entry, ownedBy, intent) {
		const moduleName = entry.options.name ?? "";
		const packageName = packageNameOf(moduleName);
		const meta = this.pkgMeta(packageName);
		const rowId = this.rowIdOf(entry);
		const enabled = this.effectiveEnabled({
			rowId,
			enabled: !entry.disabled
		}, intent);
		return {
			entryId: entry.id,
			rowId,
			moduleName,
			packageName,
			bundleName: ownedBy.get(rowId) ?? null,
			origin: this.originOf(packageName),
			enabled,
			fiberPhase: entry.fiber === void 0 ? null : FIBER_PHASE[entry.fiber.state] ?? null,
			toggleable: !PROTECTED_ROWS.has(rowId),
			client: meta?.client === true,
			version: meta?.version ?? null
		};
	}

	effectiveEnabled(row, intent) {
		if (intent.has(row.rowId)) return !intent.get(row.rowId);
		return row.enabled;
	}

	// ── origin & package metadata ───────────────────────────────────────────

	/**
	 * Two-anchor origin: a package linked from the profile's own node_modules
	 * (directly or via a pnpm junction) is user-installed; everything else
	 * (installation closure, fallback links, unresolvable) is native/system.
	 */
	originOf(packageName) {
		const profileNodeModules = join(this.profileDir, "node_modules");
		try {
			return existsSync(join(profileNodeModules, packageName)) ? "user" : "native";
		} catch {
			return "native";
		}
	}

	pkgMeta(packageName) {
		const cached = this.pkgMetaCache.get(packageName);
		if (cached !== void 0) return cached;
		let meta = null;
		try {
			const pkgPath = this.profileRequire.resolve(`${packageName}/package.json`);
			const parsed = JSON.parse(readFileSync(pkgPath, "utf8"));
			meta = {
				client: parsed.dsh?.client?.platform === "web",
				version: typeof parsed.version === "string" ? parsed.version : null
			};
		} catch {
			meta = null;
		}
		this.pkgMetaCache.set(packageName, meta);
		return meta;
	}

	// ── bundle patch introspection ──────────────────────────────────────────

	/** Row ids a bundle's own patch inserts (its owned rows). */
	rowsOwnedBy(packageName) {
		let pkgDir;
		try {
			pkgDir = dirname(this.profileRequire.resolve(`${packageName}/package.json`));
		} catch {
			return [];
		}
		let manifest;
		try {
			manifest = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8"));
		} catch {
			return [];
		}
		const rel = manifest.dsh?.bundle?.patch;
		if (typeof rel !== "string") return [];
		const file = join(pkgDir, rel);
		if (!existsSync(file)) return [];
		let patches;
		try {
			patches = yaml.load(readFileSync(file, "utf8"), { schema: entryListSchema });
		} catch {
			return [];
		}
		const ids = [];
		for (const patch of Array.isArray(patches) ? patches : []) {
			if (patch === null || typeof patch !== "object" || !Array.isArray(patch.insert)) continue;
			for (const row of patch.insert) {
				if (row !== null && typeof row === "object" && typeof row.id === "string") ids.push(row.id);
			}
		}
		return ids;
	}

	// ── user patch layer ────────────────────────────────────────────────────

	readProfileManifest() {
		try {
			return JSON.parse(readFileSync(join(this.profileDir, "package.json"), "utf8"));
		} catch {
			return null;
		}
	}

	readPatches() {
		if (!existsSync(this.patchPath)) return [];
		try {
			const parsed = yaml.load(readFileSync(this.patchPath, "utf8"), { schema: entryListSchema });
			return Array.isArray(parsed) ? parsed : [];
		} catch {
			return [];
		}
	}

	readIntent() {
		const intent = new Map();
		for (const patch of this.readPatches()) {
			if (patch === null || typeof patch !== "object") continue;
			if (typeof patch.id === "string" && typeof patch.disabled === "boolean") intent.set(patch.id, patch.disabled);
		}
		return intent;
	}

	/**
	 * Merge `[rowId, disabled]` intents into the user patch layer, replacing
	 * any prior entry for the same row, and write the file back. The existing
	 * leading comment block is preserved; the row list itself is regenerated.
	 */
	applyIntent(intents) {
		const patches = this.readPatches().filter((patch) => {
			if (patch === null || typeof patch !== "object" || typeof patch.id !== "string") return true;
			return !intents.some(([id]) => id === patch.id);
		});
		for (const [id, disabled] of intents) patches.push({ id, disabled });
		this.writePatches(patches);
	}

	writePatches(patches) {
		const existing = existsSync(this.patchPath) ? readFileSync(this.patchPath, "utf8") : "";
		const head = /^(?:#[^\n]*\n?)*/.exec(existing)?.[0] ?? "";
		const body = yaml.dump(patches, { schema: entryListSchema, lineWidth: 120 });
		writeFileSync(this.patchPath, `${head}${body}`);
	}

	/**
	 * The patch-layer row id of a loader entry: the bare `options.id`
	 * (`timer`), which is what `cordis.patch.yml` entries target — the loader's
	 * public `entry.id` is namespaced by its parent chain (`include:timer`).
	 */
	rowIdOf(entry) {
		return entry.options?.id ?? entry.id;
	}

	/** Find a loader entry by its namespaced id or its bare row id. */
	findEntry(entryId) {
		for (const entry of this.ctx.loader.entries()) {
			if (entry.options.group) continue;
			if (entry.id === entryId || entry.options?.id === entryId) return entry;
		}
		return void 0;
	}
}
