# 评论区使用说明

给「喵喵基础算法」加的是 **Waline**（可匿名评论，不需要 GitHub 账号）。

分两步：**前端我已经接好了**，**后端（存评论的地方）得你自己点几下**，因为那要在 Vercel 上注册账号、建数据库，没法替你操作。

---

## 一、已经改好的东西

| 文件 | 改动 |
| --- | --- |
| `mkdocs.yml` | 新增 `extra.comments` 配置、`stylesheets/comments.css`、`javascripts/comments.js`；顺手把重复写了三遍的 `plugins` / `markdown_extensions` 合并了 |
| `overrides/main.html` | 新增。在正文末尾注入评论容器（`{{ super() }}` 保留原正文） |
| `docs/javascripts/comments.js` | 新增。加载 Waline、适配 `navigation.instant`、深色模式跟随 |
| `docs/stylesheets/comments.css` | 新增。teal 配色卡片样式 |

现在 `mkdocs serve` 打开任意页面，底部会看到评论区卡片和一句「评论系统还没接上服务端 🐟」——这是正常的，等你把下面第二步做完就会变成真正的评论框。

---

## 二、部署后端（约 10 分钟）

### 1. 一键部署到 Vercel

点这个按钮（官方模板）：

> <https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample>

- 用 **GitHub 账号**登录 Vercel
- 项目名随便填，比如 `my-wiki-comments`，点 `Create`
- 等烟花放完（一两分钟后），如果报 `500 This Serverless Function has crashed` **别慌**，这是还没连数据库，下一步做完就好

### 2. 建数据库（Neon，免费）

1. Vercel 左侧 `Storage` → `Create Database`
2. 在 `Marketplace Database Providers` 里选 **Neon** → `Continue`
3. 会让你注册 Neon 账号，选 `Accept and Create`
4. 套餐、地区保持默认，一路 `Continue`
5. 数据库名字不用改，直接 `Create`
6. 回到 `Storage` 点 `Connect` → `Connect Project`，连到你刚建的项目

### 3. 建表

1. 数据库详情页点 `Open in Neon`
2. 左侧 `SQL Editor`
3. 把 <https://github.com/walinejs/waline/blob/main/assets/waline.pgsql> 里的 SQL **整段粘贴**进去，点 `Run`
4. 执行完回到 Vercel → `Deployments` → 选最新那条 → `Redeploy`

### 4. 拿到你的地址

等状态变成 `Ready`，点 `Visit` 打开的那个域名，就是你的 **serverURL**，形如：

```
https://my-wiki-comments-xxxx.vercel.app
```

---

## 三、把地址填进 mkdocs.yml

打开 `mkdocs.yml`，找到这一行：

```yaml
extra:
  comments:
    enabled: true
    serverURL: ""        # ← 填这里
```

改成：

```yaml
    serverURL: "https://my-wiki-comments-xxxx.vercel.app"
```

然后本地跑起来看效果：

```bat
wiki.bat
```

或者直接：

```bash
python -m mkdocs serve
```

评论发一条试试，成功就说明通了。推送后 GitHub Actions 会自动重新部署站点。

> 注意：改完 `serverURL` 要**重新构建**才会生效（`serve` 会自动重建）。

---

## 四、当管理员 / 审核评论

部署完先跑去注册，**第一个注册的人自动成为管理员**：

```
https://你的域名/ui/register
```

登记后访问 `https://你的域名/ui` 就是评论管理后台，可以删除、置顶、标记垃圾评论。

> 建议部署完立刻去注册占位，别让别人抢了管理员。

---

## 五、可调的项目（都在 `mkdocs.yml` 的 `extra.comments` 里）

| 配置 | 说明 |
| --- | --- |
| `requiredMeta` | 现在 `["nick"]` = 昵称必填、邮箱网址选填。想强制留邮箱改成 `["nick", "mail"]` |
| `login` | `enable` 允许注册但非必须；`disable` 只能填信息评论；`force` 必须注册登录 |
| `pageSize` | 每页评论条数 |
| `commentSorting` | `latest` / `oldest` / `hottest` |
| `pageview: true` | 开启文章浏览量统计 |
| `imageUploader: true` | 允许评论传图（默认关闭，因为图片会 Base64 存进数据库，很占空间） |
| `dark` | 深色模式跟随，已自动适配 Material 的 `data-md-color-scheme` |

### 单独关掉某一页的评论

在那篇 md 文件最上面加：

```yaml
---
comments: false
---
```

门户首页 `/index.md` 这种纯导航页，如果需要也可以这样关掉。

---

## 六、常见问题

**Q：评论区一直转圈 / 报 `[comments]` 错误**
多半是 `@waline/client` 的 CDN 被挡了。`comments.js` 里已经按 `fastly.jsdelivr.net` → `cdn.jsdelivr.net` → `unpkg.com` 依次重试。如果三个都慢，可以把 `dist/waline.js`、`waline.css`、`waline-meta.css` 下载到 `docs/javascripts/` 下自托管，然后改 `comments.js` 顶部的 `CDN_LIST`。

**Q：切页之后评论还是上一篇文章的**
不会。`comments.js` 订阅了 Material 的 `document$`，每次即时导航都会销毁旧实例重新挂载。如果你的 `extra.js` 里有影响 DOM 的逻辑，注意别把 `#waline` 容器删了。

**Q：评论会不会丢？**
评论存在**你的** Neon 数据库里，跟 GitHub Pages 无关。换了站点部署方式，评论也还在。

**Q：国内访问 Vercel 慢**
可以在 Vercel 里绑自己的域名，或者换 Zeabur / CloudBase 部署（Waline 官方都有教程），换完只改 `serverURL` 一处即可，前端不用动。

---

## 七、参考

- Waline 官方文档：<https://waline.js.org/>
- Vercel 部署步骤：<https://waline.js.org/guide/deploy/vercel.html>
- 客户端配置项：<https://waline.js.org/reference/client/props.html>
