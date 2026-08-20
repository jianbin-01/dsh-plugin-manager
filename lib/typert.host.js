/* Hand-written host-face typert manifest for dsh-plugin-manager.
 *
 * The api gateway claims endpoints from strict local descriptors first
 * (`ctx.typert.local`), so registering this manifest — the same mechanism the
 * shipped plugin-inventory uses — makes `pluginManager/*` reachable without
 * relying on SRC-mode marker discovery (which is brittle across duplicate
 * module instances of dsh-typert-protocol under the profile junction layout).
 *
 * The typert-loader auto-imports this file when the `dsh-plugin-manager`
 * loader entry mounts (exports["./typert"]).
 */
import { z } from "zod";

const fiberPhaseSchema = z.union([
	z.literal("pending"),
	z.literal("loading"),
	z.literal("active"),
	z.literal("failed"),
	z.literal("unloading"),
	z.null()
]);
const originSchema = z.union([
	z.literal("native"),
	z.literal("user")
]);
const entrySchema = z.object({
	entryId: z.string(),
	rowId: z.string(),
	moduleName: z.string(),
	packageName: z.string(),
	bundleName: z.string().nullable(),
	origin: originSchema,
	enabled: z.boolean(),
	fiberPhase: fiberPhaseSchema,
	toggleable: z.boolean(),
	client: z.boolean(),
	version: z.string().nullable()
});
const bundleSchema = z.object({
	packageName: z.string(),
	origin: originSchema,
	enabled: z.boolean(),
	rowCount: z.number(),
	rows: z.array(z.string())
});
const snapshotSchema = z.object({
	profile: z.object({
		name: z.string(),
		patchPath: z.string()
	}),
	bundles: z.array(bundleSchema),
	entries: z.array(entrySchema),
	phaseCounts: z.object({
		active: z.number(),
		failed: z.number(),
		disabled: z.number()
	}),
	protectedRows: z.array(z.string())
});
const entryIdSchema = z.string().min(1);
const packageNameSchema = z.string().min(1);
const enabledSchema = z.boolean();

export const TYPERT = {
	package: "dsh-plugin-manager",
	face: "host",
	schemas: [],
	invocations: [
		{
			id: "dsh-plugin-manager#pluginManager/list",
			service: "pluginManager",
			namespace: "pluginManager",
			method: "list",
			invocation: { kind: "direct" },
			parameters: [],
			result: {
				mode: "strict",
				typeSymbol: "dsh-plugin-manager/types#PluginManagerSnapshot",
				schema: snapshotSchema
			}
		},
		{
			id: "dsh-plugin-manager#pluginManager/setRowEnabled",
			service: "pluginManager",
			namespace: "pluginManager",
			method: "setRowEnabled",
			invocation: { kind: "direct" },
			parameters: [
				{
					name: "entryId",
					wire: "entryId",
					source: "json",
					codec: { mode: "strict", typeSymbol: "dsh-plugin-manager/types#EntryId", schema: entryIdSchema }
				},
				{
					name: "enabled",
					wire: "enabled",
					source: "json",
					codec: { mode: "strict", typeSymbol: "dsh-plugin-manager/types#Enabled", schema: enabledSchema }
				}
			],
			result: {
				mode: "strict",
				typeSymbol: "dsh-plugin-manager/types#PluginManagerSnapshot",
				schema: snapshotSchema
			}
		},
		{
			id: "dsh-plugin-manager#pluginManager/setBundleEnabled",
			service: "pluginManager",
			namespace: "pluginManager",
			method: "setBundleEnabled",
			invocation: { kind: "direct" },
			parameters: [
				{
					name: "packageName",
					wire: "packageName",
					source: "json",
					codec: { mode: "strict", typeSymbol: "dsh-plugin-manager/types#PackageName", schema: packageNameSchema }
				},
				{
					name: "enabled",
					wire: "enabled",
					source: "json",
					codec: { mode: "strict", typeSymbol: "dsh-plugin-manager/types#Enabled", schema: enabledSchema }
				}
			],
			result: {
				mode: "strict",
				typeSymbol: "dsh-plugin-manager/types#PluginManagerSnapshot",
				schema: snapshotSchema
			}
		}
	],
	model: {
		services: [],
		events: [],
		objects: []
	}
};

export default TYPERT;
