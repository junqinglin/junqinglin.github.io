---
title: Hexo-Butterfly首页轮播图
auther: ljq
top_img: https://img.linjq.top/top_img.jpg
cover: https://img.linjq.top/default_post_cover.png
abbrlink: cf15f90b
date: 2024-07-10 16:02:25
categories:
  - 前端
tags:
  - Hexo
  - Butterfly
mathjax: 
aside: 
description: 博客首页顶部轮播图的魔改实现
---
# Step1 新建PUG
在`[BLOG ROOT]\themes\butterfly\layout\includes`下新建`hometop.pug`:
```
if is_home()
  #hometop
    #hometop-content(style='background-image: url(' + theme.default_hometop_img + ');')
      h1#site-title=config.title
      if theme.subtitle.enable
        - var loadSubJs = true
        #site-subtitle
          span#subtitle
      button#toggleButton.toggle-button(onclick='toggleSlider()')
        i.fas.fa-chevron-down
      #sliderOverlay.slider-overlay
        .swiper-container
          .swiper-wrapper
            each i in site.data.slider
              .swiper-slide
                .swiper-slide-mask(style='background-image: url(' + i.cover + ');')
                .swiper-slide-content
                  p.swiper-content-title.swiper-content-item(onclick='pjax.loadUrl(\'' + i.link + '\')')= i.title
                  p.swiper-content-time.swiper-content-item= i.timeline
                  p.swiper-content-description.swiper-content-item= i.description
          .swiper-pagination
          .swiper-button-next.swiper-buttons
          .swiper-button-prev.swiper-buttons

  script(defer='' src=url_for(theme.CDN.option.swiper_js))
  script(defer='' data-pjax='' src=url_for(theme.CDN.option.hometop_js))
```

# Step2 新建CSS
在`[BLOG ROOT]\source\css`下新建`hometop.css`:
```
#hometop {
    position: relative;
    width: 100%;
    height: 50vh;
    margin: 0 auto;
    padding: 1rem;
    max-width: 1200px;
    min-height: 250px;
    max-height: 430px;
}
@media screen and (max-width: 768px) {
  #hometop{
    height: 35vh;
  }
}
#hometop-content {
    position: relative;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: 50% 65%;
    display: flex;
    flex-wrap: wrap;
    align-content:center;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: filter 0.5s ease;
}

.title {
    color: #fff;
    font-size: 24px;
    z-index: 1;
}

.toggle-button {
    position: absolute;
    top: 15px;
    right: 15px;
    border: none;
    border-radius: 5px;
    width: 2.6rem;
    height: 2.6rem;
    cursor: pointer;
    z-index: 3;
    transition: rotate 0.5s ease-in-out;
    border-radius: 30px;
    background-color: rgba(255, 255, 255, 0.3);
}
.toggle-button >i{
  color: rgba(255, 255, 255, 0.6);

  font-size: 2rem;
}
.toggle-button:hover >i{
  color: rgba(255, 255, 255, 1);
}
.toggle-button:hover{
  background-color: var(--ljq-hover-bg);
}

.slider-overlay {
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: top 0.5s ease;
    z-index: 2;
}

.swiper-container {
    width: 100%;
    height: 100%;
}

.swiper-slide {
  position: relative;
    /* background-color: #fff; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #333;
}
.swiper-slide-mask{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center; /* 将图片居中显示 */
  transition: filter 0.3s ease;
}
.swiper-slide:hover .swiper-slide-mask{
  filter: blur(10px);
}
.swiper-slide-content{
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}
.swiper-content-item{
  width: 80%;
  max-height: 30%;
  color: #fff;
  margin: 0.5rem 0;
  text-align: center;
  font-weight: bold;
  white-space: nowrap; /* 防止文本换行 */ 
  overflow: hidden; /* 隐藏超出容器的文本 */
  text-overflow: ellipsis;
}
.swiper-content-title {
  font-size: 2.8rem;
  text-decoration: none;
  cursor: pointer;
}
.swiper-content-time, .swiper-content-description{
  font-size: 1.2rem;
}
@media screen and (max-width: 768px) {
  .swiper-content-title{
    font-size: 1.8rem;
  }
  .swiper-content-time, .swiper-content-description{
    font-size: 0.875rem;
  }
}
.swiper-buttons::after{
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.5rem;
}
.swiper-buttons:hover::after{
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.8rem;
}
.swiper-pagination-bullet{
  width: 0.68rem;
  height: 0.68rem;
}
#hometop-content #site-title{
  width: 100%;
  height: 25%;
  text-align:center;
  font-size: 2.8rem;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis;
  color: white;
}
#hometop-content #site-subtitle{
  width: 100%;
  height: 15%;
  text-align:center;
  font-size: 1rem;
    white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
}
@media screen and (max-width: 768px) {
  #hometop-content #site-title{
    font-size: 1.8rem;
  }
  #hometop-content #site-subtitle{
    font-size: 0.875rem;
  }
}
```

# Step3 新建JS
在`[BLOG ROOT]\source\js`下新建`hometop.js`:
```
function toggleSlider() {
    const sliderOverlay = document.getElementById('sliderOverlay');
    const toggleButton = document.getElementById('toggleButton');
    if (sliderOverlay.style.top === '0%') {
        sliderOverlay.style.top = '-100%';
        toggleButton.style.rotate = '0deg';
    } else {
        sliderOverlay.style.top = '0%';
        toggleButton.style.rotate = '180deg';
    }
}

var hometop_swiper = new Swiper('.swiper-container', {
        loop: true, 
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
```
# Step4 新建配置文件
在`[BLOG ROOT]\source\_data`下新建`slider.yml`, 填入自己想放在轮播图里面的文章的信息:
```
- cover: https://img.linjq.top/top_img.jpg
  timeline: '2024-01-15' # 日期，需要用''包裹
  link: /articles/db2d9172/
  title: JWT令牌技术
  description: 登录认证常用技术-JWT技术介绍
- cover: https://img.linjq.top/top_img.jpg
  timeline: '2024-03-25'
  link: /articles/2454e4a5/
  title: 自定义注解，通过AOP实现公共字段填充
  description: 简要介绍反射、注解、AOP相关知识，并介绍如何通过AOP实现公共字段填充
- cover: https://img.linjq.top/top_img.jpg
  timeline: '2023-12-23'
  link: /articles/216710e/
  title: Hexo-Butterfly主题的加载动画修改
  description: 博客加载动画的魔改
```
# Step5 注入配置
1. 在主题配置文件中注入CSS：
```
inject:
  head:
    - <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/Swiper/11.0.5/swiper-bundle.min.css">
    - <link rel="stylesheet" href="/css/hometop.css">
```
2. 在主题配置文件底部CDN的options下添加：
```
pjax: https://lib.baomitu.com/pjax/0.2
swiper_js: https://cdn.bootcdn.net/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js
hometop_js: /js/hometop.js
```
3. 在主题配置文件最下面添加以下代码，用于设置顶部背景图片：
```
########## 自定义属性 ##########
# hometop_img
default_hometop_img: https://img.linjq.top/202407171041498.jpg
```
# 参考文章
[Swiper Bar | Akilarの糖果屋](https://akilar.top/posts/8e1264d1/)

