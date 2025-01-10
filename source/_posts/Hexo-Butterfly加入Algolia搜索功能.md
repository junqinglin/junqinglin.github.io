---
title: Hexo-Butterfly加入Algolia搜索功能
auther: ljq
top_img: https://img.linjq.top/top_img.jpg
cover: https://img.linjq.top/default_post_cover.png
abbrlink: 873691fe
date: 2024-07-11 14:28:29
categories:
  - 前端
tags:
  - Hexo
  - Butterfly
mathjax: 
aside: 
description: 博客功能"搜索"的实现
---
# 注册
1. 首先在官网[Sign Up | Algolia](https://dashboard.algolia.com/users/sign_up)注册账号，也可以用`github`直接登录
![image.png](https://img.linjq.top/202407111433802.png)
2. 左下角`Data sources -> indices -> Create Index` 创建Index，记住名字，下面有用
![image.png](https://img.linjq.top/202407111439924.png)
# 安装依赖并写入配置

1. 在博客根目录下，打开命令窗口执行：
```
npm install hexo-algoliasearch --save
```
2. 修改站点配置文件`_config.yml`，添加如下代码：
```
algolia:
  appId: "your applicationID"
  apiKey: "your Search-Only API Key"
  adminApiKey: "your Admin API Key"
  chunkSize: 5000
  indexName: "your indexName"
  fields:
    - content:strip:truncate,0,500
    - excerpt:strip
    - gallery
    - permalink
    - photos
    - slug
    - tags
    - title
```
填入自己的`key`和`index_name`
3. 前往博客根目录，打开命令窗口执行命令：
```
hexo algolia
```
4. 在主题配置文件`_config.butterfly.yml`中修改以下内容：
```
algolia_search:
  enable: true
  hits:
    per_page: 10
  labels:
    input_placeholder: Search for Posts
    hits_empty: "我们没有找到任何搜索结果: ${query}"
    hits_stats: "找到${hits}条结果（用时${time} ms）"
```
5. 三连：
```
hexo clean && hexo g && hexo s
```
6. 最后，如果写了新的文章，准备部署，可在`hexo generate`后`hexo deploy`前执行`hexo algolia`
# 效果
![image.png](https://img.linjq.top/202407111510966.png)
# 参考文章
[基于 Hexo 键入搜索功能 | 唐志远 (fe32.top)](https://fe32.top/articles/hexo1607/)