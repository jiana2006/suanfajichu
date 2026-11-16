# 用户注册

<div style="max-width: 400px; margin: 2rem auto; padding: 2rem; background: #fff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <form id="reg-form" style="display: flex; flex-direction: column; gap: 1rem;">
    <input type="text" id="user" placeholder="请输入用户名" required style="padding: 10px; border: 1px solid #ccc; border-radius: 6px;" />
    <input type="password" id="pass" placeholder="请输入密码" required style="padding: 10px; border: 1px solid #ccc; border-radius: 6px;" />
    <button type="submit" style="padding: 10px; background: #0d9488; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">注册</button>
  </form>
  <p id="msg" style="text-align: center; margin-top: 1rem; color: #e83e8c;"></p>
</div>

<script>
document.getElementById('reg-form').onsubmit = async (e) => {
  e.preventDefault(); // 阻止页面刷新
  const msg = document.getElementById('msg');
  msg.textContent = '正在注册...';

  try {
    // ⚠️ 这里要换成你的 Render 后端网址！
    const res = await fetch('https://你的Render后端地址.onrender.com/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: document.getElementById('user').value,
        password: document.getElementById('pass').value
      })
    });
    const data = await res.json();
    msg.textContent = data.message; // 显示后端返回的“注册成功”或“用户已存在”
    msg.style.color = res.ok ? 'green' : 'red';
  } catch (error) {
    msg.textContent = '网络错误，连不上后端服务器！';
    msg.style.color = 'red';
  }
};
</script>