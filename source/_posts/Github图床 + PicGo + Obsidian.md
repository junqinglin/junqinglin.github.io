---
title: Github图床 + PicGo + Obsidian
auther: ljq
top_img: https://img.linjq.top/top_img.jpg
abbrlink: a3d48504
date: 2024-07-08 16:59:05
categories:
  - 前端
tags:
  - Hexo
mathjax: 
aside: 
cover: https://img.linjq.top/default_post_cover.png
description: Github图床搭建+PicGo和Obsidian搭配，提高效率
---

# 创建Github图床
## 新建github仓库作为图床
1. 新建一个仓库，设置成public
![Pasted image 20240708182206](https://img.linjq.top/202407091529399.png)
2. git clone到本地
![Pasted image 20240708182749](https://img.linjq.top/202407091529400.png)
3. 在刚刚clone下来的文件夹中，新建一个img文件夹，用于存放图片
![Pasted image 20240708182941](https://img.linjq.top/202407091529401.png)
4. 按顺序执行以下命令提交
```git
# 将更改提交 
git add . 
git commit -m "更新图片" 
# 推送至github仓库 
git push
```
## Vercel部署
上面的操作已经创建完成了基于Github仓库的图床，直接访问Github仓库的图片是比较慢的。我这里采用了Vercel部署的方式。
1. 进入[Vercel控制面板](https://vercel.com/dashboard)新建项目，并`通过Github继续`，选择导入刚刚创建的仓库，然后直接部署即可
 ![Pasted image 20240709141142](https://img.linjq.top/202407091529402.png)
 ![Pasted image 20240709141204](https://img.linjq.top/202407091529403.png)
 2. 选择右上角的`Manage Domains`添加新的域名，添加一个自己域名的二级域名，然后在你对应的域名解析控制台添加对应解析(这个可以自己上网搜)，等待生效。
 ![Pasted image 20240709141820](https://img.linjq.top/202407091529404.png)
 ![Pasted image 20240709142046](https://img.linjq.top/202407091529405.png)
 3. 通过`自定义域名+资源路径`即可访问到对应的资源，例如我这里为`https://img.linjq.top/cover1.jpg`
 
# 使用PicGo
## PicGo简介
PicGo是一个用于快速上传图片并获取图片 URL 链接的工具，之前我们每次上传新的图片都需要，运行以下指令：
```
# 将更改提交 
git add . 
git commit -m "更新图片" 
# 推送至github仓库 
git push
```
而使用PicGo之后，我们可以直接拖拽就可以完成上传。

## 使用步骤

1. 下载[PicGo](https://github.com/Molunerfinn/PicGo/releases)
2. 在github主页settings->Personal access tokens->Token(class)中选择
![Pasted image 20240708214657](https://img.linjq.top/202407091529406.png)
然后填写配置项。Note是token的注释，expiration是token的有效期，可以选择永久，但是github官方并不推荐，因此我们选择90天。接着勾选配置项`repo`。
![Pasted image 20240708214914](https://img.linjq.top/202407091529407.png)

3. 选择图床设置->GitHub进行设置。仓库名的格式是`用户名/仓库`，分支一般我们选择`main`分支即可，token填写刚刚获取的token，存储路径按照自己的实际写，存在哪个文件夹就写什么，我这里是`img/`，域名可以写刚刚Vercel部署使用的自已的域名。然后记得点击确定以生效，然后可以点击`设为默认图床`来确保上传的图床是GitHub。图片的访问路径为`域名+存储路径+图片名称`
![Pasted image 20240709142719](https://img.linjq.top/202407091529408.png)
4. 接着拖动文件即可自动上传到github
![Pasted image 20240709131857](https://img.linjq.top/202407091529409.png)

# Obsidian搭配PicGo
我们现在已经可以使用PicGo自动上传图片，但是效率上还是不够，比如说在写文章的时候，我们需要：
* 使用PicGo上传图片
* 复制图片链接
* 粘贴链接到Obsidian或Typora
这还是有点繁琐，我们能不能直接在Obsidian中粘贴图片，然后它自动上传到图床上面呢？答案是可以！
1. 在obsidian插件库中安装`Image Auto Upload`插件
![image.png](https://img.linjq.top/20240709145038.png)
2. 按照默认设置即可。之后我们可以将图片粘贴或者拖动到Obsidian中，插件和PicGo会自动上传照片。
**注意：一定要先打开 Picgo，才能实现自动上传**
3. 那么之前笔记的图片如何上传呢？我们可以按下命令行快捷键 `Ctrl / Command + P`，并选择 `upload all images`就可以把之前笔记的图片都上传了。
 ![image.png](https://img.linjq.top/202407091528063.png)
 
# 参考文章
1. [免费图床综合教程 | Fomalhaut🥝](https://www.fomal.cc/posts/d7fb1ba1.html#1)
2. [配置手册 | PicGo](https://picgo.github.io/PicGo-Doc/zh/guide/config.html#github%E5%9B%BE%E5%BA%8A)
3. [【Obsidian绝配！】为你的OB搭建专属图床，保姆级教程！ - 少数派 (sspai.com)](https://sspai.com/post/75765#!)