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

  // ==================== 5. 左下角萌宠互动（终极可视化编辑版） ====================
  function initPet() {
    // 检查用户是否隐藏了萌宠
    const isHidden = localStorage.getItem('petHidden') === 'true';

    // 如果已经有萌宠了，不再重复创建
    if (document.getElementById('pet-container')) return;

    // 1. 创建“召回按钮”
    if (!document.getElementById('pet-recall-btn')) {
      const recallBtn = document.createElement('div');
      recallBtn.id = 'pet-recall-btn';
      recallBtn.className = 'pet-recall-btn';
      recallBtn.innerHTML = '🐾';
      recallBtn.title = '召唤看板娘';
      recallBtn.onclick = () => {
        localStorage.setItem('petHidden', 'false');
        recallBtn.style.display = 'none';
        initPet();
      };
      document.body.appendChild(recallBtn);
    }

    const recallBtn = document.getElementById('pet-recall-btn');
    if (isHidden) {
      recallBtn.style.display = 'flex';
      return;
    } else {
      recallBtn.style.display = 'none';
    }

    // 2. 创建萌宠容器
    const petContainer = document.createElement('div');
    petContainer.id = 'pet-container';
    petContainer.className = 'pet-container';

    // 从本地存储恢复位置和大小
    const savedLeft = localStorage.getItem('petLeft');
    const savedTop = localStorage.getItem('petTop');
    const savedSize = localStorage.getItem('petSize') || '80'; // 默认80px
    
    if (savedLeft && savedTop) {
      petContainer.style.left = savedLeft + 'px';
      petContainer.style.top = savedTop + 'px';
      petContainer.style.bottom = 'auto';
    }

    const bubble = document.createElement('div');
    bubble.className = 'pet-bubble';
    bubble.id = 'pet-bubble';
    bubble.textContent = '点我点我~';

    const img = document.createElement('img');
    img.className = 'pet-img';
    img.id = 'pet-img';
    img.style.width = savedSize + 'px';
    img.style.height = savedSize + 'px';
    img.src = localStorage.getItem('petImgSrc') || '/suanfajichu/assets/gif/doro.jpg';

    // 控制按钮（隐藏 + 设置 + 换装）
    const controls = document.createElement('div');
    controls.className = 'pet-controls';
    controls.innerHTML = `
      <button id="pet-close" title="隐藏我">×</button>
      <button id="pet-settings" title="编辑台词与大小">✏️</button>
      <button id="pet-change" title="换角色">🎨</button>
    `;

    petContainer.appendChild(bubble);
    petContainer.appendChild(img);
    petContainer.appendChild(controls);
    document.body.appendChild(petContainer);

    // 3. 台词与状态管理
    const defaultTips = [
      '喵喵喵~', '今天也要加油学算法哦！', '点我干嘛？(｡･ω･｡)',
      '大肥鱼在偷懒呢~', '别卷了，休息一下吧！', '你又在写 Bug 吗？',
      '嘿嘿，被你发现了！', '写完这段代码就去吃鱼吧！', '好困啊，陪我玩一会儿嘛~'
    ];

    let petTips = JSON.parse(localStorage.getItem('petTips')) || [...defaultTips];
    let currentTipIndex = parseInt(localStorage.getItem('petTipIndex')) || 0; // 记录当前播放到第几条

    // 顺序获取下一条台词
    function getNextTip() {
      if (petTips.length === 0) return '点我干嘛？';
      const tip = petTips[currentTipIndex];
      currentTipIndex = (currentTipIndex + 1) % petTips.length; // 循环播放
      localStorage.setItem('petTipIndex', currentTipIndex);
      return tip;
    }

    // 点击萌宠换词（改为顺序播放）
    img.addEventListener('click', (e) => {
      if (petContainer.dataset.dragging === 'true') return;
      
      bubble.textContent = getNextTip();
      bubble.classList.add('show');
      
      petContainer.style.transform = 'scale(0.8)';
      setTimeout(() => { petContainer.style.transform = 'scale(1.1)'; }, 150);
      setTimeout(() => { petContainer.style.transform = 'scale(1)'; }, 300);

      clearTimeout(window.petBubbleTimer);
      window.petBubbleTimer = setTimeout(() => {
        bubble.classList.remove('show');
      }, 4000);
    });

    // 隐藏
    document.getElementById('pet-close').addEventListener('click', (e) => {
      e.stopPropagation();
      petContainer.style.display = 'none';
      localStorage.setItem('petHidden', 'true');
      const rb = document.getElementById('pet-recall-btn');
      if (rb) rb.style.display = 'flex';
    });

    // 4. 设置面板（编辑器 + 大小调节）
    document.getElementById('pet-settings').addEventListener('click', (e) => {
      e.stopPropagation();
      openSettingsModal(petTips, savedSize, (newTips, newSize) => {
        petTips = newTips;
        localStorage.setItem('petTips', JSON.stringify(petTips));
        currentTipIndex = 0; // 重置索引
        localStorage.setItem('petTipIndex', 0);
        
        img.style.width = newSize + 'px';
        img.style.height = newSize + 'px';
        localStorage.setItem('petSize', newSize);

        // 立即展示第一条
        bubble.textContent = getNextTip();
        bubble.classList.add('show');
        clearTimeout(window.petBubbleTimer);
        window.petBubbleTimer = setTimeout(() => { bubble.classList.remove('show'); }, 3000);
      });
    });

    // 5. 换角色
    document.getElementById('pet-change').addEventListener('click', (e) => {
      e.stopPropagation();
      const presetImages = {
        '1': '/suanfajichu/assets/gif/doro.jpg',
        '2': '/suanfajichu/assets/gif/valesa.jpg',
        '3': '/suanfajichu/assets/gif/ciallo.jpg',
        '4': '/suanfajichu/assets/gif/tafei.jpg'
      };
      const choice = prompt("输入数字更换角色：\n1. Doro 🐱\n2. 瓦蕾莎 🧝‍♀️\n3. Ciallo 🌸\n4. Tafei 🐼\n\n或者直接粘贴图片 URL：", "1");
      
      if (choice) {
        let newSrc = presetImages[choice] || choice;
        img.src = newSrc;
        localStorage.setItem('petImgSrc', newSrc);
      }
    });

    // 6. 拖拽移动
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    petContainer.addEventListener('mousedown', (e) => {
      if (e.target.closest('.pet-controls') || e.target.closest('.pet-bubble')) return;
      isDragging = true;
      petContainer.dataset.dragging = 'false';
      startX = e.clientX;
      startY = e.clientY;
      const rect = petContainer.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;
      petContainer.style.cursor = 'grabbing';
      petContainer.style.transition = 'none';
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) petContainer.dataset.dragging = 'true';
      petContainer.style.left = `${initialLeft + dx}px`;
      petContainer.style.top = `${initialTop + dy}px`;
      petContainer.style.bottom = 'auto';
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        petContainer.style.cursor = 'pointer';
        petContainer.style.transition = 'transform 0.2s ease';
        const rect = petContainer.getBoundingClientRect();
        localStorage.setItem('petLeft', rect.left);
        localStorage.setItem('petTop', rect.top);
        setTimeout(() => { petContainer.dataset.dragging = 'false'; }, 100);
      }
    });
  }

  // ==================== 6. 萌宠设置弹窗渲染逻辑 ====================
  function openSettingsModal(currentTips, currentSize, onSave) {
    // 防止重复创建
    let modal = document.getElementById('pet-settings-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'pet-settings-modal';
      modal.className = 'pet-modal-overlay';
      modal.innerHTML = `
        <div class="pet-modal-content">
          <h3>⚙️ 看板娘设置</h3>
          
          <div class="pet-size-control">
            <label>大小调整 (px)：<span id="pet-size-value">${currentSize}</span></label>
            <input type="range" id="pet-size-range" min="50" max="200" step="5" value="${currentSize}">
          </div>

          <div class="pet-tips-list" id="pet-tips-list">
            <!-- 动态生成 -->
          </div>
          
          <button id="add-pet-tip">+ 添加泡泡(点完上一个后显示下一个)</button>
          
          <div class="pet-modal-actions">
            <button id="cancel-pet-settings">取消</button>
            <button id="save-pet-settings">保存</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      // 绑定滑块实时显示数值
      modal.querySelector('#pet-size-range').addEventListener('input', (e) => {
        modal.querySelector('#pet-size-value').textContent = e.target.value;
      });

      // 取消按钮
      modal.querySelector('#cancel-pet-settings').onclick = () => modal.classList.remove('show');
      
      // 点击遮罩层关闭
      modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('show'); };

      // 添加新泡泡
      modal.querySelector('#add-pet-tip').onclick = () => {
        const list = modal.querySelector('#pet-tips-list');
        const newItem = document.createElement('div');
        newItem.className = 'pet-tip-item';
        newItem.innerHTML = `
          <span class="drag-handle">⣿</span>
          <input type="text" class="tip-input" value="" placeholder="编辑内容...">
          <button class="delete-tip">×</button>
        `;
        list.appendChild(newItem);
        // 滚动到底部
        list.scrollTop = list.scrollHeight;
      };
    }

    // 每次打开时，重新渲染列表
    const listContainer = modal.querySelector('#pet-tips-list');
    listContainer.innerHTML = '';
    
    currentTips.forEach((tip) => {
      const item = document.createElement('div');
      item.className = 'pet-tip-item';
      item.innerHTML = `
        <span class="drag-handle">⣿</span>
        <input type="text" class="tip-input" value="${tip.replace(/"/g, '&quot;')}">
        <button class="delete-tip">×</button>
      `;
      listContainer.appendChild(item);
    });

    // 绑定删除按钮（事件委托）
    listContainer.onclick = (e) => {
      if (e.target.classList.contains('delete-tip')) {
        e.target.closest('.pet-tip-item').remove();
      }
    };

    // 保存按钮
    modal.querySelector('#save-pet-settings').onclick = () => {
      const inputs = listContainer.querySelectorAll('.tip-input');
      const newTips = Array.from(inputs).map(input => input.value.trim()).filter(v => v !== '');
      
      const finalTips = newTips.length > 0 ? newTips : ['点我干嘛？'];
      const newSize = modal.querySelector('#pet-size-range').value;

      onSave(finalTips, newSize);
      modal.classList.remove('show');
    };

    modal.classList.add('show');
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
//})();
  // ==================== 7. 可展开的代码块交互 ====================
  function initCodeToggle() {
    // 使用事件委托，完美兼容 MkDocs 的 SPA 无刷新机制
    document.addEventListener('click', function(e) {
      const header = e.target.closest('.code-header');
      if (header) {
        const wrapper = header.closest('.code-toggle-wrapper');
        if (wrapper) {
          wrapper.classList.toggle('expanded');
        }
      }
    });
  }

  // ==================== 8. 完美兼容 MkDocs SPA 机制 ====================
  if (typeof document$ !== 'undefined') {
    document$.subscribe(function() {
      initArticlePage();
      init404RandomTip();
      initPet(); 
      initCodeToggle(); // 每次页面切换都挂载代码块交互
    }); 
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      initArticlePage();
      init404RandomTip();
      initPet();
      initCodeToggle();
    });
  }

  // ==================== 7. 自研滚动导航栏变色逻辑 ====================
  function initScrollHeader() {
    const header = document.querySelector('.md-header');
    if (!header) return;

    const checkScroll = () => {
      // 当页面往下滚动超过 20px 时，添加自定义类名
      if (window.scrollY > 20) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    };

    // 防止重复绑定
    window.removeEventListener('scroll', window.myScrollHandler);
    window.myScrollHandler = checkScroll;
    window.addEventListener('scroll', window.myScrollHandler);

    // 切换页面或加载完成后立即检查一次
    checkScroll();
  }

  // ==================== 8. 完美兼容 MkDocs SPA 机制 ====================
  if (typeof document$ !== 'undefined') {
    document$.subscribe(function() {
      initArticlePage();
      init404RandomTip();
      initPet(); 
      initScrollHeader(); // <--- 加入这一行！每次页面切换都重新监听
    }); 
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      initArticlePage();
      init404RandomTip();
      initPet();
      initScrollHeader(); // <--- 加入这一行！
    });
  }
})();