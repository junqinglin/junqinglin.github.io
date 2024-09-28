---
title: 如何将Github仓库与本地仓库同步
auther: ljq
top_img: 'https://pic.linjq.top/img/top_img.jpg'
cover: 'https://pic.linjq.top/img/default_post_cover.png'
categories:
  - 折腾
tags:
  - Git
description: 如何将Github仓库与本地仓库同步的简单操作记录
abbrlink: 5c1653d6
date: 2024-09-28 13:46:49
mathjax:
aside:
---
{% note blue modern %}
由于主要使用的是工位的主机，但是偶尔在宿舍或者回家可能会用到笔记本，这个时候就很需要代码能同步，因此着手来学习使用Git，方便同步代码。
{% endnote %}
# 创建Github仓库
这里我创建了一个私有库，由于是自己研究项目的代码，所以不设为公开了
![image.png](https://pic.linjq.top/img/202409281355923.png)
# 本地新建仓库
在本地新建一个目录，打开git命令行，输入`git init`进行初始化
![image.png](https://pic.linjq.top/img/202409281358578.png)
# 关联远程仓库
输入命令关联远程仓库：`git remote add origin [远程仓库URL]`
# 推送到远程仓库
在本地目录下新建代码文件：
![image.png](https://pic.linjq.top/img/202409281434269.png)
执行命令推送到github：
```
git add .
git commit -m "提交消息"
git push origin main
```
# 另一台电脑上的操作
另一台电脑上，只需要`git clone [仓库地址]`，如果有更改可以执行以下命令推送更新到github：
```
git add .
git commit -m "提交消息"
git push origin main
```
# 拉取到本地
如果另一台电脑的推送让github上的代码更新了，本机可以输入以下命令，把最新的拉取到本地：
```
git pull origin main
```








