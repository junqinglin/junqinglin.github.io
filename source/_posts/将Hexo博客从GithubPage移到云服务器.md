---
title: 将Hexo博客从GithubPage移到云服务器
auther: ljq
top_img: 'https://img.linjq.top/top_img.jpg'
cover: 'https://img.linjq.top/default_post_cover.png'
categories:
  - 折腾
tags:
  - Hexo
description: 记录将博客移到服务器的流程
abbrlink: e1152316
date: 2025-01-09 15:29:21
mathjax:
aside:
---
# Git仓库配置
## 安装Git
输入命令安装git：
```
sudo yum install -y git
```
查看git版本：
```
git --version
```
## 创建git新用户
新建git用户并添加权限：
```
useradd git
chmod 740 /etc/sudoers  
vim /etc/sudoers
```
先扩大对`/etc/sudoer`的权限，然后编辑：
```
chmod 740 /etc/sudoers  
vim /etc/sudoers
```
找到指定位置，添加下面这行:
![image.png](https://img.linjq.top/20250109224344.png)
修改回对/etc/sudoer的权限：
```
chmod 400 /etc/sudoers  
```
## 添加ssh验证
切换到git用户:
```
su - git
```
创建`.ssh`文件夹：
```
mkdir ~/.ssh
```
打开`authorized_keys`把本机的公钥(在`/Users/lin/.ssh/id_rsa.pub`中)输入：
```
vim ~/.ssh/authorized_keys
```
赋予权限：
```
chmod 600 /home/git/.ssh/authorized_keys  
chmod 700 /home/git/.ssh
```
在本地可以测试连接：
```
ssh -v git@[服务器ip地址]
```
## 创建仓库
切换回`root`用户：
```
su - root
```

新建目录，作为git仓库目录，并赋予git用户权限：
```
mkdir -p /var/repo
chown -R git:git /var/repo  
chmod -R 755 /var/repo
```
新建目录，作为hexo博客网站根目录，并赋予git用户权限：
```
mkdir /var/hexo  
chown -R git:git /var/hexo  
chmod -R 755 /var/hexo
```
初始化一个裸仓库：
```
cd /var/repo
git init --bare hexo.git
```
创建一个新的钩子，用于自动部署，打开`/hooks/post-receive`：
```
vim /var/repo/hexo.git/hooks/post-receive
```
写入下面的代码：
```
#!/bin/bash  
git --work-tree=/var/hexo --git-dir=/var/repo/hexo.git checkout -f
```
修改权限:
```
chown -R git:git /var/repo/hexo.git/hooks/post-receive  
chmod +x /var/repo/hexo.git/hooks/post-receive
```
# 本地配置
在hexo的配置文件`_config.yml`中添加下面的那个：
```
deploy:
  - type: git
    repository: git@github.com:xxx/xxx.github.io.git
    branch: main
  - type: git
    repository: git@xxx(填服务器ip):/var/repo/hexo.git
    branch: main 
```
# Nginx配置
## 安装Nginx
安装 Nginx ：
```
sudo yum install nginx
```
启动：
```
sudo systemctl start nginx
```
设置开机自启：
```
sudo systemctl enable nginx
```
## 修改配置
打开配置文件：
```
sudo vim /etc/nginx/nginx.conf
```
修改`server_name`，即域名，和`root`根目录：
![image.png](https://img.linjq.top/20250109225907.png)
重载配置：
```
sudo systemctl reload nginx
```
# 域名配置
在阿里云域名控制台中新增一个解析记录：
![image.png](https://img.linjq.top/20250110141704.png)
# 踩坑记录
试了好多次，`hexo d`的时候服务器仓库目录里面啥都没有，弄了好久都没效果。最后重启一下服务器居然可以了......
# 参考文章
[Hexo从github pages迁移到阿里云服务器](https://www.timegogo.top/2022/06/01/hexo/Hexo%E4%BB%8Egithub-pages%E8%BF%81%E7%A7%BB%E5%88%B0%E9%98%BF%E9%87%8C%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%99%A8/#%E5%9B%9B%E3%80%81%E5%88%9B%E5%BB%BA%E6%94%BE%E7%BD%AEhexo%E7%9A%84git%E4%BB%93%E5%BA%93)



