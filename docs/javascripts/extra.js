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
  
  // 定义初始化函数（注意这里大括号闭合完整）
  window.initSakana = function() {
    if (typeof SakanaWidget === 'undefined') {
      console.error('❌ SakanaWidget 未定义，文件加载失败！');
      return;
    }
    
    // 清理旧容器
    const oldWidget = document.getElementById('sakana-widget');
    if (oldWidget) oldWidget.remove();

    // 创建新容器
    const container = document.createElement('div');
    container.id = 'sakana-widget';
    document.body.appendChild(container);

    // 初始化并挂载（加上了你想要的配置）
    new SakanaWidget({
      canSwitchCharacter: true, // 允许点击切换角色（大肥鱼、瓦蕾莎等）
      scale: 0.8,               // 缩放比例
    }).mount('#sakana-widget');
    
    console.log('✅ Sakana 不倒翁加载成功！');
  }; // ⚠️ 这里必须有分号/大括号结束

  // 加载脚本的逻辑（必须放在 initSakana 函数外面！）
  if (!window.sakanaScriptLoaded) {
    window.sakanaScriptLoaded = true;
    
    // 清理旧的脚本标签（防止重复加载）
    const oldScript = document.getElementById('sakana-script');
    if (oldScript) oldScript.remove();

    const script = document.createElement('script');
    script.id = 'sakana-script';
    script.src = 'javascripts/sakana-widget.js?v=2'; 
    script.onload = window.initSakana; // 加载完后调用初始化
    document.head.appendChild(script);
    
  } else if (window.sakanaScriptLoaded && typeof SakanaWidget !== 'undefined') {
    // 如果已经加载过，页面切换时直接重新挂载
    window.initSakana();
  }
})();