---
title: Hexo-Butterfly魔改汇总
auther: ljq
top_img: https://img.linjq.top/top_img.jpg
cover: https://img.linjq.top/default_post_cover.png
abbrlink: b1c26afa
date: 2023-12-27 18:31:53
categories:
  - 前端
tags:
  - Hexo
  - Butterfly
mathjax: 
aside: 
description: 此页收集汇总了一些大佬的魔改教程，同时也包含自己魔改的记录
---
> 此页收集汇总了一些大佬的魔改教程，同时也包含自己魔改的记录

# 自定义页数跳转
{% folding blue,效果 %}
![](https://img.linjq.top/202407091645668.png)
{% endfolding %}
{% folding blue,教程 %}
可参考[Butterfly的魔改教程：自定页数跳转 | 爱吃肉的猫 (meuicat.com)](https://meuicat.com/blog/62/index.html)
{% endfolding %}

# 评论系统
{% folding blue,效果 %}
![image.png](https://img.linjq.top/202407091744518.png)
{% endfolding %}
{% folding blue,教程 %}
可参考[基于 Hexo 键入评论功能 | 唐志远 (fe32.top)](https://fe32.top/articles/hexo1611/)
国内会被墙，因此还需：
[关于Vercel被墙导致获取Twikoo评论失败的解决方案 | 唐志远 (fe32.top)](https://fe32.top/articles/hexo1614/)
{% endfolding %}
# 修改border颜色
{% folding blue, 教程 %}
1. 在自定义的css中加上：
```
:root{
	--ljq-border-color: #e3e8f7;
	--ljq-hover-border-color: #74b9ff;
}
```
2. `[BLOGROOT]\themes\butterfly\source\css\_global\function.styl`下添加：
```diff
.cardHover
  border-radius: 8px
  background: var(--card-bg)
  box-shadow: var(--card-box-shadow)
  transition: all .3s
+  border: 1px solid var(--ljq-border-color)

  &:hover
    box-shadow: var(--card-hover-box-shadow)
+    border-color: var(--ljq-hover-border-color)
```
{% endfolding %}
# 导航栏
{% folding blue, 教程 %}
[Hexo-Butterfly导航栏魔改 | LJQ](/articles/25281569/)
{% endfolding %}
# 随机前往一篇文章
{% folding blue, 教程 %}
[Hexo-Butterfly随机前往一篇文章 | LJQ](/articles/83dcefb7/)
{% endfolding %}
# 首页轮播图
{% folding blue, 教程 %}
[Hexo-Butterfly首页轮播图 | LJQ](/articles/cf15f90b/)
{% endfolding %}

