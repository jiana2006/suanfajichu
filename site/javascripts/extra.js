document.addEventListener('DOMContentLoaded', function() {
  // 检查浏览器是否支持 IntersectionObserver
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // 动画只触发一次
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // 元素稍微进入视口就触发，让体验更丝滑
    });

    // 选择需要动画的元素（标题、段落、代码块、提示框等）
    const targets = document.querySelectorAll('h2, h3, p, pre, .admonition, .grid.cards > *');
    
    targets.forEach(el => {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });
  } else {
    // 如果不支持 IntersectionObserver，就直接全部显示（降级处理）
    document.querySelectorAll('h2, h3, p, pre, .admonition').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
});