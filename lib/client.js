window.__ModuleLoader__.load({
	id: "dsh-plugin-manager",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		//#region styles
		const css = ".pm_section{max-width:760px;color:var(--dsw-alias-label-primary);flex-direction:column;gap:12px;display:flex}.pm_headingRow{align-items:baseline;gap:10px;display:flex}.pm_heading{margin:0;font-size:18px;font-weight:600}.pm_counts{color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;font-size:12px;line-height:18px}.pm_intro{color:var(--dsw-alias-label-tertiary);margin:0;font-size:13px}.pm_status,.pm_empty{color:var(--dsw-alias-label-tertiary);margin:0;font-size:13px}.pm_failure{color:var(--dsw-alias-state-error-primary);align-items:center;gap:10px;display:flex}.pm_failure p{margin:0;font-size:13px}.pm_failure button{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;background:0 0;border-radius:6px;padding:4px 10px}.pm_search{width:100%;color:var(--dsw-alias-label-tertiary);align-items:center;display:flex;position:relative}.pm_search input{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);width:100%;height:36px;color:var(--dsw-alias-label-primary);font:inherit;border-radius:8px;outline:none;padding:0 12px;font-size:13px}.pm_search input::placeholder{color:var(--dsw-alias-label-tertiary)}.pm_search input:focus-visible{border-color:var(--dsw-alias-state-business-primary);box-shadow:0 0 0 2px color-mix(in srgb, var(--dsw-alias-state-business-primary) 18%, transparent)}.pm_groups{flex-direction:column;gap:12px;display:flex}.pm_group{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:12px;min-width:0;overflow:hidden}.pm_groupHead{align-items:center;gap:10px;padding:12px 14px;display:flex}.pm_groupName{min-width:0;color:var(--dsw-alias-label-primary);flex:1;font-size:14px;font-weight:600;line-height:20px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pm_count{color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;flex:none;font-size:12px;line-height:18px}.pm_badge{white-space:nowrap;border-radius:999px;flex:none;padding:1px 8px;font-size:11px;font-weight:500;line-height:17px}.pm_badgeNative{background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-secondary)}.pm_badgeUser{background:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary-foreground)}.pm_tag{white-space:nowrap;border-radius:999px;flex:none;padding:1px 8px;font-size:11px;font-weight:500;line-height:17px}.pm_tagOn{background:var(--dsw-alias-state-success-primary);color:var(--dsw-alias-label-primary-foreground)}.pm_tagOff{background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-secondary)}.pm_tagHint{background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-tertiary)}.pm_rows{margin:0;padding:0;border-top:1px solid var(--dsw-alias-border-l2);list-style:none}.pm_row{align-items:center;gap:10px;padding:9px 14px;display:flex}.pm_row+.pm_row{border-top:1px solid var(--dsw-alias-border-l2)}.pm_rowIdentity{min-width:0;flex-direction:column;gap:1px;flex:1;display:flex}.pm_rowName{min-width:0;color:var(--dsw-alias-label-primary);font-size:13px;font-weight:500;line-height:18px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pm_rowId{color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px}.pm_phase{color:var(--dsw-alias-label-caption);flex:none;font-size:11px;line-height:16px}.pm_dot{border-radius:50%;flex:none;width:8px;height:8px}.pm_dot[data-phase=active]{background:var(--dsw-alias-state-success-primary)}.pm_dot[data-phase=failed]{background:var(--dsw-alias-state-error-primary)}.pm_dot[data-phase=pending],.pm_dot[data-phase=loading],.pm_dot[data-phase=unloading]{background:var(--dsw-alias-state-business-primary)}.pm_dot[data-phase=unobserved]{background:var(--dsw-alias-label-tertiary)}.pm_switch{appearance:none;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-module-platform);border-radius:999px;flex:none;cursor:pointer;width:36px;height:20px;padding:2px;display:inline-flex;transition:background .16s,border-color .16s}.pm_switchThumb{background:var(--dsw-alias-label-secondary);border-radius:50%;width:14px;height:14px;transition:transform .16s,background .16s}.pm_switch[aria-checked=true]{background:var(--dsw-alias-state-success-primary);border-color:transparent}.pm_switch[aria-checked=true] .pm_switchThumb{background:var(--dsw-alias-label-primary-foreground);transform:translateX(16px)}.pm_switch:disabled{cursor:default;opacity:.45}.pm_switch:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.pm_note{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:18px}.pm_visuallyHidden{clip:rect(0 0 0 0);white-space:nowrap;width:1px;height:1px;position:absolute;overflow:hidden}";
		const tagId = "dsh-plugin-manager/styles";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-plugin-manager";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		const styles = {
			section: "pm_section",
			headingRow: "pm_headingRow",
			heading: "pm_heading",
			counts: "pm_counts",
			intro: "pm_intro",
			status: "pm_status",
			empty: "pm_empty",
			failure: "pm_failure",
			search: "pm_search",
			groups: "pm_groups",
			group: "pm_group",
			groupHead: "pm_groupHead",
			groupName: "pm_groupName",
			count: "pm_count",
			badge: "pm_badge",
			badgeNative: "pm_badgeNative",
			badgeUser: "pm_badgeUser",
			tag: "pm_tag",
			tagOn: "pm_tagOn",
			tagOff: "pm_tagOff",
			tagHint: "pm_tagHint",
			rows: "pm_rows",
			row: "pm_row",
			rowIdentity: "pm_rowIdentity",
			rowName: "pm_rowName",
			rowId: "pm_rowId",
			phase: "pm_phase",
			dot: "pm_dot",
			switch: "pm_switch",
			switchThumb: "pm_switchThumb",
			note: "pm_note",
			visuallyHidden: "pm_visuallyHidden"
		};
		//#endregion
		//#region helpers
		const PHASE_KEYS = {
			pending: "pending",
			loading: "loadingPhase",
			active: "active",
			failed: "failed",
			unloading: "unloading"
		};
		function phaseLabel(phase, t) {
			return phase === null ? t("unobserved") : t(PHASE_KEYS[phase] ?? "unobserved");
		}
		function moduleShortName(moduleName) {
			return (moduleName.startsWith("@") ? moduleName.slice(moduleName.indexOf("/") + 1) : moduleName).replace(/^cordis:/, "").replace(/^cordis-plugin-/, "").replace(/^dsh-(?:host-|client-)?/, "");
		}
		function clsx() {
			let out = "";
			for (const value of arguments) if (value) out += (out === "" ? "" : " ") + value;
			return out;
		}
		function Switch({ checked, disabled, onToggle, label }) {
			return (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "switch",
				"aria-checked": checked,
				"aria-label": label,
				className: styles.switch,
				disabled,
				onClick: onToggle,
				children: [(0, react_jsx_runtime.jsx)("span", { className: styles.switchThumb })]
			});
		}
		//#endregion
		//#region PluginManagerTab
		/** One entry row: identity, origin badge, phase, and the toggle switch. */
		function EntryRow({ entry, t, busy, run }) {
			const phase = phaseLabel(entry.fiberPhase, t);
			const name = moduleShortName(entry.moduleName);
			return (0, react_jsx_runtime.jsxs)("li", {
				className: styles.row,
				children: [
					entry.enabled ? (0, react_jsx_runtime.jsx)("span", {
						className: styles.dot,
						"data-phase": entry.fiberPhase ?? "unobserved",
						role: "img",
						"aria-label": phase,
						title: phase
					}) : null,
					(0, react_jsx_runtime.jsxs)("span", {
						className: styles.rowIdentity,
						children: [
							(0, react_jsx_runtime.jsx)("span", { className: styles.rowName, title: entry.moduleName, children: name }),
							(0, react_jsx_runtime.jsx)("code", { className: styles.rowId, children: entry.entryId })
						]
					}),
					(0, react_jsx_runtime.jsx)("span", {
						className: clsx(styles.badge, entry.origin === "native" ? styles.badgeNative : styles.badgeUser),
						children: t(entry.origin === "native" ? "originNative" : "originUser")
					}),
					entry.client ? (0, react_jsx_runtime.jsx)("span", {
						className: clsx(styles.tag, styles.tagHint),
						children: t("clientHint")
					}) : null,
					entry.toggleable ? null : (0, react_jsx_runtime.jsx)("span", {
						className: clsx(styles.tag, styles.tagHint),
						children: t("coreTag")
					}),
					(0, react_jsx_runtime.jsx)("span", { className: styles.phase, children: phase }),
					(0, react_jsx_runtime.jsx)(Switch, {
						checked: entry.enabled,
						disabled: !entry.toggleable || busy !== null,
						onToggle: () => {
							run(() => setRowEnabled(entry.rowId ?? entry.entryId, !entry.enabled), "row:" + entry.entryId);
						},
						label: (entry.enabled ? t("disable") : t("enable")) + ": " + entry.entryId
					})
				]
			});
		}
		/** One bundle group header plus its entry rows. */
		function BundleGroup({ group, t, busy, run, setRowEnabled, setBundleEnabled }) {
			const bundle = group.bundle;
			const isNative = bundle !== null && bundle.origin === "native";
			const heading = bundle !== null ? bundle.packageName : t("otherGroup");
			return (0, react_jsx_runtime.jsxs)("div", {
				className: styles.group,
				children: [
					(0, react_jsx_runtime.jsxs)("div", {
						className: styles.groupHead,
						children: [
							(0, react_jsx_runtime.jsx)("strong", {
								className: styles.groupName,
								title: bundle !== null ? bundle.packageName : void 0,
								children: heading
							}),
							(0, react_jsx_runtime.jsx)("span", {
								className: clsx(styles.badge, isNative ? styles.badgeNative : styles.badgeUser),
								children: t(isNative ? "originNative" : "originUser")
							}),
							bundle !== null ? (0, react_jsx_runtime.jsx)("span", {
								className: clsx(styles.tag, bundle.enabled ? styles.tagOn : styles.tagOff),
								children: t(bundle.enabled ? "enabledTag" : "disabledTag")
							}) : null,
							bundle !== null && !isNative ? (0, react_jsx_runtime.jsx)(Switch, {
								checked: bundle.enabled,
								disabled: busy !== null,
								onToggle: () => {
									run(() => setBundleEnabled(bundle.packageName, !bundle.enabled), "bundle:" + bundle.packageName);
								},
								label: t("toggleBundle") + ": " + bundle.packageName
							}) : null,
							(0, react_jsx_runtime.jsx)("span", { className: styles.count, children: String(group.entries.length) })
						]
					}),
					(0, react_jsx_runtime.jsx)("ul", {
						className: styles.rows,
						children: group.entries.map((entry) => (0, react_jsx_runtime.jsx)(EntryRow, { entry, t, busy, run, setRowEnabled }, entry.entryId))
					})
				]
			});
		}
		/**
		 * The managed inventory tab: bundles grouped by origin with per-row and
		 * per-user-bundle switches, plus a live search filter.
		 */
		function PluginManagerTab({ t, list, setRowEnabled, setBundleEnabled }) {
			const [state, setState] = (0, react.useState)({ status: "loading" });
			const [request, setRequest] = (0, react.useState)(0);
			const [query, setQuery] = (0, react.useState)("");
			const [busy, setBusy] = (0, react.useState)(null);
			const [lastError, setLastError] = (0, react.useState)(null);
			(0, react.useEffect)(() => {
				let current = true;
				setLastError(null);
				setState({ status: "loading" });
				Promise.resolve().then(list).then((snapshot) => {
					if (current) setState({ status: "ready", snapshot });
				}, (error) => {
					if (current) setState({ status: "error", message: String(error && error.message ? error.message : error) });
				});
				return () => {
					current = false;
				};
			}, [list, request]);
			const run = (action, key) => {
				setBusy(key);
				setLastError(null);
				Promise.resolve().then(action).then((snapshot) => {
					setState({ status: "ready", snapshot });
				}, (error) => {
					setLastError(String(error && error.message ? error.message : error));
				}).finally(() => {
					setBusy(null);
				});
			};
			const normalizedQuery = query.trim().toLocaleLowerCase();
			const groups = (0, react.useMemo)(() => {
				if (state.status !== "ready") return [];
				const byBundle = new Map();
				for (const bundle of state.snapshot.bundles) byBundle.set(bundle.packageName, { bundle, entries: [] });
				const others = [];
				const matches = (entry) => {
					if (normalizedQuery.length === 0) return true;
					return [entry.entryId, entry.moduleName, entry.packageName, entry.bundleName ?? ""].some((value) => value.toLocaleLowerCase().includes(normalizedQuery));
				};
				for (const entry of state.snapshot.entries) {
					if (!matches(entry)) continue;
					const group = entry.bundleName !== null && byBundle.has(entry.bundleName) ? byBundle.get(entry.bundleName) : null;
					if (group !== null) group.entries.push(entry);
					else others.push(entry);
				}
				const rows = [...byBundle.values()].filter((group) => group.entries.length > 0 || normalizedQuery.length === 0);
				if (others.length > 0) rows.push({ bundle: null, entries: others });
				return rows;
			}, [state, normalizedQuery]);
			const nativeCount = state.status === "ready" ? state.snapshot.entries.filter((entry) => entry.origin === "native").length : 0;
			const userCount = state.status === "ready" ? state.snapshot.entries.filter((entry) => entry.origin === "user").length : 0;
			const counts = state.status === "ready" ? `${nativeCount} ${t("nativeCount")} · ${userCount} ${t("userCount")} · ${state.snapshot.phaseCounts.disabled} ${t("disabledTag")}` : "";
			return (0, react_jsx_runtime.jsxs)("div", {
				className: styles.section,
				"aria-busy": state.status === "loading",
				children: [
					(0, react_jsx_runtime.jsxs)("div", {
						className: styles.headingRow,
						children: [
							(0, react_jsx_runtime.jsx)("h2", { className: styles.heading, children: t("title") }),
							counts !== "" ? (0, react_jsx_runtime.jsx)("span", { className: styles.counts, children: counts }) : null
						]
					}),
					(0, react_jsx_runtime.jsx)("p", { className: styles.intro, children: t("intro") }),
					state.status === "loading" ? (0, react_jsx_runtime.jsx)("p", { className: styles.status, children: t("loading") }) : null,
					state.status === "error" ? (0, react_jsx_runtime.jsxs)("div", {
						className: styles.failure,
						children: [
							(0, react_jsx_runtime.jsx)("p", { role: "alert", children: state.message ?? t("error") }),
							(0, react_jsx_runtime.jsx)("button", { type: "button", onClick: () => {
								setRequest((value) => value + 1);
							}, children: t("retry") })
						]
					}) : null,
					lastError !== null ? (0, react_jsx_runtime.jsxs)("div", {
						className: styles.failure,
						children: [
							(0, react_jsx_runtime.jsx)("p", { role: "alert", children: lastError }),
							(0, react_jsx_runtime.jsx)("button", { type: "button", onClick: () => {
								setRequest((value) => value + 1);
							}, children: t("retry") })
						]
					}) : null,
					state.status === "ready" ? (0, react_jsx_runtime.jsx)("label", {
						className: styles.search,
						children: [
							(0, react_jsx_runtime.jsx)("span", { className: styles.visuallyHidden, children: t("search") }),
							(0, react_jsx_runtime.jsx)("input", {
								type: "search",
								value: query,
								placeholder: t("search"),
								"aria-label": t("search"),
								onChange: (event) => {
									setQuery(event.currentTarget.value);
								}
							})
						]
					}) : null,
					state.status === "ready" && groups.length === 0 ? (0, react_jsx_runtime.jsx)("p", { className: styles.empty, children: t("empty") }) : null,
					state.status === "ready" && groups.length > 0 ? (0, react_jsx_runtime.jsx)("div", {
						className: styles.groups,
						children: groups.map((group, index) => (0, react_jsx_runtime.jsx)(BundleGroup, { group, t, busy, run, setRowEnabled, setBundleEnabled }, group.bundle !== null ? group.bundle.packageName : `other-${index}`))
					}) : null,
					state.status === "ready" ? (0, react_jsx_runtime.jsx)("p", { className: styles.note, children: t("note") }) : null
				]
			});
		}
		//#endregion
		//#region locales
		/** Simplified Chinese copy (key source of truth). */
		const zh = {
			tab: "启停管理",
			title: "插件启停",
			intro: "直接启用或停用插件,并区分内置(随 dsh 提供)与用户安装的插件。",
			search: "搜索插件",
			empty: "没有匹配的插件。",
			loading: "正在读取插件…",
			error: "暂时无法读取插件状态。",
			retry: "重试",
			originNative: "内置",
			originUser: "用户安装",
			enabledTag: "已启用",
			disabledTag: "已停用",
			coreTag: "核心",
			clientHint: "刷新后生效",
			enable: "启用",
			disable: "停用",
			toggleBundle: "整包启停",
			otherGroup: "其他条目",
			nativeCount: "内置",
			userCount: "用户安装",
			pending: "等待依赖",
			loadingPhase: "加载中",
			active: "已挂载",
			failed: "挂载失败",
			unloading: "卸载中",
			unobserved: "未挂载",
			note: "开关写入 profile 的用户补丁层(cordis.patch.yml):Host 行即时生效,浏览器行需刷新页面;核心行受保护,不可关闭。"
		};
		/** English copy checked against the Chinese key set. */
		const en = {
			tab: "Enable/disable",
			title: "Plugin enablement",
			intro: "Enable or disable plugins directly, distinguishing native (shipped with dsh) from user-installed plugins.",
			search: "Search plugins",
			empty: "No matching plugins.",
			loading: "Reading plugins…",
			error: "Plugin state is temporarily unavailable.",
			retry: "Retry",
			originNative: "Native",
			originUser: "User-installed",
			enabledTag: "Enabled",
			disabledTag: "Disabled",
			coreTag: "Core",
			clientHint: "Applies after refresh",
			enable: "Enable",
			disable: "Disable",
			toggleBundle: "Toggle bundle",
			otherGroup: "Other entries",
			nativeCount: "native",
			userCount: "user",
			pending: "Waiting for dependencies",
			loadingPhase: "Loading",
			active: "Mounted",
			failed: "Mount failed",
			unloading: "Unloading",
			unobserved: "Not mounted",
			note: "Switches write to the profile user patch layer (cordis.patch.yml): host rows apply live, browser rows need a page refresh; core rows are protected and cannot be toggled."
		};
		//#endregion
		//#region client/index.js
		/** Dictionary namespace owned by this plugin. */
		const NS = "settings.pluginManager";
		/** Required client services. */
		const inject = ["slots", "locale", "connection"];
		/** Mount the managed enable/disable tab into the Plugins settings section. */
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "dsh-plugin-manager: dictionaries");
			const t = ctx.locale.bind(NS);
			const invoke = async (method, args) => {
				const result = await ctx.connection.rpc.call("/api", `pluginManager/${method}`, { args });
				if (!result.ok) throw new Error(result.error?.message ?? `pluginManager/${method} failed`);
				return result.value;
			};
			const api = {
				list: () => invoke("list", {}),
				setRowEnabled: (entryId, enabled) => invoke("setRowEnabled", { entryId, enabled }),
				setBundleEnabled: (packageName, enabled) => invoke("setBundleEnabled", { packageName, enabled })
			};
			const injected = () => ({ ...api });
			ctx.slots.inject("settings.plugins.tab", () => ctx.slots.register({
				name: "settings.plugins.tab",
				id: "plugin-manager",
				order: 20,
				label: () => t("tab"),
				locale: NS,
				inject: injected
			}, PluginManagerTab));
		}
		//#endregion
		exports.NS = NS;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
