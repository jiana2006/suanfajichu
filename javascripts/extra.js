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
    script.src = '/suanfajichu/javascripts/sakana-widget.js?v=2'; 
    script.onload = window.initSakana;
    document.head.appendChild(script);
  } else if (window.sakanaScriptLoaded && typeof SakanaWidget !== 'undefined') {
    window.initSakana();
  }

  // ==================== 3. 智能文章页优化 ====================
  function initArticlePage() {
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
        setTimeout(() => { tipElement.style.transform = 'scale(1)'; }, 150);
      }

      changeTip();
      console.log('🎯 404页面随机文案已加载！');

      if (avatar) {
        avatar.onclick = null; 
        avatar.style.cursor = 'pointer'; 
        avatar.onclick = function() {
          changeTip();
          avatar.style.transform = 'scale(0.9)';
          setTimeout(() => { avatar.style.transform = 'scale(1)'; }, 150);
        };
      }
    }
  }

  // ==================== 5. 左下角萌宠互动（物理引擎+音效版） ====================
  function initPet() {
    const isHidden = localStorage.getItem('petHidden') === 'true';
    if (document.getElementById('pet-container')) return;

    // 召回按钮
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

    const petContainer = document.createElement('div');
    petContainer.id = 'pet-container';
    petContainer.className = 'pet-container';
    petContainer.style.left = '0';
    petContainer.style.top = '0';
    petContainer.style.transition = 'none'; 

    const savedSize = parseInt(localStorage.getItem('petSize')) || 80;
    
    // 物理引擎状态
    let posX = parseInt(localStorage.getItem('petLeft')) || 20;
    let posY = parseInt(localStorage.getItem('petTop')) || (window.innerHeight - savedSize - 20);
    let velX = 0, velY = 0;
    let isDragging = false, isAnimating = false;
    let startX, startY, lastMouseX, lastMouseY, dragStartTime;
    const friction = 0.96, bounce = 0.75;

    // 音效
    const clickAudio = new Audio('/suanfajichu/assets/audio/pop.mp3');
    clickAudio.volume = 0.5;

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

    const defaultTips = ['喵喵喵~', '今天也要加油学算法哦！', '点我干嘛？(｡･ω･｡)', '大肥鱼在偷懒呢~'];
    let petTips = JSON.parse(localStorage.getItem('petTips')) || defaultTips;
    let currentTipIndex = parseInt(localStorage.getItem('petTipIndex')) || 0;

    function getNextTip() {
      if (petTips.length === 0) return '点我干嘛？';
      const tip = petTips[currentTipIndex];
      currentTipIndex = (currentTipIndex + 1) % petTips.length;
      localStorage.setItem('petTipIndex', currentTipIndex);
      return tip;
    }

    function updatePhysics() {
      if (isDragging) return;
      velX *= friction; velY *= friction;
      posX += velX; posY += velY;
      const winW = window.innerWidth, winH = window.innerHeight;

      if (posX < 0) { posX = 0; velX *= -bounce; playSound(); }
      if (posX > winW - savedSize) { posX = winW - savedSize; velX *= -bounce; playSound(); }
      if (posY < 0) { posY = 0; velY *= -bounce; playSound(); }
      if (posY > winH - savedSize) { posY = winH - savedSize; velY *= -bounce; playSound(); }

      petContainer.style.transform = `translate(${posX}px, ${posY}px)`;

      if (Math.abs(velX) > 0.1 || Math.abs(velY) > 0.1) {
        requestAnimationFrame(updatePhysics);
      } else {
        isAnimating = false;
        localStorage.setItem('petLeft', Math.round(posX));
        localStorage.setItem('petTop', Math.round(posY));
      }
    }

    function playSound() {
      const clone = clickAudio.cloneNode();
      clone.volume = 0.3;
      clone.play().catch(e => {});
    }

    petContainer.addEventListener('mousedown', (e) => {
      if (e.target.closest('.pet-controls')) return;
      isDragging = true; isAnimating = false;
      dragStartTime = Date.now();
      startX = e.clientX - posX; startY = e.clientY - posY;
      lastMouseX = e.clientX; lastMouseY = e.clientY;
      petContainer.style.cursor = 'grabbing';
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      posX = e.clientX - startX; posY = e.clientY - startY;
      velX = e.clientX - lastMouseX; velY = e.clientY - lastMouseY;
      lastMouseX = e.clientX; lastMouseY = e.clientY;
      petContainer.style.transform = `translate(${posX}px, ${posY}px)`;
    });

    document.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      petContainer.style.cursor = 'pointer';
      const dragDuration = Date.now() - dragStartTime;
      
      if (dragDuration < 200 && Math.abs(velX) < 5 && Math.abs(velY) < 5) {
        // 算作点击
        bubble.textContent = getNextTip();
        bubble.classList.add('show');
        playSound();
        img.style.transform = 'scale(0.8)';
        setTimeout(() => { img.style.transform = 'scale(1)'; }, 150);
        clearTimeout(window.petBubbleTimer);
        window.petBubbleTimer = setTimeout(() => { bubble.classList.remove('show'); }, 4000);
        velX = 0; velY = 0;
      } else {
        // 算作拖拽抛出
        isAnimating = true;
        requestAnimationFrame(updatePhysics);
      }
    });

    petContainer.style.transform = `translate(${posX}px, ${posY}px)`;

    // 隐藏/召回
    document.getElementById('pet-close').addEventListener('click', (e) => {
      e.stopPropagation();
      petContainer.style.display = 'none';
      localStorage.setItem('petHidden', 'true');
      recallBtn.style.display = 'flex';
    });

    // 设置
    document.getElementById('pet-settings').addEventListener('click', (e) => {
      e.stopPropagation();
      openSettingsModal(petTips, savedSize.toString(), (newTips, newSize) => {
        petTips = newTips;
        localStorage.setItem('petTips', JSON.stringify(petTips));
        img.style.width = newSize + 'px'; img.style.height = newSize + 'px';
        localStorage.setItem('petSize', newSize);
      });
    });

    // 换角色
    document.getElementById('pet-change').addEventListener('click', (e) => {
      e.stopPropagation();
      const presetImages = {
        '1': '/suanfajichu/assets/gif/doro.jpg',
        '2': '/suanfajichu/assets/gif/valesa.jpg',
        '3': '/suanfajichu/assets/gif/ciallo.jpg'
      };
      const choice = prompt("输入数字更换角色：\n1. Doro 🐱\n2. 瓦蕾莎 🧝‍♀️\n3. Ciallo 🌸", "1");
      if (choice && presetImages[choice]) {
        img.src = presetImages[choice];
        localStorage.setItem('petImgSrc', presetImages[choice]);
      }
    });
  }

  // ==================== 6. 萌宠设置弹窗 ====================
  function openSettingsModal(currentTips, currentSize, onSave) {
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
          <div class="pet-tips-list" id="pet-tips-list"></div>
          <button id="add-pet-tip">+ 添加泡泡(点完上一个后显示下一个)</button>
          <div class="pet-modal-actions">
            <button id="cancel-pet-settings">取消</button>
            <button id="save-pet-settings">保存</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#pet-size-range').addEventListener('input', (e) => {
        modal.querySelector('#pet-size-value').textContent = e.target.value;
      });
      modal.querySelector('#cancel-pet-settings').onclick = () => modal.classList.remove('show');
      modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('show'); };
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
        list.scrollTop = list.scrollHeight;
      };
    }

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

    listContainer.onclick = (e) => {
      if (e.target.classList.contains('delete-tip')) {
        e.target.closest('.pet-tip-item').remove();
      }
    };

    modal.querySelector('#save-pet-settings').onclick = () => {
      const inputs = listContainer.querySelectorAll('.tip-input');
      const newTips = Array.from(inputs).map(input => input.value.trim()).filter(v => v !== '');
      const finalTips = newTips.length > 0 ? newTips : ['点我干嘛？'];
      onSave(finalTips, modal.querySelector('#pet-size-range').value);
      modal.classList.remove('show');
    };

    modal.classList.add('show');
  }

  // ==================== 7. 滚动导航栏变色 ====================
  function initScrollHeader() {
    const header = document.querySelector('.md-header');
    if (!header) return;
    const checkScroll = () => {
      if (window.scrollY > 20) header.classList.add('header-scrolled');
      else header.classList.remove('header-scrolled');
    };
    window.removeEventListener('scroll', window.myScrollHandler);
    window.myScrollHandler = checkScroll;
    window.addEventListener('scroll', window.myScrollHandler);
    checkScroll();
  }

  // ==================== 8. 自动折叠代码块 ====================
  function initCollapsibleCodeBlocks() {
    document.querySelectorAll('.md-typeset .highlight').forEach((block) => {
      if (block.closest('.code-toggle-wrapper')) return;
      const filename = block.querySelector('span.filename');
      if (!filename) return;
      const titleText = filename.textContent.trim();
      if (!block.querySelector('pre')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'code-toggle-wrapper';
      wrapper.innerHTML = `
        <div class="code-header">
          <div class="left-bar"></div>
          <div class="status-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
          <div class="code-title">${titleText}</div>
          <div class="arrow-icon"><svg viewBox="0 0 24 24"><polygon points="8,5 19,12 8,19"></polygon></svg></div>
        </div>
      `;
      const body = document.createElement('div');
      body.className = 'code-body';
      body.appendChild(block.cloneNode(true));
      wrapper.appendChild(body);
      block.parentNode.replaceChild(wrapper, block);
    });
  }

  // ==================== 9. 折叠代码块点击交互 ====================
  document.addEventListener('click', function(e) {
    const header = e.target.closest('.code-header');
    if (header) {
      const wrapper = header.closest('.code-toggle-wrapper');
      if (wrapper) wrapper.classList.toggle('expanded');
    }
  });

  // ==================== 10. 唯美撕信开机动画 ====================
  function initBootAnimation() {
    const path = window.location.pathname;
    const isHome = path === '/' || path.endsWith('/suanfajichu/') || path.endsWith('/index.html');
    if (!isHome || sessionStorage.getItem('bootAnimated')) return;

    const overlay = document.createElement('div');
    overlay.id = 'envelope-overlay';
    overlay.innerHTML = `
      <div id="envelope-wrapper">
        <div class="envelope">
          <div class="envelope-back"></div>
          <div class="letter">
            <img src="/suanfajichu/assets/gif/valesa.jpg" alt="valesa" class="letter-stamp">
            <div class="letter-text" id="letter-content"></div>
          </div>
          <div class="envelope-flap"></div>
          <div class="envelope-front"></div>
        </div>
        <div class="click-hint" id="click-hint">👆 点击打开信件</div>
      </div>
    `;
    document.body.appendChild(overlay);

    const wrapper = document.getElementById('envelope-wrapper');
    const hint = document.getElementById('click-hint');
    const letter = document.querySelector('.letter');
    const letterContent = document.getElementById('letter-content');
    let isOpened = false;

    wrapper.addEventListener('click', () => {
      if (isOpened) return;
      isOpened = true;
      hint.style.opacity = '0'; 
      overlay.classList.add('is-open');

      setTimeout(() => {
        letter.style.transform = 'translateY(-40%) scale(1.1)';
        letter.style.zIndex = '10';
        const text = "欢迎进入"; 
        let i = 0;
        const typeWriter = () => {
          if (i < text.length) {
            if (text.charAt(i) === '\n') letterContent.innerHTML += '<br>';
            else letterContent.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
          } else {
            wrapper.addEventListener('click', () => {
              overlay.style.opacity = '0';
              setTimeout(() => {
                overlay.remove();
                sessionStorage.setItem('bootAnimated', 'true');
              }, 800);
            });
          }
        };
        typeWriter();
      }, 600);
    });
  }

  // ==================== 11. 读者专属笔记本 ====================
  function initUserNotes() {
    let drawer = document.getElementById('user-note-drawer');
    let trigger = document.getElementById('user-note-trigger');
        // 改成全局唯一的钥匙，所有页面共用
    const pageKey = 'user_global_note'; 

    if (!trigger) {
      trigger = document.createElement('div');
      trigger.id = 'user-note-trigger';
      trigger.innerHTML = '📝';
      trigger.title = '我的专属笔记';
      document.body.appendChild(trigger);

      drawer = document.createElement('div');
      drawer.id = 'user-note-drawer';
      drawer.innerHTML = `
        <div class="note-header">
          <h3>📝 我的专属笔记</h3>
          <button id="note-close-btn">×</button>
        </div>
        <textarea id="note-textarea" placeholder="在这里记录你的学习心得...&#10;（笔记会保存在你当前浏览器中）"></textarea>
        <div class="note-footer"><span id="note-save-status">已自动保存</span></div>
      `;
      document.body.appendChild(drawer);

      trigger.onclick = () => drawer.classList.toggle('open');
      document.getElementById('note-close-btn').onclick = () => drawer.classList.remove('open');

      const textarea = document.getElementById('note-textarea');
      const status = document.getElementById('note-save-status');
      textarea.addEventListener('input', () => {
        localStorage.setItem(pageKey, textarea.value);
        status.textContent = '保存中...';
        clearTimeout(window.noteSaveTimer);
        window.noteSaveTimer = setTimeout(() => status.textContent = '已自动保存', 500);
      });
    }

    const textarea = document.getElementById('note-textarea');
    if (textarea) textarea.value = localStorage.getItem(pageKey) || '';
  }

  // ==================== 12. 完美兼容 MkDocs SPA 机制 ====================
  function initAll() {
    initBootAnimation(); 
    initArticlePage();
    init404RandomTip();
    initPet();
    initScrollHeader();
    initCollapsibleCodeBlocks();
    initUserNotes();
  }

  if (typeof document$ !== 'undefined') {
    document$.subscribe(initAll); 
  } else {
    document.addEventListener('DOMContentLoaded', initAll);
  }

})(); // 🌟 正确的闭包