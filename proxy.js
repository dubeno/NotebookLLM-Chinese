const http = require('http');
const httpProxy = require('http-proxy');

// 创建代理服务器
const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
});

// 语音目标服务器地址
const target = 'https://v1.reecho.cn';

// 创建HTTP服务器
const server = http.createServer(function(req, res) {
  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true'
    });
    res.end();
    return;
  }

  // 代理请求到目标服务器
  proxy.web(req, res, {
    target: target,
  });
});

// 处理代理响应事件
proxy.on('proxyRes', (proxyRes, req, res) => {
  // 检查是否已有 Access-Control-Allow-Origin 头
  const existingOrigin = proxyRes.headers['access-control-allow-origin'];

  if (!existingOrigin) {
    // 设置CORS响应头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
});

// 监听端口
server.listen(3000, () => {
  console.log('Proxy server is running on http://localhost:3000');
});
