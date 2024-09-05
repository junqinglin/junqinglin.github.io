---
title: Hexo-Butterfly随机前往一篇文章
auther: ljq
top_img: https://pic.linjq.top/img/top_img.jpg
cover: https://pic.linjq.top/img/default_post_cover.png
abbrlink: 83dcefb7
date: 2024-07-14 17:00:07
categories:
  - 前端
tags:
  - Hexo
  - Butterfly
mathjax: 
aside: 
description: 博客功能"随机前往一篇文章"的实现
---
# Step1
{% tabs randomPost %}
<!-- tab 使用pjax-->
1. 在配置文件中开启pjax
```
# Pjax
# It may contain bugs and unstable, give feedback when you find the bugs.
# https://github.com/MoOx/
pjax:
  enable: true
  exclude:
    # - xxxx
    # - xxxx
```
2. 由于jsdelivr不可用，所以我们需要更换cdn，在配置文件的最后：
```
option:
	pjax: https://lib.baomitu.com/pjax/0.2.8/pjax.js
```
3. 创建`themes/butterfly/scripts/helpers/random.js`文件
```
hexo.extend.generator.register('random', function (locals) {  
    const config = hexo.config.random || {}  
    const posts = []  
    for (const post of locals.posts.data) {  
        if (post.random !== false) posts.push(post.path)  
    }  
    return {  
        path: config.path || 'ljq/random.js',  
        data: `var posts=${JSON.stringify(posts)};function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};`  
    }  
})
```
{% note warning modern %}
注意：要看清目录，在`themes/butterfly/scripts/helpers`下创建，不然会报错。
{% endnote %}
<!-- endtab -->

<!-- tab 不使用pjax-->
创建`themes/butterfly/scripts/helpers/random.js`文件
```
hexo.extend.generator.register('random', function (locals) {  
    const config = hexo.config.random || {}  
    const posts = []  
    for (const post of locals.posts.data) {  
        if (post.random !== false) posts.push(post.path)  
    }  
    return {  
        path: config.path || 'zhheo/random.js',  
        data: `var posts=${JSON.stringify(posts)};function toRandomPost(){window.open('/'+posts[Math.floor(Math.random() * posts.length)],"_self");};`  
    }  
})
```
{% note warning modern %}
注意：要看清目录，在`themes/butterfly/scripts/helpers`下创建，不然会报错。
{% endnote %}
<!-- endtab -->
{% endtabs %}
# Step2
在主题配置文件引入`themes/butterfly/_config.yml`，`inject`的`bottom`里添加:
```
# Inject
# Insert the code to head (before '</head>' tag) and the bottom (before '</body>' tag)
# 插入代码到头部 </head> 之前 和 底部 </body> 之前
inject:
  bottom:
    - <script src="/ljq/random.js"></script>
```
# Step3
在需要调用的位置执行`toRandomPost()`函数即可。比如任意dom添加`onclick="toRandomPost()"`，例如在配置文件导航栏中需要的位置添加，`随机文章: javascript:toRandomPost() || fas fa-bus`

# 参考文章
[Hexo的Butterfly魔改教程：随机网页跳转（无缝版） | 张洪Heo (zhheo.com)](https://blog.zhheo.com/p/c116857c.html)
