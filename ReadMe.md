如何运行

npm install 安装依赖

本地运行: 
    npm start
导出windows exe: 
    npm run build
    
程序设置

需要设置APIkey 和角色配置，目前使用本人共享密钥，额度用完就无法使用，需要自己申请密钥

# 申请DeepSeek大模型API密钥
website: https://platform.deepseek.com/api_keys
![img_2.png](assets/img_2.png)
# 申请睿声API密钥
website: https://dash.reecho.cn/apiKey
![img_3.png](assets/img_3.png)
# 创建音频角色
## 1. 上传音频添加声音角色
![img.png](assets/img.png)

## 2. 角色详情拿到角色标识
![img_1.png](assets/img_1.png)

## 3. 角色标识配置在boke-google.html
```
const voiceIds = {
'主持人': '1d041342-e6b7-41f3-8f3f-xx',
'嘉宾': 'fe67f6a7-e6f8-4aa2-a8be-xx',
'专家': '3a501dda-b2f9-42fe-be08-xx'
};
```

问题排除：
3000端口的进程未杀死，无法二次启动，待修复的BUG

首先，使用 netstat -ano | findstr "3000" 来查找使用特定端口的进程。
然后，使用 taskkill /PID 进程ID /F 来结束该进程。

@联系作者，wechat:ppoluo