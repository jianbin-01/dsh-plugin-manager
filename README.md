# 🎛️ dsh-plugin-manager

> **在 Web 设置里直接启停 DeepSeek Harness 插件** —— 一键开关、整包管理,内置 / 用户安装一目了然。
> Enable or disable DeepSeek Harness plugins straight from the Web settings — one-click row & bundle toggles, native vs user-installed at a glance.

一个可即装即用的 **dsh bundle**:给 Web **设置 → 插件** 页新增「启停管理」标签,在浏览器里直接控制插件的启用与停用,并清楚区分**内置插件**(随 dsh 安装提供)与**用户安装**的插件。不修改任何 dsh 源码,通过标准的 profile bundle 机制挂载。

## ✨ 亮点 / Highlights

| | 功能 | 说明 |
|---|---|---|
| 🎚️ | **行级开关** | 任意 loader 条目一键启停;Host 行即时生效,无需重启 |
| 📦 | **整包开关** | 用户安装的 bundle 一键停用其全部行;内置包只读 |
| 🏷️ | **内置 / 用户安装** | 每个插件和 bundle 都带来源标识,一眼分辨 |
| 🛡️ | **核心保护** | loader / typert / 传输 / 存储等核心行禁止关闭,防误伤 |
| 🔍 | **搜索过滤** | 按名称 / 条目 / 包名实时过滤 |
| ⚡ | **即装即用** | 一条 `dsh plugin add` 命令 + 重启,零配置 |

![Screenshot](assets/screenshot.png)

## 🚀 安装 / Install

### 从 git 安装(推荐分发方式)

```powershell
$env:DSH_HOME = '<harness data 目录>'
dsh plugin --profile web add "git+https://github.com/jianbin-01/dsh-plugin-manager.git#v0.1.0"
```

然后**重启 web 服务器**(`dsh web`)并硬刷新页面即可。

> 本包**没有任何 prepare/build 脚本**,pnpm 不会触发 `allowBuilds` 拦截,对方装完即用。

### 从 tarball / 本地目录安装

```powershell
# tarball(推荐,无需 junction)
dsh plugin --profile web add ".\dsh-plugin-manager-0.1.0.tgz"

# 或本地源码目录(link: 安装,需先让依赖可解析)
New-Item -ItemType Junction -Path "<bundle-parent-dir>\node_modules" `
  -Target "<dsh-home>\profiles\node_modules"
dsh plugin --profile web add "<bundle-parent-dir>\dsh-plugin-manager"
```

### 卸载 / 升级

```powershell
dsh plugin --profile web remove dsh-plugin-manager   # 卸载
dsh plugin --profile web update                      # 升级
```

## ⚙️ 工作原理 / How it works

- `cordis.patch.yml` 挂载 `plugin-manager` host 行,模块即本包;默认导出是 Typert Remote 服务(`pluginManager.list / setRowEnabled / setBundleEnabled`)。
- api gateway 通过 **严格 typert 描述符**(`lib/typert.host.js` 的 `./typert` 导出,由 typert-loader 自动注册)认领 `pluginManager/*` 端点 —— 与官方 plugin-inventory 同一机制,不受 profile junction 布局下重复模块实例的影响。
- `package.json` 的 `dsh.client` 声明浏览器半部;`lib/client.js` 注册进 `settings.plugins.tab` 插槽,通过通用 `/api` RPC 通道调用远端。
- `origin`(内置 / 用户安装)按双锚点解析:包从 profile 自身 `node_modules` 链接而来即为用户安装,其余为内置。

## 📁 文件 / Files

| Path | Role |
| --- | --- |
| `cordis.patch.yml` | bundle patch:挂载 `plugin-manager` host 行 |
| `lib/index.js` | host 半部:`pluginManager` Remote 服务 |
| `lib/typert.host.js` | host 面 typert 清单(严格 wire 描述符) |
| `lib/client.js` | 浏览器半部:「启停管理」标签页 |
| `package.json` | `dsh.bundle.patch` + `dsh.client` + `./typert` 声明 |

## 📝 说明 / Notes

- 停用 bundle 的行不会从 `dsh.profile.bundles` 移除该包(即不卸载);完整卸载请用 `dsh plugin ... remove`。
- 重新启用被下层(如 `dsh-web-app`)停用的行,会写入显式 `disabled: false` 覆盖,符合补丁层语义。
- 开关写入 profile 的用户补丁层(`cordis.patch.yml`),保留文件头部注释。
- 本项目是上游功能(设置页启停 + 来源区分)的落地原型;长期理想归宿是 deepseek-harness 源码(`dsh-host-plugin-inventory` + `dsh-client-ui-settings-plugin-inventory` + `dsh-app-boot`)。

## 📄 License

MIT © jianbin-01
