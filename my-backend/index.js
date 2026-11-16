const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 测试接口
app.get('/', (req, res) => {
  res.send('大肥鱼的后端服务器已启动！');
});

// 注册接口（临时演示，数据存在内存里，重启会丢失）
const users = [];
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: '账号密码不能为空' });
  if (users.find(u => u.username === username)) return res.status(400).json({ message: '用户已存在' });
  
  users.push({ username, password });
  res.json({ message: '注册成功！' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});