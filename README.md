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
- 安装 [Yarn](https://yarnpkg.com/)

#### 2. 安装依赖

```bash
yarn install
```

#### 3. 本地开发

```bash
yarn dev
```

默认会在 `http://localhost:5173`（或控制台输出的端口）启动 VitePress 开发服务器。

#### 4. 构建与预览

```bash
# 构建前会自动生成搜索索引 / RSS / 标签等静态文件
yarn build

# 预览构建结果
yarn serve
```

#### 5. 部署到 GitHub Pages

本地手动部署：

```bash
yarn deploy
```

CI/CD 部署：

- 仓库已配置 GitHub Actions，会在推送到 `main` 分支时自动执行：
  - 安装依赖（Yarn）
  - 运行 `yarn build`
  - 将 `docs/.vitepress/dist` 发布到 GitHub Pages

如需使用个人 Token，可在仓库 Secrets 中配置 `PERSONAL_TOKEN`（需要 `repo` 权限），Actions 中会自动使用。

---

### 📂 项目结构（简要）

```text
├── docs/                      # VitePress 源码根目录
│   ├── index.md               # 首页
│   ├── 常用网站.md            # 常用网站页
│   ├── tags/                  # 标签相关页面（由脚本生成）
│   └── .vitepress/
│       ├── config.ts          # VitePress 配置（导航 / 侧边栏 / 主题等）
│       ├── theme/             # 自定义主题（Layout / SearchBox 等）
│       └── public/            # 静态资源（图标、JS、CSS 等，会被复制到 dist）
├── scripts/                   # Node 脚本
│   ├── build-search-index.js  # 生成本地搜索索引（search-index.json）
│   ├── generate-feeds.js      # 生成 RSS 和 sitemap
│   └── generate-tags.js       # 根据 frontmatter tags 生成 tags 页面及 tags.xml
├── .github/workflows/         # CI/CD 配置（构建与部署）
├── package.json               # 依赖与脚本
└── yarn.lock                  # Yarn 锁文件
```

---

### 🔍 内容与标签

- 所有页面位于 `docs/` 目录，使用 Markdown 编写。
- 每个页面可以通过 frontmatter 设置：
  - `title`: 页面标题
  - `description`: 简要描述
  - `tags`: 标签数组（例如：`["常用"]`）
  - `date`: 日期（用于 RSS / 排序）
- `scripts/generate-tags.js` 会扫描所有 Markdown，生成：
  - `docs/tags/index.md`：标签总览
  - `docs/tags/<tag>.md`：某个标签下的页面列表
  - `docs/public/tags.xml`：简单的标签索引文件

---

### 📄 License

MIT
