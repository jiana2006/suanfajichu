(function() {
  // ==================== 1. 滚动动画 ====================
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('h2, h3, p, pre, .admonition, .grid.cards > *').forEach(el => {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });
  }

  // ==================== 2. Sakana 不倒翁 ====================
  window.initSakana = function() {
    if (typeof SakanaWidget === 'undefined') return;
    const oldWidget = document.getElementById('sakana-widget');
    if (oldWidget) oldWidget.remove();

    const container = document.createElement('div');
    container.id = 'sakana-widget';
    document.body.appendChild(container);

    new SakanaWidget({
      canSwitchCharacter: true,
      scale: 0.8,
    }).mount('#sakana-widget');
    console.log('✅ Sakana 不倒翁加载成功！');
  };

  if (!window.sakanaScriptLoaded) {
    window.sakanaScriptLoaded = true;
    const oldScript = document.getElementById('sakana-script');
    if (oldScript) oldScript.remove();

    const script = document.createElement('script');
    script.id = 'sakana-script';
    script.src = '/javascripts/sakana-widget.js?v=2'; 
    script.onload = window.initSakana;
    document.head.appendChild(script);
  } else if (window.sakanaScriptLoaded && typeof SakanaWidget !== 'undefined') {
    window.initSakana();
  }

  // ==================== 3. 智能文章页优化（完美兼容本地与线上） ====================
  function initArticlePage() {
    const path = window.location.pathname;
    
    // 判断是否是非文章页（兼容本地 127.0.0.1 与线上 GitHub Pages）
    const isHome = path === '/' || path.endsWith('/suanfajichu/') || path.endsWith('/index.html');
    const isSelectionPage = 
    path.includes('/basic-algo/') || 
    path.includes('/basic-lang/') || 
    path.includes('/math-skills/') || 
    path.includes('/core-algo/') ||
    path.includes('/route-plan/');
    
    const isNotArticle = isHome || isSelectionPage;

    if (!isNotArticle) {
      // 是文章页：打上标记，隐藏侧边栏
      document.body.classList.add('article-page');
      
      const article = document.querySelector('.md-content__inner');
      // 防止 SPA 切换时重复插入返回按钮
      const existingBackBtn = document.querySelector('.back-btn');
      if (existingBackBtn) existingBackBtn.remove();

      if (article) {
        // ⚠️ 关键修复：使用相对路径 "../" 返回上一级（即首页）
        // 这样无论是本地 127.0.0.1:8000/python/ 还是线上 .../suanfajichu/python/，都能正确回到首页
        const backBtnHtml = `<div style="margin-bottom: 2rem;"><a href="../" class="back-btn">← 返回首页</a></div>`;
        article.insertAdjacentHTML('afterbegin', backBtnHtml);
      }
    } else {
      // 是首页或分类页：移除标记，恢复正常侧边栏
      document.body.classList.remove('article-page');
      const existingBackBtn = document.querySelector('.back-btn');
      if (existingBackBtn) existingBackBtn.remove();
    }
  }

  // 完美兼容 MkDocs 的 SPA 机制
  if (typeof document$ !== 'undefined') {
    document$.subscribe(initArticlePage); 
  } else {
    document.addEventListener('DOMContentLoaded', initArticlePage);
  }
})();