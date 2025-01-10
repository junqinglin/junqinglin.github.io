---
title: Hexo-Butterfly主题下的MathJax数学公式显示
auther: ljq
abbrlink: d06ae077
date: 2023-12-20 16:54:27
categories:
  - 前端
tags:
  - Hexo
  - Butterfly
mathjax: 
aside: 
cover: https://img.linjq.top/default_post_cover.png
top_img: https://img.linjq.top/top_img.jpg
description: MathJax数学公式在博客内容中的显示
---

## Step1
首先可以根据官方文档进行配置 [math-数学](https://butterfly.js.org/posts/ceeb73f/#Math-%E6%95%B8%E5%AD%B8)
> 根据官方文档配置后，行内公式仍然无法显示

## Step2
打开node_modules\kramed\lib\rules\inline.js
替换以下代码：
```
// escape: /^\\([\\`*{}\[\]()#$+\-.!_>])/,
escape: /^\\([`*\[\]()# +\-.!_>])/,
// em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
em: /^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
```

## 效果
![](https://img.linjq.top/202407091645676.jpg)
