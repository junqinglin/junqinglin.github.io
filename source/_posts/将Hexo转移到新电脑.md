---
title: 将Hexo转移到新电脑
auther: ljq
top_img: https://pic.linjq.top/img/top_img.jpg
cover: https://pic.linjq.top/img/default_post_cover.png
categories:
  - 前端
tags:
  - Hexo
description: 将Hexo转移到新电脑的操作步骤
abbrlink: 5a8a6c8d
date: 2024-09-05 15:18:33
mathjax: 
aside:
---
# 安装node.js

1. 首先官网下载node.js[Node.js — Run JavaScript Everywhere (nodejs.org)](https://nodejs.org/en)，一路next即可。
![image.png](https://pic.linjq.top/img/202409051523740.png)
2. 在安装目录下新建两个文件夹node_cache(缓存路径)和node_global(全局的安装路径)
![image.png](https://pic.linjq.top/img/202409051524880.png)

3. 接下来添加环境变量：
+ 首先新建系统变量NODE_HOME
![image.png](https://pic.linjq.top/img/202409051524407.png)
+ 接着编辑Path系统变量，删除原有的D:\NodeJs，添加一下三个：
![image.png](https://pic.linjq.top/img/202409051525931.png)
+ 编辑用户变量，把`C:\Users\86134\AppData\Roaming\npm`改成`D:\NodeJs\node_global`
![image.png](https://pic.linjq.top/img/202409051525864.png)
![image.png](https://pic.linjq.top/img/202409051526005.png)
4. 下面配置全局安装路径和缓存路径，在cmd下输入以下命令：
![image.png](https://pic.linjq.top/img/202409051526752.png)
5. 输入命令`npm config set registry [https://registry.npmmirror.com](https://registry.npmmirror.com)`配置淘宝镜像
6. 接下来安装cnpm：`npm install -g cnpm`
7. 查看是否安装成功（显示“cnpm不是内部命令”的话，关闭cmd窗口重新打开就好）：
![image.png](https://pic.linjq.top/img/202409051526157.png)
# 安装和配置Git

## 安装

首先在官网下载安装包：[Git - Downloading Package (git-scm.com)](https://git-scm.com/download/win)

官网提供了两个版本，分别是：

>* 独立安装程序（Standalone Installer）：32位和64位Git for Windows的安装程序。独立安装程序是一种简便的方式，将Git for Windows直接安装到计算机上，使其成为系统的一部分。
>* 便携版（Portable）：32位和64位Git for Windows的便携式版本，也被称为“存储在可移动设备上的版本”。便携版可以在没有安装过程的情况下直接运行，非常适合携带在便携式存储设备（如USB闪存驱动器）中使用，方便在不同计算机之间使用Git。

这里安装了Standalone版本，下载后直接按照默认一直next即可。
选择默认编辑器的时候，这里选了本机的sublime，可以根据自己的需求选择
![image.png](https://pic.linjq.top/img/202409051552961.png)
其他具体配置选项解释可以看：[Git安装详解（写吐了，看完不后悔）-CSDN博客](https://blog.csdn.net/qq_45730223/article/details/131693287)
## 配置

执行命令配置用户名和邮箱：
```
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
```
执行命令生成ssh公钥(出现提示时按回车即可)：
```
ssh-keygen -t rsa -C "你的邮箱"
```
可以看到C盘下已经生成了私钥(id_rsa)和公钥(id_rsa.pub)：
![image.png](https://pic.linjq.top/img/202409051548414.png)
打开`github->setting->SSH and GPG keys->Add new SSH Key`，把`id_rsa.pub`中的内容粘贴进去。
输入命令测试连接：
```
ssh -T git@github.com
```
# 转移到新电脑

## 旧电脑上的操作

1. 新建分支hexo_source
![image.png](https://pic.linjq.top/img/202409051547657.png)
2. 在setting-><font style="color:rgb(31, 35, 40);">General</font>处，把默认分支切换成hexo_source
![image.png](https://pic.linjq.top/img/202409051548194.png)
3. 把仓库clone到本地：`git clone 仓库链接`，除了`.git`文件外，其他全部删除
4. 把原来的Hexo原文件夹下的目录中除了`.deploy_git`外，全部拷贝到clone下来的文件夹中
5. 由于我是使用obsidian来写博客的，它会自动生成一个`.obsidian`文件，这个文件会导致`git push`报错，因此需要在.gitignore中添加一行`source/_posts/.obsidian/`来忽略掉这个文件夹
6. 如果已经clone过主题文件，那么需要把theme主题文件夹里的 `.git` 也删除
7. 接着把修改后的文件夹推送到仓库中
```
git add .
git commit –m add_branch
git push
```
7. 这样仓库中就有两个分支，`hexo_source`分支存放博客源文件，`main`分支存放静态资源，互不干扰。当源文件更新时，执行以下命令，即可推送最新版本到`github`：
```
git add .
git commit –m "xxx"
git push
```
静态资源更新的话，执行hexo三连即可：`hexo clean && hexo g && hexo d`
note: 由于Hexo的配置文件中有：
```
deploy:
  type: git
  repository: xxx
  branch: main
```
因此执行`hexo d`是推送到main分支的。
## 新电脑上的操作

1. 首先按照上面的步骤在电脑上安装node.js和配置git

2. 在Hexo文件夹下执行命令`git clone 仓库链接`把`hexo_source`分支clone下来

3. 执行命令安装Hexo（可能要管理员）:`npm install -g hexo-cli`

4. 我这里显示成功安装了Hexo，但是报错：
![image.png](https://pic.linjq.top/img/202409051549339.png)
5. 输入以下命令后成功解决：
```
rm -rf node_modules # 删除项目目录下的 node_modules 目录，其中包含所有安装的 npm 包
npm install --force # 强制重新安装所有包，即使它们已经存在于 node_modules 中
```
6. 之前安装的插件需要重新安装，这里差一个生成唯一链接的插件`abbrlink`：`npm install hexo-abbrlink --save`，使用`hexo g`后会看到原post会生成一个`abbrlink`属性。
# 同步
当任一电脑上更新并推送到GitHub仓库时，另一台电脑可以使用以下命令来进行拉取最新代码：
```
git pull origin hexo_source
```