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
    // 绝对路径，无论多深的404页面都能找到不倒翁
    script.src = '/suanfajichu/javascripts/sakana-widget.js?v=2'; 
    script.onload = window.initSakana;
    document.head.appendChild(script);
  } else if (window.sakanaScriptLoaded && typeof SakanaWidget !== 'undefined') {
    window.initSakana();
  }

  // ==================== 3. 智能文章页优化 ====================
  function initArticlePage() {
    // 防御：如果页面上存在自定义的 404 容器，立刻撤退！
    if (document.querySelector('.not-found-container')) return;

    const path = window.location.pathname;
    const isHome = path === '/' || path.endsWith('/suanfajichu/') || path.endsWith('/index.html');
    
    const isSelectionPage = 
      path.includes('/basic-algo/') || 
      path.includes('/basic-lang/') || 
      path.includes('/math-skills/') || 
      path.includes('/core-algo/') ||
      path.includes('/route-plan/') ||
      path.includes('/learning-tools/') || 
      path.includes('/404/') || 
      path.includes('/404.html');
      
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

  // ==================== 4. 404 页面随机吐槽文案与点击换词 ====================
  function init404RandomTip() {
    const tipElement = document.getElementById('random-tip');
    const avatar = document.querySelector('.not-found-avatar');

    if (tipElement) {
      const tips = [
        '这里空空如也，连大肥鱼都没游过来呢~',
        '哎呀，这条路上没有小行星哦，快回家吧！',
        '瓦蕾莎在这里找不到东西，急得团团转……',
        '咦？代码写错了吗？还是迷路了呀？',
        '别找了，这里只有空气，快回首页吃鱼吧！',
        '糟糕！大肥鱼把页面吃掉了！( ﹁ ﹁ ) ~',
        '这里是瓦蕾莎的秘密基地，闲人免进！',
        '再点我，我就把你吃掉！(๑•̀ㅂ•́)و✧'
      ];

      function changeTip() {
        const randomIndex = Math.floor(Math.random() * tips.length);
        tipElement.textContent = tips[randomIndex];
        tipElement.style.transform = 'scale(1.05)';
        setTimeout(() => {
          tipElement.style.transform = 'scale(1)';
        }, 150);
      }

      // 初始加载时随机抽一条
      changeTip();
      console.log('🎯 404页面随机文案已加载！');

      // 给瓦蕾莎绑定点击事件
      if (avatar) {
        avatar.onclick = null; 
        avatar.style.cursor = 'pointer'; 
        
        avatar.onclick = function() {
          changeTip();
          console.log('🎯 点击瓦蕾莎换词成功！');
          
          avatar.style.transform = 'scale(0.9)';
          setTimeout(() => {
            avatar.style.transform = 'scale(1)';
          }, 150);
        };
      }
    }
  }

  // ==================== 5. 左下角萌宠互动 ====================
  function initPet() {
    // 如果已经有萌宠了，就不再重复创建
    if (document.getElementById('pet-container')) return;

    // 创建萌宠容器
    const petContainer = document.createElement('div');
    petContainer.id = 'pet-container';
    petContainer.className = 'pet-container';

    // 气泡文字
    const bubble = document.createElement('div');
    bubble.className = 'pet-bubble';
    bubble.id = 'pet-bubble';
    bubble.textContent = '点我点我~';

    // 萌宠图片
    const img = document.createElement('img');
    img.className = 'pet-img';
    img.src = '/suanfajichu/assets/gif/doro.jpg'; 

    petContainer.appendChild(bubble);
    petContainer.appendChild(img);
    document.body.appendChild(petContainer);

    // 萌宠的台词库
    const petTips = [
      '喵喵喵~',
      '今天也要加油学算法哦！',
      '点我干嘛？(｡･ω･｡)',
      '大肥鱼在偷懒呢~',
      '别卷了，休息一下吧！',
      '你又在写 Bug 吗？',
      '嘿嘿，被你发现了！',
      '写完这段代码就去吃鱼吧！',
      '好困啊，陪我玩一会儿嘛~'
    ];

    // 点击互动逻辑
    petContainer.addEventListener('click', () => {
      const randomTip = petTips[Math.floor(Math.random() * petTips.length)];
      bubble.textContent = randomTip;
      bubble.classList.add('show');
      
      // 弹跳动画
      petContainer.style.transform = 'scale(0.8)';
      setTimeout(() => { petContainer.style.transform = 'scale(1.1)'; }, 150);
      setTimeout(() => { petContainer.style.transform = 'scale(1)'; }, 300);

      // 5秒后自动隐藏气泡
      clearTimeout(window.petBubbleTimer);
      window.petBubbleTimer = setTimeout(() => {
        bubble.classList.remove('show');
      }, 5000);
    });

    // 鼠标移出时自动隐藏
    petContainer.addEventListener('mouseleave', () => {
      bubble.classList.remove('show');
    });

    console.log('🐾 左下角萌宠已上线！');
  }

  // ==================== 6. 完美兼容 MkDocs SPA 机制 ====================
  if (typeof document$ !== 'undefined') {
    document$.subscribe(function() {
      initArticlePage();
      init404RandomTip();
      initPet(); // 每次页面切换都重新检查并召唤萌宠
    }); 
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      initArticlePage();
      init404RandomTip();
      initPet();
    });
  }
})();