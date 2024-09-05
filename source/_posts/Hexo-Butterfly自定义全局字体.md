---
title: Hexo-Butterfly自定义全局字体
auther: ljq
abbrlink: a55255d2
date: 2023-12-24 17:16:57
categories:
  - 前端
tags:
  - Hexo
  - Butterfly
mathjax: 
aside: 
cover: https://pic.linjq.top/img/default_post_cover.png
top_img: https://pic.linjq.top/img/top_img.jpg
description: 博客自定义全局字体实现
---
# Step1
下载自己想要的字体包，可以从[iconfont-阿里巴巴矢量图标库](https://www.iconfont.cn/fonts/index?spm=a313x.fonts_index.i3.13.1a1a3a81FzqVVg)下载

# Step2
在``source``文件夹下新建``fonts``文件夹，并把字体包解压到该文件夹下，然后在``fonts``文件夹创建文件``font.css``,内容如下：
```CSS
@font-face {
  font-family: 'DingTalk-JinBuTi';
  font-display: swap;
  src: url('DingTalk-JinBuTi.woff2') format('woff2'),
       url('DingTalk-JinBuTi.woff') format('woff'),  /*chrome、firefox */
       url('DingTalk-JinBuTi.ttf') format('truetype'),  /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
}
```
``font-family``可以自定义字体名，``url``里面写自己字体包的名字。
![](https://pic.linjq.top/img/202407091645665.png)

# Step3
在配置文件``_config.butterfly.yml``中引入css
```
inject:
  head:
    - <link rel="stylesheet" href="/fonts/font.css">
```
最后添加应用字体
```
font:
  global-font-size:
  code-font-size:
  font-family: DingTalk-JinBuTi
  code-font-family:
```

# 效果
![](https://pic.linjq.top/img/202407091645666.png)
