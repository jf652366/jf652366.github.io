# Hexo + NexT 博客优化指南

本文档基于当前项目配置，为您提供针对性的优化建议，旨在提升网站性能、SEO 排名及用户体验。

## 1. 基础配置优化

### 1.1 完善站点信息 (SEO 基础)
修改 `_config.yml` 文件，补充完整的站点描述和关键词，这对于搜索引擎收录至关重要。

```yaml
# _config.yml
title: 柏川
subtitle: '技术 | 生活 | 思考'  # 建议添加副标题
description: '柏川的个人博客，分享技术心得、生活感悟和学习笔记。' # 必须添加，建议 80-150 字
keywords: '前端, Hexo, NexT, 博客, 技术分享' # 添加核心关键词
author: jf652366
language: zh-CN
```

### 1.2 URL 优化
当前配置使用了 `:year/:month/:day/:title/` 格式，路径层级较深。建议简化为 `:title/` 或 `:category/:title/`，更有利于 SEO。

```yaml
# _config.yml
permalink: posts/:abbrlink/  # 推荐使用 hexo-abbrlink 插件生成唯一短链接
# 或者
permalink: :title/
```
*注：修改 permalink 会导致旧链接失效，请慎重。*

## 2. 功能增强

### 2.1 开启本地搜索
NexT 主题支持本地搜索，无需依赖第三方服务。

1. **安装插件**：
   ```bash
   yarn add hexo-generator-searchdb
   ```
2. **修改站点配置文件 (`_config.yml`)**：
   ```yaml
   search:
     path: search.xml
     field: post
     format: html
     limit: 10000
   ```
3. **修改主题配置文件 (`_config.next.yml`)**：
   ```yaml
   local_search:
     enable: true
   ```

### 2.2 添加评论系统
增加读者互动。推荐使用 `Waline` (需部署服务端) 或 `Giscus` (基于 GitHub Discussions，无后端)。

**以 Giscus 为例**：
1. 修改 `_config.next.yml`：
   ```yaml
   comments:
     active: giscus
   giscus:
     repo: jf652366/jf652366.github.io # 替换为你的仓库
     repo_id: # 从 giscus 官网获取
     category: # 从 giscus 官网获取
     category_id: # 从 giscus 官网获取
   ```

### 2.3 RSS 订阅
让用户能订阅你的博客。

1. **安装插件**：
   ```bash
   yarn add hexo-generator-feed
   ```
2. **配置 (`_config.yml`)**：
   ```yaml
   feed:
     type: atom
     path: atom.xml
     limit: 20
   ```

## 3. 性能优化

### 3.1 代码压缩 (Minify)
压缩 HTML、CSS 和 JS 文件，减小体积，加快加载速度。

1. **安装插件**：
   ```bash
   yarn add hexo-neat
   ```
2. **配置 (`_config.yml`)**：
   ```yaml
   neat_enable: true
   neat_html:
     enable: true
     exclude:
   neat_css:
     enable: true
     exclude:
       - '**/*.min.css'
   neat_js:
     enable: true
     mangle: true
     output:
     compress:
     exclude:
       - '**/*.min.js'
   ```

### 3.2 图片懒加载 (Lazyload)
NexT 自带懒加载支持，但建议配合 `lozad.js` 或 `vanilla-lazyload`。

修改 `_config.next.yml`：
```yaml
lazyload: true
```
或者安装 `hexo-lazyload-image` 插件。

### 3.3 CDN 加速
将常用的第三方库（如 FontAwesome, jQuery 等）通过 CDN 加载，减轻 GitHub Pages 压力。

修改 `_config.next.yml`：
```yaml
vendors:
  plugins: cdnjs # 默认为 internal，改为 cdnjs 或 jsdelivr
```

## 4. 部署与自动化

### 4.1 持续集成 (GitHub Actions)
您已经配置了 `.github/workflows/deploy.yml`，这很好。可以考虑添加：
- **自动压缩图片**：在构建流程中加入图片压缩步骤。
- **SEO 检查**：构建完成后运行 Lighthouse 检查。

### 4.2 自定义域名
如果拥有个人域名，可以在 `source/CNAME` 文件中填入域名，提升专业度。

## 5. 写作体验优化

### 5.1 永久链接插件
安装 `hexo-abbrlink` 自动生成简短的永久链接，避免中文路径转码问题。

```bash
yarn add hexo-abbrlink
```
配置：
```yaml
# _config.yml
permalink: posts/:abbrlink/
abbrlink:
  alg: crc32 # 算法：crc16(default) or crc32
  rep: hex   # 进制：dec(default) or hex
```

### 5.2 自动打开新标签页
您已在配置中开启了外部链接在新标签页打开，这是好的实践。

---

## 推荐实施路线图

1. **本周**：完善 `_config.yml` 中的 SEO 信息（标题、描述、关键词）。
2. **下周**：安装 `hexo-generator-searchdb` 开启搜索功能。
3. **长期**：考虑接入评论系统和进行代码压缩优化。
