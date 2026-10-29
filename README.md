# 喵喵基础算法

> 个人学习知识库 · 算法 / 数据结构 / 学习路线

用 **MkDocs + Material** 搭的个人算法笔记站，记录从入门到进阶的学习路径。

线上站点：<https://jiana2006.github.io/suanfajichu/>

---

## 内容板块

| 板块 | 内容 |
| --- | --- |
| 基础算法 | 编程语言（Python / C / C++ / Java）、数学技巧、核心算法（排序、二分、DP、贪心、回溯、图论、树、高精度、字符串…） |
| 数据结构 | 线性表、二叉树、栈、队列、堆、集合、哈希表、线段树、树状数组、字典树 |
| 学习路线 | 前端、后端、考研、考公、测试、AI、算法、嵌入式、网安 |

## 技术栈

- **MkDocs** + **Material for MkDocs**（teal 主题、深浅色切换）
- **中文搜索**：jieba 分词
- **评论系统**：Waline（填昵称即可评论，无需注册）
- **自动部署**：GitHub Actions → GitHub Pages

## 本地预览

双击 `wiki.bat`，或者手动：

```bash
pip install mkdocs mkdocs-material jieba
python -m mkdocs serve
```

然后打开 <http://127.0.0.1:8000/>。

> 改完 `mkdocs.yml` 或模板后 `serve` 会自动重建，不用重启。

## 部署

推送到 `main` 分支就会自动构建并发布（见 `.github/workflows/deploy.yml`）：

```bash
git add .
git commit -m "更新ing"
git push
```

等 Actions 跑完，打开 <https://jiana2006.github.io/suanfajichu/> 就是最新的。

## 目录结构

```text
my-wiki/
├── docs/                  # 所有笔记（Markdown）
│   ├── javascripts/       # 自定义脚本（extra.js、comments.js）
│   ├── stylesheets/       # 自定义样式（extra.css、comments.css）
│   └── assets/            # 图片、动图
├── overrides/             # 主题模板覆写
│   ├── main.html          # 评论容器注入
│   └── 404.html           # 自定义 404 页
├── mkdocs.yml             # 站点配置（导航、主题、评论…）
├── wiki.bat               # 一键本地预览
└── COMMENTS.md            # 评论系统部署与配置说明
```

## 评论区

站点每篇文章底部都接了 **Waline**，访客**填个昵称就能评论**，不用 GitHub 账号。

- 配置项在 `mkdocs.yml` 的 `extra.comments`
- 部署、调参、排错：[COMMENTS.md](COMMENTS.md)
- 管理后台：<https://pinglun-iota.vercel.app/ui>（删评论、审核、拉黑）

想单独关掉某篇文章的评论，在文件开头加：

```yaml
---
comments: false
---
```

## 说明

内容仅供个人学习参考，部分示例来自公开课程与文档。
