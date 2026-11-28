/*!
 * 评论区（Waline）
 * ------------------------------------------------------------------
 * 专门适配 Material for MkDocs 的 navigation.instant：
 * 开启即时导航后，切页不会重新加载 JS，所以必须在 document$ 上订阅，
 * 每次换页时销毁旧实例、重新挂载，否则评论区会停留在上一篇文章。
 *
 * 配置写在 mkdocs.yml 的 extra.comments 里，由 overrides/main.html
 * 注入成 window.WALINE_CONFIG。改服务端地址 / 语言 / 必填项只改 yml，
 * 不用动这个文件。
 */
(function () {
  "use strict";

  /* ================= 版本 & CDN ================= */
  var CLIENT_VERSION = "3.16.1";
  var EMOJI_VERSION = "1.4.0";

  // 按顺序尝试，第一个成功的生效（jsdelivr 在国内偶尔抽风，留两个备胎）
  var CDN_LIST = [
    "https://fastly.jsdelivr.net/npm/@waline/client@" + CLIENT_VERSION + "/dist/",
    "https://cdn.jsdelivr.net/npm/@waline/client@" + CLIENT_VERSION + "/dist/",
    "https://unpkg.com/@waline/client@" + CLIENT_VERSION + "/dist/"
  ];

  var CONFIG = window.WALINE_CONFIG || {};
  var MOUNT_ID = "waline";

  var clientPromise = null; // import() 的缓存，全站只加载一次
  var cssInjected = false;
  var instance = null; // 当前 Waline 实例，切页时要销毁

  /* ================= 工具 ================= */
  function notice(host, html, kind) {
    if (!host) return;
    host.innerHTML =
      '<div class="comments-notice' +
      (kind ? " comments-notice--" + kind : "") +
      '">' +
      html +
      "</div>";
  }

  function injectCSS(base) {
    if (cssInjected) return;
    cssInjected = true;
    ["waline.css", "waline-meta.css"].forEach(function (file) {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = base + file;
      document.head.appendChild(link);
    });
  }

  /* ================= 加载客户端 ================= */
  function loadClient() {
    if (clientPromise) return clientPromise;

    clientPromise = new Promise(function (resolve, reject) {
      var index = 0;

      function attempt() {
        if (index >= CDN_LIST.length) {
          reject(new Error("Waline 客户端在所有 CDN 上都加载失败"));
          return;
        }
        var base = CDN_LIST[index++];
        import(base + "waline.js")
          .then(function (mod) {
            if (!mod || typeof mod.init !== "function") {
              throw new Error("模块中没有 init()");
            }
            injectCSS(base);
            resolve(mod.init);
          })
          .catch(attempt);
      }

      attempt();
    });

    return clientPromise;
  }

  /* ================= 默认表情 ================= */
  function defaultEmoji() {
    var base = "https://fastly.jsdelivr.net/npm/@waline/emojis@" + EMOJI_VERSION + "/";
    return [base + "weibo", base + "bilibili", base + "tw-emoji"];
  }

  /* ================= 组件选项 ================= */
  function buildOptions(host) {
    var opts = {
      el: host,
      serverURL: CONFIG.serverURL || CONFIG.server_url || "",
      lang: CONFIG.lang || "zh-CN",
      // Material 切深色时会给 <html> 加 data-md-color-scheme="slate"
      dark: CONFIG.dark || 'html[data-md-color-scheme="slate"]',
      // 昵称必填、邮箱网址选填 → 不注册也能评论
      requiredMeta: CONFIG.requiredMeta || ["nick"],
      login: CONFIG.login || "enable",
      meta: CONFIG.meta || ["nick", "mail", "link"],
      pageSize: CONFIG.pageSize || 10,
      commentSorting: CONFIG.commentSorting || "latest",
      noCopyright: CONFIG.noCopyright === true,
      // 默认关掉图片上传：Waline 默认把图片 Base64 存进数据库，很占空间
      imageUploader: CONFIG.imageUploader === true ? undefined : false,
      search: CONFIG.search === true,
      reaction: CONFIG.reaction === true,
      emoji: CONFIG.emoji || defaultEmoji()
    };

    if (CONFIG.pageview === true) opts.pageview = true;
    if (CONFIG.path) opts.path = CONFIG.path;

    return opts;
  }

  /* ================= 挂载 / 销毁 ================= */
  function destroy() {
    if (!instance) return;
    try {
      instance.destroy();
    } catch (e) {
      /* 旧 DOM 可能已经被即时导航整块换掉了，忽略即可 */
    }
    instance = null;
  }

  function mount() {
    var host = document.getElementById(MOUNT_ID);
    if (!host) return; // 这一页没有评论区（比如被 front matter 关了）

    destroy();

    if (CONFIG.enabled === false) {
      host.innerHTML = "";
      return;
    }

    if (!(CONFIG.serverURL || CONFIG.server_url)) {
      notice(
        host,
        "评论系统还没接上服务端 🐟<br>" +
          "把 <code>mkdocs.yml</code> 里 <code>extra.comments.serverURL</code> " +
          "填成你部署好的 Waline 地址，然后重新构建就行（步骤见 <code>COMMENTS.md</code>）。",
        "info"
      );
      return;
    }

    notice(host, '<span class="comments-spinner"></span>评论加载中…');

    loadClient()
      .then(function (init) {
        // 加载是异步的，回来时页面可能已经切走了 → 重新取一次容器
        var fresh = document.getElementById(MOUNT_ID);
        if (!fresh) return;
        fresh.innerHTML = "";
        instance = init(buildOptions(fresh));
      })
      .catch(function (err) {
        console.error("[comments]", err);
        notice(
          document.getElementById(MOUNT_ID),
          "评论组件加载失败了（CDN 可能被挡了），刷新页面试试。",
          "error"
        );
      });
  }

  /* ================= 接线 ================= */
  function boot() {
    // document$ 是 Material bundle 暴露的 RxJS 流，首屏和每次即时导航都会触发。
    // base.html 里 bundle 先于 extra_javascript 加载，所以这里一定能拿到。
    if (typeof document$ !== "undefined" && document$.subscribe) {
      document$.subscribe(mount);
    } else {
      // 没开 navigation.instant 时的兜底
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", mount);
      } else {
        mount();
      }
    }
  }

  boot();
})();
