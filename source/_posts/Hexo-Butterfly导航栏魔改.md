---
title: Hexo-Butterfly导航栏魔改
auther: ljq
top_img: https://img.linjq.top/top_img.jpg
cover: https://img.linjq.top/default_post_cover.png
abbrlink: "25281569"
date: 2024-07-10 20:59:07
categories:
  - 前端
tags:
  - Hexo
  - Butterfly
mathjax: 
aside: 
description: 导航栏魔改记录
---
# Step1
 修改`nav.pug`
```
nav#nav
  #nav-group
    span#blog-info
      a(href=url_for('/') title=config.title)
        if theme.nav.logo
          img.site-icon(src=url_for(theme.nav.logo))
        if theme.nav.display_title
          span.site-name=config.title

    #menus
      !=partial('includes/header/menu_item', {}, {cache: true})
    #nav-right
      #random-post-button
        a.site-page(onclick="toRandomPost()" title="随机前往一篇文章")
          i.fa-solid.fa-dice

      if (theme.algolia_search.enable || theme.local_search.enable || theme.docsearch.enable)
        #search-button
          a.site-page.social-icon.search(href="javascript:void(0);" title="搜索")
            i.fas.fa-search.fa-fw

      #toggle-menu
        a.site-page(href="javascript:void(0);" title="菜单")
          i.fas.fa-bars.fa-fw
```

# Step2
新建`my_nav.css`
```
#nav-right{
    flex:1 1 auto;
    justify-content: flex-end;
    margin-left: auto;
    display: flex;
    flex-wrap:nowrap;
}
#nav-right >div a{
    padding:0.35rem;
    border-radius:20px;
}
#nav-right >div:hover a{
    color: white!important;
    background: var(--ljq-hover-bg);
}
#nav-right >div{
    margin-left: 0.6rem;
    font-size: 1.25rem;
}
#nav *::after{
    background-color: transparent!important;
}
.site-name::before{
    opacity: 0;
    background-color: var(--ljq-hover-bg);
    border-radius: 5px;
    transition: .3s;
    position:absolute;
    top:0;
    right:0;
    width:100%;
    height:100%;
    content: "\f015";
    font-family: "Font Awesome 6 Free";
    text-align: center;
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
}
.site-name:hover::before{
    opacity: 1;
    scale:1.1;
}
.site-name{
    position: relative;
    padding:0.3rem;
    font-size:1.2rem;
    margin-left: 0.2rem;
}

.menus_item{
    padding:0 0.6rem;
    margin:0 0.2rem;
    border-radius:5px;
    
}
.menus_item:hover{
    background: var(--ljq-hover-bg);
}

.menus_item:hover >a{
    color: white!important;

}
.menus_item_child li:hover a{
    color: white!important;
}
#nav-group{
    display:flex;
    justify-content:space-between;
    width:100%;
    height:100%;
    max-width:1200px;
    margin:0 auto;
    align-items:center;
    padding:0 1rem;
}
```
# Step3
导入css：
```
inject:
  head:
    - <link rel="stylesheet" href="/css/my_nav.css">
```
# other
除了上述修改，还对`[BlogRoot]\themes\butterfly\layout\includes\headerhead.styl`做了一些样式修改，小修小改没有记录下来。感兴趣的可以F12爬一下我的。
# 参考文章
[关于Butterfly的导航栏的一些教程 | Ariasakaの小窝 (yaria.top)](https://blog.yaria.top/posts/895003b5/)
