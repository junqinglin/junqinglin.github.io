---
title: Hexo-Butterfly应用文章双栏后卡片高度不一致
auther: ljq
top_img: https://img.linjq.top/top_img.jpg
abbrlink: 731a89a9
date: 2023-12-27 13:08:15
categories:
  - 前端
tags:
  - Hexo
  - Butterfly
mathjax: 
aside: 
cover: https://img.linjq.top/default_post_cover.png
description: 记录博客应用文章双栏后卡片高度不一致的解决办法
---
# 问题描述
今天使用大佬的教程[教程：butterfly主题文章双栏布局插件 | 小冰博客 (zfe.space)](https://zfe.space/post/hexo-butterfly-article-double-row.html)更改文章双栏布局后，发现第一篇文章卡片的高度比其他的要高，如下图，两边卡片的上方明显不对齐。
![](https://img.linjq.top/202407091645667.png)
# 解决办法
通过F12大法后，发现是Butterfly源码里面设置了，除了第一个文章卡片，其他的都设置一个20px的顶部外边框，而小冰大佬的代码是每个的顶部外边框都是1rem，导致出现不一致。最后把Butterfly源码里面的这段删除掉就可以了。源码目录为：``[BlogRoot]\themes\butterfly\source\css\_page\homepage.styl``
```
  & > .recent-post-item:not(:first-child)
    margin-top: 20px
```
