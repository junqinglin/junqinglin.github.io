---
title: Hexo-Butterfly主题的加载动画修改
auther: ljq
abbrlink: 216710e
date: 2023-12-23 16:50:49
categories:
  - 前端
tags:
  - Hexo
  - Butterfly
mathjax: 
aside: 
cover: https://img.linjq.top/default_post_cover.png
top_img: https://img.linjq.top/top_img.jpg
description: 博客加载动画的魔改实现
---

> 本教程参考了大佬[akilar](https://akilar.top/posts/3d221bf2/)和[安知鱼](https://blog.anheyu.com/posts/52d8.html)的文章, 同时自己进行了修改

# Step1 

首先从[codepen](https://codepen.io/)上找到自己想要的动画，最好是纯CSS的，这里以[pokeball](https://codepen.io/internette/pen/LZBxQw)为例。我们可以先把它下载下来。
![](https://img.linjq.top/202407091645664.png)
解压后打开``dist``文件夹，里面有``index.html``和``style.css``文件，待会要用到。

# Step2
在``[BlogRoot]\themes\butterfly\layout\includes\loading``目录下新建文件夹``load_style``，并且在``load_style``下新建文件``pokeball.pug``用于存放加载动画的结构;
在``[BlogRoot]\themes\butterfly\source\css``目录下新建文件夹``_load_style``, 并且在``_load_style``下新建``pokeball.styl`` 用于存放加载动画的样式。

# Step3
``pokeball.pug``和``pokeball.styl``分别对应``[BlogRoot]\themes\butterfly\layout\includes\loading\fullpage-loading.pug``和``[BlogRoot]\themes\butterfly\source\css\_layout\loading.styl``，这两个文件是默认的加载动画。
{% tabs 默认加载动画文件 1%}
<!-- tab fullpage-loading.pug-->
前面的部分就是结构，``.spinner-box``就是默认的加载动画结构，我们只需要把这个替换即可。
```pu
#loading-box
  .loading-left-bg
  .loading-right-bg
  .spinner-box
    .configure-border-1
      .configure-core
    .configure-border-2
      .configure-core
    .loading-word= _p('loading')

script.
  (()=>{
    const $loadingBox = document.getElementById('loading-box')
    const $body = document.body
    const preloader = {
      endLoading: () => {
        $body.style.overflow = ''
        $loadingBox.classList.add('loaded')
      },
      initLoading: () => {
        $body.style.overflow = 'hidden'
        $loadingBox.classList.remove('loaded')
      }
    }

    preloader.initLoading()
    window.addEventListener('load',() => { preloader.endLoading() })

    if (!{theme.pjax && theme.pjax.enable}) {
      document.addEventListener('pjax:send', () => { preloader.initLoading() })
      document.addEventListener('pjax:complete', () => { preloader.endLoading() })
    }
  })()
```
<!-- endtab -->

<!-- tab loading.styl-->
``.spinner-box``下面的是默认加载动画的样式，我们也要把这个替换
```styl
if hexo-config('preloader.enable') && hexo-config('preloader.source') == 1
  .loading-bg
    position: fixed
    z-index: 1000
    width: 50%
    height: 100%
    background-color: var(--preloader-bg)

  #loading-box
    .loading-left-bg
      @extend .loading-bg

    .loading-right-bg
      @extend .loading-bg
      right: 0

    .spinner-box
      position: fixed
      z-index: 1001
      display: flex
      justify-content: center
      align-items: center
      width: 100%
      height: 100vh

      .configure-border-1
        position: absolute
        padding: 3px
        width: 115px
        height: 115px
        background: #ffab91
        animation: configure-clockwise 3s ease-in-out 0s infinite alternate

      .configure-border-2
        left: -115px
        padding: 3px
        width: 115px
        height: 115px
        background: rgb(63, 249, 220)
        transform: rotate(45deg)
        animation: configure-xclockwise 3s ease-in-out 0s infinite alternate

      .loading-word
        position: absolute
        color: var(--preloader-color)
        font-size: 16px

      .configure-core
        width: 100%
        height: 100%
        background-color: var(--preloader-bg)

    &.loaded
      .loading-left-bg
        transition: all .5s
        transform: translate(-100%, 0)

      .loading-right-bg
        transition: all .5s
        transform: translate(100%, 0)

      .spinner-box
        display: none

  @keyframes configure-clockwise
    0%
      transform: rotate(0)

    25%
      transform: rotate(90deg)

    50%
      transform: rotate(180deg)

    75%
      transform: rotate(270deg)

    100%
      transform: rotate(360deg)

  @keyframes configure-xclockwise
    0%
      transform: rotate(45deg)

    25%
      transform: rotate(-45deg)

    50%
      transform: rotate(-135deg)

    75%
      transform: rotate(-225deg)

    100%
      transform: rotate(-315deg)

```
<!-- endtab -->
{% endtabs %}

下面将前面下载的``index.html``中的html转换成pug代码,可以用[HTML to Jade/Pug Online Realtime Converter](http://www.html2jade.org/)来转换，
{% tabs 加载动画结构文件 1%}
<!-- tab index.html-->
``class=”pokeball-loading“``下的就是主要的加载动画结构，就是中间转动的那几颗精灵球，我们的思路就是把``.spinner-box``替换成``.pokeball-loading`` 
```html
<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - Pokéball loader</title>
  <link rel="stylesheet" href="./style.css">

</head>
<body>
<!-- partial:index.partial.html -->
<div id="header">
  <h3>Pokéball Loader</h3>
  <p>in pure CSS</p>
</div>
<div class="pokeball-loading">
  <div class="pokeball" id="normal"></div>
  <div class="pokeball" id="great"></div>
  <div class="pokeball" id="ultra"></div>
  <div class="pokeball" id="master"></div>
  <div class="pokeball" id="safari"></div>
</div>
<!-- partial -->
  
</body>
</html>

```
<!-- endtab -->

<!-- tab pokeball.pug-->
在刚刚创建的``pokeball.pug``中写如下代码，其实就是cpoy``fullpage-loading.pug``的，只是用转换成的pug替换掉了原来的``.spinner-box``的内容，并且更改了``$body.style.overflow = 'auto'``。
```diff
#loading-box
  .loading-left-bg
  .loading-right-bg
-  .spinner-box
-    .configure-border-1
-      .configure-core
-    .configure-border-2
-      .configure-core
-    .loading-word= _p('loading')
+  .pokeball-loading
+    #normal.pokeball
+    #great.pokeball
+    #ultra.pokeball
+    #master.pokeball
+    #safari.pokeball


script.
  (()=>{
    const $loadingBox = document.getElementById('loading-box')
    const $body = document.body
    const preloader = {
      endLoading: () => {
-        $body.style.overflow = ''
+        $body.style.overflow = 'auto'
        $loadingBox.classList.add('loaded')
      },
      initLoading: () => {
        $body.style.overflow = 'hidden'
        $loadingBox.classList.remove('loaded')
      }
    }

    preloader.initLoading()
    window.addEventListener('load',() => { preloader.endLoading() })

    if (!{theme.pjax && theme.pjax.enable}) {
      document.addEventListener('pjax:send', () => { preloader.initLoading() })
      document.addEventListener('pjax:complete', () => { preloader.endLoading() })
    }
  })()
```
<!-- endtab -->
{% endtabs %}

然后在刚刚创建的``pokeball.styl``中写如下代码，其实就是cpoy``loading.styl``的，并且删掉了``.spinner-box``的样式，添加了刚刚下载的``style.css``中属于``.pokeball-loading``的样式。
{% tabs 加载动画样式文件 1%}
<!-- tab 对照loading.styl的删减-->
这是对照``loading.styl``的删减
```diff
-if hexo-config('preloader.enable') && hexo-config('preloader.source') == 1
  .loading-bg
    position: fixed
    z-index: 1000
    width: 50%
    height: 100%
    background-color: var(--preloader-bg)

  #loading-box
    .loading-left-bg
      @extend .loading-bg

    .loading-right-bg
      @extend .loading-bg
      right: 0

-    .spinner-box
-      position: fixed
-      z-index: 1001
-      display: flex
-      justify-content: center
-      align-items: center
-      width: 100%
-      height: 100vh

-      .configure-border-1
-        position: absolute
-        padding: 3px
-        width: 115px
-        height: 115px
-        background: #ffab91
-        animation: configure-clockwise 3s ease-in-out 0s infinite alternate

-      .configure-border-2
-        left: -115px
-        padding: 3px
-        width: 115px
-        height: 115px
-        background: rgb(63, 249, 220)
-        transform: rotate(45deg)
-        animation: configure-xclockwise 3s ease-in-out 0s infinite alternate

-      .loading-word
-        position: absolute
-        color: var(--preloader-color)
-        font-size: 16px

-      .configure-core
-        width: 100%
-        height: 100%
-        background-color: var(--preloader-bg)

    &.loaded
      .loading-left-bg
        transition: all .5s
        transform: translate(-100%, 0)

      .loading-right-bg
        transition: all .5s
        transform: translate(100%, 0)

+      .pokeball-loading
+        display: none

-      .spinner-box
-        display: none

-@keyframes configure-clockwise
-  0%
-    transform: rotate(0)

-  25%
-    transform: rotate(90deg)

-  50%
-    transform: rotate(180deg)

-  75%
-    transform: rotate(270deg)

-  100%
-    transform: rotate(360deg)

-@keyframes configure-xclockwise
-  0%
-    transform: rotate(45deg)

-  25%
-    transform: rotate(-45deg)

-  50%
-    transform: rotate(-135deg)

-  75%
-    transform: rotate(-225deg)

-  100%
-    transform: rotate(-315deg)

+@keyframes rotateBall {
+0% {
+  transform: rotate(0deg);
+}
+100% {
+  transform: rotate(360deg);
+}
+}
+@-webkit-keyframes rotateBall {
+0% {
+  transform: rotate(0deg);
+}
+50% {
+  transform: rotate(50deg);
+}
+0% {
+  transform: rotate(360deg);
+}
+}

+.pokeball-loading {
+  height: 48px;
+  width: 264px;
+  position: fixed;
+  top: 50%;
+  left: 50%;
+  z-index: 1001;
+  transform: translateX(-50%) translateY(-50%);
+}

+.pokeball {
+  width: 4px;
+  height: 4px;
+  transform-origin: 24px 24px;
+  animation: rotateBall 1.5s infinite forwards;
+}
+.pokeball#normal {
+  box-shadow: 16px 0 0 #000, 20px 0 0 #000, 24px 0 0 #000, 28px 0 0 #000, 8px 4px 0 #000, 12px 4px 0 #000, 16px 4px 0 #e20f07, 20px 4px 0 #e20f07, 24px 4px 0 #e20f07, 28px 4px 0 #e20f07, 32px 4px 0 #000, 36px 4px 0 #000, 4px 8px 0 #000, 8px 8px 0 #e20f07, 12px 8px 0 #e20f07, 16px 8px 0 #FFF, 20px 8px 0 #e20f07, 24px 8px 0 #e20f07, 28px 8px 0 #e20f07, 32px 8px 0 #e20f07, 36px 8px 0 #e20f07, 40px 8px 0 #000, 4px 12px 0 #000, 8px 12px 0 #e20f07, 12px 12px 0 #FFF, 16px 12px 0 #FFF, 20px 12px 0 #FFF, 24px 12px 0 #e20f07, 28px 12px 0 #e20f07, 32px 12px 0 #e20f07, 36px 12px 0 #e20f07, 40px 12px 0 #000, 0px 16px 0 #000, 4px 16px 0 #e20f07, 8px 16px 0 #e20f07, 12px 16px 0 #e20f07, 16px 16px 0 #FFF, 20px 16px 0 #e20f07, 24px 16px 0 #e20f07, 28px 16px 0 #e20f07, 32px 16px 0 #e20f07, 36px 16px 0 #e20f07, 40px 16px 0 #e20f07, 44px 16px 0 #000, 0px 20px 0 #000, 4px 20px 0 #e20f07, 8px 20px 0 #e20f07, 12px 20px 0 #e20f07, 16px 20px 0 #e20f07, 20px 20px 0 #000, 24px 20px 0 #000, 28px 20px 0 #e20f07, 32px 20px 0 #e20f07, 36px 20px 0 #e20f07, 40px 20px 0 #e20f07, 44px 20px 0 #000, 0px 24px 0 #000, 4px 24px 0 #000, 8px 24px 0 #e20f07, 12px 24px 0 #e20f07, 16px 24px 0 #000, 20px 24px 0 #FFF, 24px 24px 0 #a5a5a5, 28px 24px 0 #000, 32px 24px 0 #e20f07, 36px 24px 0 #e20f07, 40px 24px 0 #000, 44px 24px 0 #000, 0px 28px 0 #000, 4px 28px 0 #FFF, 8px 28px 0 #000, 12px 28px 0 #000, 16px 28px 0 #000, 20px 28px 0 #a5a5a5, 24px 28px 0 #a5a5a5, 28px 28px 0 #000, 32px 28px 0 #000, 36px 28px 0 #000, 40px 28px 0 #a5a5a5, 44px 28px 0 #000, 4px 32px 0 #000, 8px 32px 0 #FFF, 12px 32px 0 #FFF, 16px 32px 0 #FFF, 20px 32px 0 #000, 24px 32px 0 #000, 28px 32px 0 #a5a5a5, 32px 32px 0 #a5a5a5, 36px 32px 0 #a5a5a5, 40px 32px 0 #000, 4px 36px 0 #000, 8px 36px 0 #a5a5a5, 12px 36px 0 #FFF, 16px 36px 0 #FFF, 20px 36px 0 #FFF, 24px 36px 0 #a5a5a5, 28px 36px 0 #a5a5a5, 32px 36px 0 #a5a5a5, 36px 36px 0 #a5a5a5, 40px 36px 0 #000, 8px 40px 0 #000, 12px 40px 0 #000, 16px 40px 0 #a5a5a5, 20px 40px 0 #a5a5a5, 24px 40px 0 #a5a5a5, 28px 40px 0 #a5a5a5, 32px 40px 0 #000, 36px 40px 0 #000, 16px 44px 0 #000, 20px 44px 0 #000, 24px 44px 0 #000, 28px 44px 0 #000;
+}
+.pokeball#great {
+  animation-delay: 0.25s;
+  margin: -4px 0 0 54px;
+  box-shadow: 16px 0 0 #000, 20px 0 0 #000, 24px 0 0 #000, 28px 0 0 #000, 8px 4px 0 #000, 12px 4px 0 #000, 16px 4px 0 #278de1, 20px 4px 0 #278de1, 24px 4px 0 #278de1, 28px 4px 0 #278de1, 32px 4px 0 #000, 36px 4px 0 #000, 4px 8px 0 #000, 8px 8px 0 #e20f07, 12px 8px 0 #e20f07, 16px 8px 0 #278de1, 20px 8px 0 #278de1, 24px 8px 0 #278de1, 28px 8px 0 #278de1, 32px 8px 0 #e20f07, 36px 8px 0 #e20f07, 40px 8px 0 #000, 4px 12px 0 #000, 8px 12px 0 #e20f07, 12px 12px 0 #e20f07, 16px 12px 0 #e20f07, 20px 12px 0 #278de1, 24px 12px 0 #278de1, 28px 12px 0 #e20f07, 32px 12px 0 #e20f07, 36px 12px 0 #e20f07, 40px 12px 0 #000, 0px 16px 0 #000, 4px 16px 0 #278de1, 8px 16px 0 #278de1, 12px 16px 0 #e20f07, 16px 16px 0 #e20f07, 20px 16px 0 #278de1, 24px 16px 0 #278de1, 28px 16px 0 #e20f07, 32px 16px 0 #e20f07, 36px 16px 0 #278de1, 40px 16px 0 #278de1, 44px 16px 0 #000, 0px 20px 0 #000, 4px 20px 0 #278de1, 8px 20px 0 #278de1, 12px 20px 0 #278de1, 16px 20px 0 #278de1, 20px 20px 0 #000, 24px 20px 0 #000, 28px 20px 0 #278de1, 32px 20px 0 #278de1, 36px 20px 0 #278de1, 40px 20px 0 #278de1, 44px 20px 0 #000, 0px 24px 0 #000, 4px 24px 0 #000, 8px 24px 0 #278de1, 12px 24px 0 #278de1, 16px 24px 0 #000, 20px 24px 0 #FFF, 24px 24px 0 #a5a5a5, 28px 24px 0 #000, 32px 24px 0 #278de1, 36px 24px 0 #278de1, 40px 24px 0 #000, 44px 24px 0 #000, 0px 28px 0 #000, 4px 28px 0 #FFF, 8px 28px 0 #000, 12px 28px 0 #000, 16px 28px 0 #000, 20px 28px 0 #a5a5a5, 24px 28px 0 #a5a5a5, 28px 28px 0 #000, 32px 28px 0 #000, 36px 28px 0 #000, 40px 28px 0 #a5a5a5, 44px 28px 0 #000, 4px 32px 0 #000, 8px 32px 0 #FFF, 12px 32px 0 #FFF, 16px 32px 0 #FFF, 20px 32px 0 #000, 24px 32px 0 #000, 28px 32px 0 #a5a5a5, 32px 32px 0 #a5a5a5, 36px 32px 0 #a5a5a5, 40px 32px 0 #000, 4px 36px 0 #000, 8px 36px 0 #a5a5a5, 12px 36px 0 #FFF, 16px 36px 0 #FFF, 20px 36px 0 #FFF, 24px 36px 0 #a5a5a5, 28px 36px 0 #a5a5a5, 32px 36px 0 #a5a5a5, 36px 36px 0 #a5a5a5, 40px 36px 0 #000, 8px 40px 0 #000, 12px 40px 0 #000, 16px 40px 0 #a5a5a5, 20px 40px 0 #a5a5a5, 24px 40px 0 #a5a5a5, 28px 40px 0 #a5a5a5, 32px 40px 0 #000, 36px 40px 0 #000, 16px 44px 0 #000, 20px 44px 0 #000, 24px 44px 0 #000, 28px 44px 0 #000;
+}
+.pokeball#ultra {
+  animation-delay: 0.5s;
+  margin: -4px 0 0 108px;
+  box-shadow: 16px 0 0 #000, 20px 0 0 #000, 24px 0 0 #000, 28px 0 0 #000, 8px 4px 0 #000, 12px 4px 0 #000, 16px 4px 0 #ffff00, 20px 4px 0 #ffff00, 24px 4px 0 #ffff00, 28px 4px 0 #ffff00, 32px 4px 0 #000, 36px 4px 0 #000, 4px 8px 0 #000, 8px 8px 0 #ffff00, 12px 8px 0 #ffff00, 16px 8px 0 #ffff00, 20px 8px 0 #ffff00, 24px 8px 0 #ffff00, 28px 8px 0 #ffff00, 32px 8px 0 #ffff00, 36px 8px 0 #ffff00, 40px 8px 0 #000, 4px 12px 0 #000, 8px 12px 0 #ffff00, 12px 12px 0 #ffff00, 16px 12px 0 #000, 20px 12px 0 #000, 24px 12px 0 #000, 28px 12px 0 #000, 32px 12px 0 #ffff00, 36px 12px 0 #ffff00, 40px 12px 0 #000, 0px 16px 0 #000, 4px 16px 0 #000, 8px 16px 0 #ffff00, 12px 16px 0 #ffff00, 16px 16px 0 #000, 20px 16px 0 #000, 24px 16px 0 #000, 28px 16px 0 #000, 32px 16px 0 #ffff00, 36px 16px 0 #ffff00, 40px 16px 0 #000, 44px 16px 0 #000, 0px 20px 0 #000, 4px 20px 0 #000, 8px 20px 0 #000, 12px 20px 0 #000, 16px 20px 0 #000, 20px 20px 0 #000, 24px 20px 0 #000, 28px 20px 0 #000, 32px 20px 0 #000, 36px 20px 0 #000, 40px 20px 0 #000, 44px 20px 0 #000, 0px 24px 0 #000, 4px 24px 0 #000, 8px 24px 0 #000, 12px 24px 0 #000, 16px 24px 0 #000, 20px 24px 0 #FFF, 24px 24px 0 #a5a5a5, 28px 24px 0 #000, 32px 24px 0 #000, 36px 24px 0 #000, 40px 24px 0 #000, 44px 24px 0 #000, 0px 28px 0 #000, 4px 28px 0 #FFF, 8px 28px 0 #000, 12px 28px 0 #000, 16px 28px 0 #000, 20px 28px 0 #a5a5a5, 24px 28px 0 #a5a5a5, 28px 28px 0 #000, 32px 28px 0 #000, 36px 28px 0 #000, 40px 28px 0 #a5a5a5, 44px 28px 0 #000, 4px 32px 0 #000, 8px 32px 0 #FFF, 12px 32px 0 #FFF, 16px 32px 0 #FFF, 20px 32px 0 #000, 24px 32px 0 #000, 28px 32px 0 #a5a5a5, 32px 32px 0 #a5a5a5, 36px 32px 0 #a5a5a5, 40px 32px 0 #000, 4px 36px 0 #000, 8px 36px 0 #a5a5a5, 12px 36px 0 #FFF, 16px 36px 0 #FFF, 20px 36px 0 #FFF, 24px 36px 0 #a5a5a5, 28px 36px 0 #a5a5a5, 32px 36px 0 #a5a5a5, 36px 36px 0 #a5a5a5, 40px 36px 0 #000, 8px 40px 0 #000, 12px 40px 0 #000, 16px 40px 0 #a5a5a5, 20px 40px 0 #a5a5a5, 24px 40px 0 #a5a5a5, 28px 40px 0 #a5a5a5, 32px 40px 0 #000, 36px 40px 0 #000, 16px 44px 0 #000, 20px 44px 0 #000, 24px 44px 0 #000, 28px 44px 0 #000;
+}
+.pokeball#master {
+  animation-delay: 0.75s;
+  margin: -4px 0 0 162px;
+  box-shadow: 16px 0 0 #000, 20px 0 0 #000, 24px 0 0 #000, 28px 0 0 #000, 8px 4px 0 #000, 12px 4px 0 #000, 16px 4px 0 #481a66, 20px 4px 0 #481a66, 24px 4px 0 #481a66, 28px 4px 0 #481a66, 32px 4px 0 #000, 36px 4px 0 #000, 4px 8px 0 #000, 8px 8px 0 #eb23aa, 12px 8px 0 #eb23aa, 16px 8px 0 #481a66, 20px 8px 0 #481a66, 24px 8px 0 #481a66, 28px 8px 0 #481a66, 32px 8px 0 #eb23aa, 36px 8px 0 #eb23aa, 40px 8px 0 #000, 4px 12px 0 #000, 8px 12px 0 #eb23aa, 12px 12px 0 #FFF, 16px 12px 0 #FFF, 20px 12px 0 #481a66, 24px 12px 0 #481a66, 28px 12px 0 #FFF, 32px 12px 0 #FFF, 36px 12px 0 #eb23aa, 40px 12px 0 #000, 0px 16px 0 #000, 4px 16px 0 #481a66, 8px 16px 0 #481a66, 12px 16px 0 #FFF, 16px 16px 0 #481a66, 20px 16px 0 #FFF, 24px 16px 0 #FFF, 28px 16px 0 #481a66, 32px 16px 0 #FFF, 36px 16px 0 #481a66, 40px 16px 0 #481a66, 44px 16px 0 #000, 0px 20px 0 #000, 4px 20px 0 #481a66, 8px 20px 0 #481a66, 12px 20px 0 #481a66, 16px 20px 0 #481a66, 20px 20px 0 #000, 24px 20px 0 #000, 28px 20px 0 #481a66, 32px 20px 0 #481a66, 36px 20px 0 #481a66, 40px 20px 0 #481a66, 44px 20px 0 #000, 0px 24px 0 #000, 4px 24px 0 #000, 8px 24px 0 #481a66, 12px 24px 0 #481a66, 16px 24px 0 #000, 20px 24px 0 #FFF, 24px 24px 0 #a5a5a5, 28px 24px 0 #000, 32px 24px 0 #481a66, 36px 24px 0 #481a66, 40px 24px 0 #000, 44px 24px 0 #000, 0px 28px 0 #000, 4px 28px 0 #FFF, 8px 28px 0 #000, 12px 28px 0 #000, 16px 28px 0 #000, 20px 28px 0 #a5a5a5, 24px 28px 0 #a5a5a5, 28px 28px 0 #000, 32px 28px 0 #000, 36px 28px 0 #000, 40px 28px 0 #a5a5a5, 44px 28px 0 #000, 4px 32px 0 #000, 8px 32px 0 #FFF, 12px 32px 0 #FFF, 16px 32px 0 #FFF, 20px 32px 0 #000, 24px 32px 0 #000, 28px 32px 0 #a5a5a5, 32px 32px 0 #a5a5a5, 36px 32px 0 #a5a5a5, 40px 32px 0 #000, 4px 36px 0 #000, 8px 36px 0 #a5a5a5, 12px 36px 0 #FFF, 16px 36px 0 #FFF, 20px 36px 0 #FFF, 24px 36px 0 #a5a5a5, 28px 36px 0 #a5a5a5, 32px 36px 0 #a5a5a5, 36px 36px 0 #a5a5a5, 40px 36px 0 #000, 8px 40px 0 #000, 12px 40px 0 #000, 16px 40px 0 #a5a5a5, 20px 40px 0 #a5a5a5, 24px 40px 0 #a5a5a5, 28px 40px 0 #a5a5a5, 32px 40px 0 #000, 36px 40px 0 #000, 16px 44px 0 #000, 20px 44px 0 #000, 24px 44px 0 #000, 28px 44px 0 #000;
+}
+.pokeball#safari {
+  animation-delay: 1s;
+  margin: -4px 0 0 216px;
+  box-shadow: 16px 0 0 #000, 20px 0 0 #000, 24px 0 0 #000, 28px 0 0 #000, 8px 4px 0 #000, 12px 4px 0 #000, 16px 4px 0 #9a4a01, 20px 4px 0 #9a4a01, 24px 4px 0 #606700, 28px 4px 0 #5fa300, 32px 4px 0 #000, 36px 4px 0 #000, 4px 8px 0 #000, 8px 8px 0 #606700, 12px 8px 0 #606700, 16px 8px 0 #606700, 20px 8px 0 #9a4a01, 24px 8px 0 #9a4a01, 28px 8px 0 #5fa300, 32px 8px 0 #606700, 36px 8px 0 #9a4a01, 40px 8px 0 #000, 4px 12px 0 #000, 8px 12px 0 #9a4a01, 12px 12px 0 #9a4a01, 16px 12px 0 #9a4a01, 20px 12px 0 #9a4a01, 24px 12px 0 #9a4a01, 28px 12px 0 #5fa300, 32px 12px 0 #606700, 36px 12px 0 #606700, 40px 12px 0 #000, 0px 16px 0 #000, 4px 16px 0 #5fa300, 8px 16px 0 #606700, 12px 16px 0 #5fa300, 16px 16px 0 #5fa300, 20px 16px 0 #606700, 24px 16px 0 #606700, 28px 16px 0 #606700, 32px 16px 0 #5fa300, 36px 16px 0 #9a4a01, 40px 16px 0 #9a4a01, 44px 16px 0 #000, 0px 20px 0 #000, 4px 20px 0 #5fa300, 8px 20px 0 #606700, 12px 20px 0 #5fa300, 16px 20px 0 #606700, 20px 20px 0 #000, 24px 20px 0 #000, 28px 20px 0 #606700, 32px 20px 0 #606700, 36px 20px 0 #5fa300, 40px 20px 0 #5fa300, 44px 20px 0 #000, 0px 24px 0 #000, 4px 24px 0 #000, 8px 24px 0 #606700, 12px 24px 0 #606700, 16px 24px 0 #000, 20px 24px 0 #FFF, 24px 24px 0 #a5a5a5, 28px 24px 0 #000, 32px 24px 0 #9a4a01, 36px 24px 0 #9a4a01, 40px 24px 0 #000, 44px 24px 0 #000, 0px 28px 0 #000, 4px 28px 0 #FFF, 8px 28px 0 #000, 12px 28px 0 #000, 16px 28px 0 #000, 20px 28px 0 #a5a5a5, 24px 28px 0 #a5a5a5, 28px 28px 0 #000, 32px 28px 0 #000, 36px 28px 0 #000, 40px 28px 0 #a5a5a5, 44px 28px 0 #000, 4px 32px 0 #000, 8px 32px 0 #FFF, 12px 32px 0 #FFF, 16px 32px 0 #FFF, 20px 32px 0 #000, 24px 32px 0 #000, 28px 32px 0 #a5a5a5, 32px 32px 0 #a5a5a5, 36px 32px 0 #a5a5a5, 40px 32px 0 #000, 4px 36px 0 #000, 8px 36px 0 #a5a5a5, 12px 36px 0 #FFF, 16px 36px 0 #FFF, 20px 36px 0 #FFF, 24px 36px 0 #a5a5a5, 28px 36px 0 #a5a5a5, 32px 36px 0 #a5a5a5, 36px 36px 0 #a5a5a5, 40px 36px 0 #000, 8px 40px 0 #000, 12px 40px 0 #000, 16px 40px 0 #a5a5a5, 20px 40px 0 #a5a5a5, 24px 40px 0 #a5a5a5, 28px 40px 0 #a5a5a5, 32px 40px 0 #000, 36px 40px 0 #000, 16px 44px 0 #000, 20px 44px 0 #000, 24px 44px 0 #000, 28px 44px 0 #000;
+}
```
<!-- endtab-->

<!-- tab pokeball.styl-->
```styl
.loading-bg
  position: fixed
  z-index: 1000
  width: 50%
  height: 100%
  background-color: var(--preloader-bg)

#loading-box
  .loading-left-bg
    @extend .loading-bg

  .loading-right-bg
    @extend .loading-bg
    right: 0

  &.loaded
    .loading-left-bg
      transition: all .5s
      transform: translate(-100%, 0)

    .loading-right-bg
      transition: all .5s
      transform: translate(100%, 0)

    .pokeball-loading
      display: none


@keyframes rotateBall {
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
}
@-webkit-keyframes rotateBall {
0% {
  transform: rotate(0deg);
}
50% {
  transform: rotate(50deg);
}
0% {
  transform: rotate(360deg);
}
}

.pokeball-loading {
  height: 48px;
  width: 264px;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1001;
  transform: translateX(-50%) translateY(-50%);
}

.pokeball {
  width: 4px;
  height: 4px;
  transform-origin: 24px 24px;
  animation: rotateBall 1.5s infinite forwards;
}
.pokeball#normal {
  box-shadow: 16px 0 0 #000, 20px 0 0 #000, 24px 0 0 #000, 28px 0 0 #000, 8px 4px 0 #000, 12px 4px 0 #000, 16px 4px 0 #e20f07, 20px 4px 0 #e20f07, 24px 4px 0 #e20f07, 28px 4px 0 #e20f07, 32px 4px 0 #000, 36px 4px 0 #000, 4px 8px 0 #000, 8px 8px 0 #e20f07, 12px 8px 0 #e20f07, 16px 8px 0 #FFF, 20px 8px 0 #e20f07, 24px 8px 0 #e20f07, 28px 8px 0 #e20f07, 32px 8px 0 #e20f07, 36px 8px 0 #e20f07, 40px 8px 0 #000, 4px 12px 0 #000, 8px 12px 0 #e20f07, 12px 12px 0 #FFF, 16px 12px 0 #FFF, 20px 12px 0 #FFF, 24px 12px 0 #e20f07, 28px 12px 0 #e20f07, 32px 12px 0 #e20f07, 36px 12px 0 #e20f07, 40px 12px 0 #000, 0px 16px 0 #000, 4px 16px 0 #e20f07, 8px 16px 0 #e20f07, 12px 16px 0 #e20f07, 16px 16px 0 #FFF, 20px 16px 0 #e20f07, 24px 16px 0 #e20f07, 28px 16px 0 #e20f07, 32px 16px 0 #e20f07, 36px 16px 0 #e20f07, 40px 16px 0 #e20f07, 44px 16px 0 #000, 0px 20px 0 #000, 4px 20px 0 #e20f07, 8px 20px 0 #e20f07, 12px 20px 0 #e20f07, 16px 20px 0 #e20f07, 20px 20px 0 #000, 24px 20px 0 #000, 28px 20px 0 #e20f07, 32px 20px 0 #e20f07, 36px 20px 0 #e20f07, 40px 20px 0 #e20f07, 44px 20px 0 #000, 0px 24px 0 #000, 4px 24px 0 #000, 8px 24px 0 #e20f07, 12px 24px 0 #e20f07, 16px 24px 0 #000, 20px 24px 0 #FFF, 24px 24px 0 #a5a5a5, 28px 24px 0 #000, 32px 24px 0 #e20f07, 36px 24px 0 #e20f07, 40px 24px 0 #000, 44px 24px 0 #000, 0px 28px 0 #000, 4px 28px 0 #FFF, 8px 28px 0 #000, 12px 28px 0 #000, 16px 28px 0 #000, 20px 28px 0 #a5a5a5, 24px 28px 0 #a5a5a5, 28px 28px 0 #000, 32px 28px 0 #000, 36px 28px 0 #000, 40px 28px 0 #a5a5a5, 44px 28px 0 #000, 4px 32px 0 #000, 8px 32px 0 #FFF, 12px 32px 0 #FFF, 16px 32px 0 #FFF, 20px 32px 0 #000, 24px 32px 0 #000, 28px 32px 0 #a5a5a5, 32px 32px 0 #a5a5a5, 36px 32px 0 #a5a5a5, 40px 32px 0 #000, 4px 36px 0 #000, 8px 36px 0 #a5a5a5, 12px 36px 0 #FFF, 16px 36px 0 #FFF, 20px 36px 0 #FFF, 24px 36px 0 #a5a5a5, 28px 36px 0 #a5a5a5, 32px 36px 0 #a5a5a5, 36px 36px 0 #a5a5a5, 40px 36px 0 #000, 8px 40px 0 #000, 12px 40px 0 #000, 16px 40px 0 #a5a5a5, 20px 40px 0 #a5a5a5, 24px 40px 0 #a5a5a5, 28px 40px 0 #a5a5a5, 32px 40px 0 #000, 36px 40px 0 #000, 16px 44px 0 #000, 20px 44px 0 #000, 24px 44px 0 #000, 28px 44px 0 #000;
}
.pokeball#great {
  animation-delay: 0.25s;
  margin: -4px 0 0 54px;
  box-shadow: 16px 0 0 #000, 20px 0 0 #000, 24px 0 0 #000, 28px 0 0 #000, 8px 4px 0 #000, 12px 4px 0 #000, 16px 4px 0 #278de1, 20px 4px 0 #278de1, 24px 4px 0 #278de1, 28px 4px 0 #278de1, 32px 4px 0 #000, 36px 4px 0 #000, 4px 8px 0 #000, 8px 8px 0 #e20f07, 12px 8px 0 #e20f07, 16px 8px 0 #278de1, 20px 8px 0 #278de1, 24px 8px 0 #278de1, 28px 8px 0 #278de1, 32px 8px 0 #e20f07, 36px 8px 0 #e20f07, 40px 8px 0 #000, 4px 12px 0 #000, 8px 12px 0 #e20f07, 12px 12px 0 #e20f07, 16px 12px 0 #e20f07, 20px 12px 0 #278de1, 24px 12px 0 #278de1, 28px 12px 0 #e20f07, 32px 12px 0 #e20f07, 36px 12px 0 #e20f07, 40px 12px 0 #000, 0px 16px 0 #000, 4px 16px 0 #278de1, 8px 16px 0 #278de1, 12px 16px 0 #e20f07, 16px 16px 0 #e20f07, 20px 16px 0 #278de1, 24px 16px 0 #278de1, 28px 16px 0 #e20f07, 32px 16px 0 #e20f07, 36px 16px 0 #278de1, 40px 16px 0 #278de1, 44px 16px 0 #000, 0px 20px 0 #000, 4px 20px 0 #278de1, 8px 20px 0 #278de1, 12px 20px 0 #278de1, 16px 20px 0 #278de1, 20px 20px 0 #000, 24px 20px 0 #000, 28px 20px 0 #278de1, 32px 20px 0 #278de1, 36px 20px 0 #278de1, 40px 20px 0 #278de1, 44px 20px 0 #000, 0px 24px 0 #000, 4px 24px 0 #000, 8px 24px 0 #278de1, 12px 24px 0 #278de1, 16px 24px 0 #000, 20px 24px 0 #FFF, 24px 24px 0 #a5a5a5, 28px 24px 0 #000, 32px 24px 0 #278de1, 36px 24px 0 #278de1, 40px 24px 0 #000, 44px 24px 0 #000, 0px 28px 0 #000, 4px 28px 0 #FFF, 8px 28px 0 #000, 12px 28px 0 #000, 16px 28px 0 #000, 20px 28px 0 #a5a5a5, 24px 28px 0 #a5a5a5, 28px 28px 0 #000, 32px 28px 0 #000, 36px 28px 0 #000, 40px 28px 0 #a5a5a5, 44px 28px 0 #000, 4px 32px 0 #000, 8px 32px 0 #FFF, 12px 32px 0 #FFF, 16px 32px 0 #FFF, 20px 32px 0 #000, 24px 32px 0 #000, 28px 32px 0 #a5a5a5, 32px 32px 0 #a5a5a5, 36px 32px 0 #a5a5a5, 40px 32px 0 #000, 4px 36px 0 #000, 8px 36px 0 #a5a5a5, 12px 36px 0 #FFF, 16px 36px 0 #FFF, 20px 36px 0 #FFF, 24px 36px 0 #a5a5a5, 28px 36px 0 #a5a5a5, 32px 36px 0 #a5a5a5, 36px 36px 0 #a5a5a5, 40px 36px 0 #000, 8px 40px 0 #000, 12px 40px 0 #000, 16px 40px 0 #a5a5a5, 20px 40px 0 #a5a5a5, 24px 40px 0 #a5a5a5, 28px 40px 0 #a5a5a5, 32px 40px 0 #000, 36px 40px 0 #000, 16px 44px 0 #000, 20px 44px 0 #000, 24px 44px 0 #000, 28px 44px 0 #000;
}
.pokeball#ultra {
  animation-delay: 0.5s;
  margin: -4px 0 0 108px;
  box-shadow: 16px 0 0 #000, 20px 0 0 #000, 24px 0 0 #000, 28px 0 0 #000, 8px 4px 0 #000, 12px 4px 0 #000, 16px 4px 0 #ffff00, 20px 4px 0 #ffff00, 24px 4px 0 #ffff00, 28px 4px 0 #ffff00, 32px 4px 0 #000, 36px 4px 0 #000, 4px 8px 0 #000, 8px 8px 0 #ffff00, 12px 8px 0 #ffff00, 16px 8px 0 #ffff00, 20px 8px 0 #ffff00, 24px 8px 0 #ffff00, 28px 8px 0 #ffff00, 32px 8px 0 #ffff00, 36px 8px 0 #ffff00, 40px 8px 0 #000, 4px 12px 0 #000, 8px 12px 0 #ffff00, 12px 12px 0 #ffff00, 16px 12px 0 #000, 20px 12px 0 #000, 24px 12px 0 #000, 28px 12px 0 #000, 32px 12px 0 #ffff00, 36px 12px 0 #ffff00, 40px 12px 0 #000, 0px 16px 0 #000, 4px 16px 0 #000, 8px 16px 0 #ffff00, 12px 16px 0 #ffff00, 16px 16px 0 #000, 20px 16px 0 #000, 24px 16px 0 #000, 28px 16px 0 #000, 32px 16px 0 #ffff00, 36px 16px 0 #ffff00, 40px 16px 0 #000, 44px 16px 0 #000, 0px 20px 0 #000, 4px 20px 0 #000, 8px 20px 0 #000, 12px 20px 0 #000, 16px 20px 0 #000, 20px 20px 0 #000, 24px 20px 0 #000, 28px 20px 0 #000, 32px 20px 0 #000, 36px 20px 0 #000, 40px 20px 0 #000, 44px 20px 0 #000, 0px 24px 0 #000, 4px 24px 0 #000, 8px 24px 0 #000, 12px 24px 0 #000, 16px 24px 0 #000, 20px 24px 0 #FFF, 24px 24px 0 #a5a5a5, 28px 24px 0 #000, 32px 24px 0 #000, 36px 24px 0 #000, 40px 24px 0 #000, 44px 24px 0 #000, 0px 28px 0 #000, 4px 28px 0 #FFF, 8px 28px 0 #000, 12px 28px 0 #000, 16px 28px 0 #000, 20px 28px 0 #a5a5a5, 24px 28px 0 #a5a5a5, 28px 28px 0 #000, 32px 28px 0 #000, 36px 28px 0 #000, 40px 28px 0 #a5a5a5, 44px 28px 0 #000, 4px 32px 0 #000, 8px 32px 0 #FFF, 12px 32px 0 #FFF, 16px 32px 0 #FFF, 20px 32px 0 #000, 24px 32px 0 #000, 28px 32px 0 #a5a5a5, 32px 32px 0 #a5a5a5, 36px 32px 0 #a5a5a5, 40px 32px 0 #000, 4px 36px 0 #000, 8px 36px 0 #a5a5a5, 12px 36px 0 #FFF, 16px 36px 0 #FFF, 20px 36px 0 #FFF, 24px 36px 0 #a5a5a5, 28px 36px 0 #a5a5a5, 32px 36px 0 #a5a5a5, 36px 36px 0 #a5a5a5, 40px 36px 0 #000, 8px 40px 0 #000, 12px 40px 0 #000, 16px 40px 0 #a5a5a5, 20px 40px 0 #a5a5a5, 24px 40px 0 #a5a5a5, 28px 40px 0 #a5a5a5, 32px 40px 0 #000, 36px 40px 0 #000, 16px 44px 0 #000, 20px 44px 0 #000, 24px 44px 0 #000, 28px 44px 0 #000;
}
.pokeball#master {
  animation-delay: 0.75s;
  margin: -4px 0 0 162px;
  box-shadow: 16px 0 0 #000, 20px 0 0 #000, 24px 0 0 #000, 28px 0 0 #000, 8px 4px 0 #000, 12px 4px 0 #000, 16px 4px 0 #481a66, 20px 4px 0 #481a66, 24px 4px 0 #481a66, 28px 4px 0 #481a66, 32px 4px 0 #000, 36px 4px 0 #000, 4px 8px 0 #000, 8px 8px 0 #eb23aa, 12px 8px 0 #eb23aa, 16px 8px 0 #481a66, 20px 8px 0 #481a66, 24px 8px 0 #481a66, 28px 8px 0 #481a66, 32px 8px 0 #eb23aa, 36px 8px 0 #eb23aa, 40px 8px 0 #000, 4px 12px 0 #000, 8px 12px 0 #eb23aa, 12px 12px 0 #FFF, 16px 12px 0 #FFF, 20px 12px 0 #481a66, 24px 12px 0 #481a66, 28px 12px 0 #FFF, 32px 12px 0 #FFF, 36px 12px 0 #eb23aa, 40px 12px 0 #000, 0px 16px 0 #000, 4px 16px 0 #481a66, 8px 16px 0 #481a66, 12px 16px 0 #FFF, 16px 16px 0 #481a66, 20px 16px 0 #FFF, 24px 16px 0 #FFF, 28px 16px 0 #481a66, 32px 16px 0 #FFF, 36px 16px 0 #481a66, 40px 16px 0 #481a66, 44px 16px 0 #000, 0px 20px 0 #000, 4px 20px 0 #481a66, 8px 20px 0 #481a66, 12px 20px 0 #481a66, 16px 20px 0 #481a66, 20px 20px 0 #000, 24px 20px 0 #000, 28px 20px 0 #481a66, 32px 20px 0 #481a66, 36px 20px 0 #481a66, 40px 20px 0 #481a66, 44px 20px 0 #000, 0px 24px 0 #000, 4px 24px 0 #000, 8px 24px 0 #481a66, 12px 24px 0 #481a66, 16px 24px 0 #000, 20px 24px 0 #FFF, 24px 24px 0 #a5a5a5, 28px 24px 0 #000, 32px 24px 0 #481a66, 36px 24px 0 #481a66, 40px 24px 0 #000, 44px 24px 0 #000, 0px 28px 0 #000, 4px 28px 0 #FFF, 8px 28px 0 #000, 12px 28px 0 #000, 16px 28px 0 #000, 20px 28px 0 #a5a5a5, 24px 28px 0 #a5a5a5, 28px 28px 0 #000, 32px 28px 0 #000, 36px 28px 0 #000, 40px 28px 0 #a5a5a5, 44px 28px 0 #000, 4px 32px 0 #000, 8px 32px 0 #FFF, 12px 32px 0 #FFF, 16px 32px 0 #FFF, 20px 32px 0 #000, 24px 32px 0 #000, 28px 32px 0 #a5a5a5, 32px 32px 0 #a5a5a5, 36px 32px 0 #a5a5a5, 40px 32px 0 #000, 4px 36px 0 #000, 8px 36px 0 #a5a5a5, 12px 36px 0 #FFF, 16px 36px 0 #FFF, 20px 36px 0 #FFF, 24px 36px 0 #a5a5a5, 28px 36px 0 #a5a5a5, 32px 36px 0 #a5a5a5, 36px 36px 0 #a5a5a5, 40px 36px 0 #000, 8px 40px 0 #000, 12px 40px 0 #000, 16px 40px 0 #a5a5a5, 20px 40px 0 #a5a5a5, 24px 40px 0 #a5a5a5, 28px 40px 0 #a5a5a5, 32px 40px 0 #000, 36px 40px 0 #000, 16px 44px 0 #000, 20px 44px 0 #000, 24px 44px 0 #000, 28px 44px 0 #000;
}
.pokeball#safari {
  animation-delay: 1s;
  margin: -4px 0 0 216px;
  box-shadow: 16px 0 0 #000, 20px 0 0 #000, 24px 0 0 #000, 28px 0 0 #000, 8px 4px 0 #000, 12px 4px 0 #000, 16px 4px 0 #9a4a01, 20px 4px 0 #9a4a01, 24px 4px 0 #606700, 28px 4px 0 #5fa300, 32px 4px 0 #000, 36px 4px 0 #000, 4px 8px 0 #000, 8px 8px 0 #606700, 12px 8px 0 #606700, 16px 8px 0 #606700, 20px 8px 0 #9a4a01, 24px 8px 0 #9a4a01, 28px 8px 0 #5fa300, 32px 8px 0 #606700, 36px 8px 0 #9a4a01, 40px 8px 0 #000, 4px 12px 0 #000, 8px 12px 0 #9a4a01, 12px 12px 0 #9a4a01, 16px 12px 0 #9a4a01, 20px 12px 0 #9a4a01, 24px 12px 0 #9a4a01, 28px 12px 0 #5fa300, 32px 12px 0 #606700, 36px 12px 0 #606700, 40px 12px 0 #000, 0px 16px 0 #000, 4px 16px 0 #5fa300, 8px 16px 0 #606700, 12px 16px 0 #5fa300, 16px 16px 0 #5fa300, 20px 16px 0 #606700, 24px 16px 0 #606700, 28px 16px 0 #606700, 32px 16px 0 #5fa300, 36px 16px 0 #9a4a01, 40px 16px 0 #9a4a01, 44px 16px 0 #000, 0px 20px 0 #000, 4px 20px 0 #5fa300, 8px 20px 0 #606700, 12px 20px 0 #5fa300, 16px 20px 0 #606700, 20px 20px 0 #000, 24px 20px 0 #000, 28px 20px 0 #606700, 32px 20px 0 #606700, 36px 20px 0 #5fa300, 40px 20px 0 #5fa300, 44px 20px 0 #000, 0px 24px 0 #000, 4px 24px 0 #000, 8px 24px 0 #606700, 12px 24px 0 #606700, 16px 24px 0 #000, 20px 24px 0 #FFF, 24px 24px 0 #a5a5a5, 28px 24px 0 #000, 32px 24px 0 #9a4a01, 36px 24px 0 #9a4a01, 40px 24px 0 #000, 44px 24px 0 #000, 0px 28px 0 #000, 4px 28px 0 #FFF, 8px 28px 0 #000, 12px 28px 0 #000, 16px 28px 0 #000, 20px 28px 0 #a5a5a5, 24px 28px 0 #a5a5a5, 28px 28px 0 #000, 32px 28px 0 #000, 36px 28px 0 #000, 40px 28px 0 #a5a5a5, 44px 28px 0 #000, 4px 32px 0 #000, 8px 32px 0 #FFF, 12px 32px 0 #FFF, 16px 32px 0 #FFF, 20px 32px 0 #000, 24px 32px 0 #000, 28px 32px 0 #a5a5a5, 32px 32px 0 #a5a5a5, 36px 32px 0 #a5a5a5, 40px 32px 0 #000, 4px 36px 0 #000, 8px 36px 0 #a5a5a5, 12px 36px 0 #FFF, 16px 36px 0 #FFF, 20px 36px 0 #FFF, 24px 36px 0 #a5a5a5, 28px 36px 0 #a5a5a5, 32px 36px 0 #a5a5a5, 36px 36px 0 #a5a5a5, 40px 36px 0 #000, 8px 40px 0 #000, 12px 40px 0 #000, 16px 40px 0 #a5a5a5, 20px 40px 0 #a5a5a5, 24px 40px 0 #a5a5a5, 28px 40px 0 #a5a5a5, 32px 40px 0 #000, 36px 40px 0 #000, 16px 44px 0 #000, 20px 44px 0 #000, 24px 44px 0 #000, 28px 44px 0 #000;
}
```
<!--endtab-->
{% endtabs %}
# Step4
现在结构和样式文件已经写好了，下面就是修改``[BlogRoot]\themes\butterfly\layout\includes\loading\index.pug``,把原有的代码删掉，换成下面的代码，意思是当配置项``theme.preloader.load_style``是``pokeball``时，就使用``pokeball.pug``，否则就按默认的。
```
if theme.preloader.enable
  case theme.preloader.load_style    
    when 'pokeball'
      include ./load_style/pokeball.pug
    default
      include ./fullpage-loading.pug
```

接着修改``F:\myCode\gitProject\myBlog_Hexo\themes\butterfly\source\css\_layout\loading.style``，把原有代码备份到``loading_backup.styl``，然后删掉``loading.style``的代码，换成下面的代码。
```
if hexo-config('preloader.enable')
  if hexo-config('preloader.load_style') == 'pokeball'
    @import './_load_style/pokeball'
  else
    @import 'loading_backup'
```

# Step5
修改``[BlogRoot]\themes\butterfly\source\css\var.styl``,添加自定义修改背景颜色的配置项，意思是从``_config.butterfly,yml``的配置中获取配置``preloader.load_color``作为背景颜色
```styl
$preloader-bg = hexo-config('preloader.enable') && hexo-config('preloader.load_color') ? convert(hexo-config('preloader.load_color')) : #37474f
```

# Step6
修改``[BlogRoot]\_config.butterfly,yml``的preloader配置项，可以自行修改背景颜色，后续也可以自定义加载动画，只需按上面步骤走就行。
```
# Loading Animation (加載動畫)
preloader:
  enable: true
  load_color: '#7efff5' #'#74b9ff' #'#000000' # '#37474f'
  load_style: pokeball # default
```

# 效果
![](https://img.linjq.top/202407091645672.gif)