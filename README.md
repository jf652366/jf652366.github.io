## jf652366.github.io

个人博客项目，基于 [VitePress](https://vitepress.dev/) 构建，使用自定义主题和少量脚本生成搜索索引 / RSS / 标签页，并部署到 GitHub Pages。

---

### 🛠 技术栈

- **框架**: VitePress 1.x
- **语言**: TypeScript / Markdown
- **样式与主题**: 自定义 VitePress 主题（`docs/.vitepress/theme`）
- **打包与脚本**: Node.js 脚本（搜索索引、RSS、标签）
- **包管理器**: Yarn（见 `package.json` 中 `packageManager` 字段）

---

### 🚀 快速开始

#### 1. 环境准备

- 安装 [Node.js](https://nodejs.org/)（推荐 18+）
- 安装 npm

#### 2. 安装依赖

```shell
npm install
```

#### 3. 本地开发

```bash
npm dev
```

默认会在 `http://localhost:5173`（或控制台输出的端口）启动 VitePress 开发服务器。

#### 4. 构建与预览

```bash
# 构建前会自动生成搜索索引 / RSS / 标签等静态文件
npm build

# 预览构建结果
npm serve
```

#### 5. 部署到 GitHub Pages

本地手动部署：

```bash
npm deploy
```

CI/CD 部署：

- 仓库已配置 GitHub Actions，会在推送到 `main` 分支时自动执行：
  - 安装依赖（Yarn）
  - 运行 `npm build`
  - 将 `.vitepress/dist` 发布到 GitHub Pages

如需使用个人 Token，可在仓库 Secrets 中配置 `PERSONAL_TOKEN`（需要 `repo` 权限），Actions 中会自动使用。


### 📄 License

MIT
