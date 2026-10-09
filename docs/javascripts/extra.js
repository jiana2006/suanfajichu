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
    // ⚠️ 这里去掉了最前面的斜杠 /，完美修复不倒翁失踪！
    script.src = 'javascripts/sakana-widget.js?v=2'; 
    script.onload = window.initSakana;
    document.head.appendChild(script);
  } else if (window.sakanaScriptLoaded && typeof SakanaWidget !== 'undefined') {
    window.initSakana();
  }

  // ==================== 3. 智能文章页优化 ====================
  function initArticlePage() {
    const path = window.location.pathname;
    
    const isHome = path === '/' || path.endsWith('/suanfajichu/') || path.endsWith('/index.html');
    const isSelectionPage = 
      path.includes('/basic-algo/') || 
      path.includes('/basic-lang/') || 
      path.includes('/math-skills/') || 
      path.includes('/core-algo/') ||
      path.includes('/route-plan/');
    
    const isNotArticle = isHome || isSelectionPage;

    if (!isNotArticle) {
      document.body.classList.add('article-page');
      
      const article = document.querySelector('.md-content__inner');
      const existingBackBtn = document.querySelector('.back-btn');
      if (existingBackBtn) existingBackBtn.remove();

      if (article) {
        const backBtnHtml = `<div style="margin-bottom: 2rem;"><a href="../" class="back-btn">← 返回首页</a></div>`;
        article.insertAdjacentHTML('afterbegin', backBtnHtml);
      }
    } else {
      document.body.classList.remove('article-page');
      const existingBackBtn = document.querySelector('.back-btn');
      if (existingBackBtn) existingBackBtn.remove();
    }
  }

  if (typeof document$ !== 'undefined') {
    document$.subscribe(initArticlePage); 
  } else {
    document.addEventListener('DOMContentLoaded', initArticlePage);
  }
})();