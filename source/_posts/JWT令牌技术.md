---
title: JWT令牌技术
auther: ljq
top_img: https://pic.linjq.top/img/top_img.jpg
categories:
  - 后端
tags:
  - Java
  - JWT
abbrlink: db2d9172
date: 2024-01-15 16:42:30
mathjax: 
aside: 
cover: https://pic.linjq.top/img/default_post_cover.png
description: 登录认证常用技术-JWT技术介绍
---
# 前言

## 会话

在了解JWT之前，我们先来介绍一下会话。什么是会话呢？在我们日常生活当中，会话指的就是谈话、交谈。在web开发当中，会话指的就是**浏览器与服务器之间的一次连接**，我们就称为一次会话。在用户打开浏览器第一次访问服务器的时候，这个会话就建立了，直到有任何一方**断开连接**，此时**会话就结束**了。在一次会话当中，是可以包含**多次**请求和响应的。

需要注意的是：**会话是和浏览器关联的**，当有三个浏览器客户端和服务器建立了连接时，就会有三个会话。同一个浏览器在未关闭之前请求了多次服务器，这多次请求是属于同一个会话。

## 会话跟踪

了解了会话之后，那么服务器怎么分辨请求是否来自同一浏览器呢？这就需要用到会话跟踪的技术，它是一种维护浏览器状态的方法，服务器需要识别多次请求是否来自于同一浏览器，以便在同一次会话的多次请求间共享数据。

### 会话跟踪技术有：

1. Cookie（客户端会话跟踪技术）
    * 数据存储在客户端浏览器当中

2. Session（服务端会话跟踪技术）
    * 数据存储在储在服务端

3. JWT令牌技术

### 优缺点对比

|   |   |   |   |
|---|---|---|---|
||Cookie|Session|JWT令牌|
|优点|- HTTP协议中支持的技术（像Set-Cookie 响应头的解析以及 Cookie 请求头数据的携带，都是浏览器自动进行的，是无需我们手动操作的）|- Session是存储在服务端的，安全|- 支持PC端、移动端<br>-  解决集群环境下的认证问题<br>- 减轻服务器的存储压力（无需在服务器端存储）|
|缺点|- 移动端APP(Android、IOS)中无法使用Cookie<br>- 不安全，用户可以自己禁用Cookie<br>- Cookie不能跨域|- 服务器集群环境下无法直接使用Session<br>- Cookie的所有缺点（Session 底层是基于Cookie实现的会话跟踪，如果Cookie不可用，则该方案也就失效了）|- 需要自己实现（包括令牌的生成、令牌的传递、令牌的校验）|

# JWT简介

JWT是一个开放标准(RFC 7519)（[官网](https://jwt.io/)），全称JSON Web Token，它定义了一种紧凑的、自包含的方式，用于作为JSON对象在各方之间安全地传输信息。该信息可以被验证和信任，因为它是数字签名的。
简单来讲，JWT就是将原始的json数据格式进行了安全的封装，这样就可以直接基于JWT在通信双方安全的进行信息传输了。

# JWT的组成

- 第一部分：Header(头）， 记录令牌类型、签名算法等。 例如：``{"alg":"HS256","type":"JWT"}``
- 第二部分：Payload(有效载荷），携带一些自定义信息、默认信息等。 例如：``{"id":"1","username":"Tom"}``
- 第三部分：Signature(签名），防止Token被篡改、确保安全性。将header、payload，并加入指定秘钥，通过指定签名算法计算而来。

签名的目的就是为了防JWT令牌被篡改，而正是因为jwt令牌最后一个部分数字签名的存在，所以整个JWT令牌是非常安全可靠的。一旦JWT令牌当中任何一个部分、任何一个字符被篡改了，整个令牌在校验的时候都会失败，所以它是非常安全可靠的。
![](https://pic.linjq.top/img/202407091645675.png)
JWT是如何将原始的JSON格式数据，转变为字符串的呢？其实在生成JWT令牌时，会对JSON格式的数据进行base64编码。

# 应用场景

JWT令牌最典型的应用场景就是**登录认证**：

1. 在浏览器发起请求来执行登录操作，此时会访问登录的接口，如果登录成功之后，我们需要生成一个JWT令牌，将生成的JWT令牌返回给前端。
2. 前端拿到JWT令牌之后，会将JWT令牌存储起来。在后续的每一次请求中都会将JWT令牌携带到服务端。
3. 服务端统一拦截请求之后，先来判断一下这次请求有没有把令牌带过来，如果没有带过来，直接拒绝访问，如果带过来了，还要校验一下令牌是否是有效。如果有效，就直接放行进行请求的处理。

# 生成和校验

## 引入依赖

使用JWT令牌，需要先引入依赖：

```
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>版本</version>
</dependency>
```

若是JDK8以上的版本还需要引入以下依赖：

```
<dependency>
	<groupId>javax.xml.bind</groupId>
	<artifactId>jaxb-api</artifactId>
	<version>2.3.0</version>
</dependency>
```

> 因为Java9中引入了模块的概念，默认情况下，Java SE中将不再包含java EE的Jar包，javax.xml.bind是Java EE 的，因此在java SE 9.0中不再包含这个Jar 包。

## 生成JWT

```
public void genJwt(){
        Map<String,Object> claims = new HashMap<>();
        claims.put("id",1);
        claims.put("username","Tom");

        String jwt = Jwts.builder()
                .setClaims(claims) //自定义内容(载荷)
                .signWith(SignatureAlgorithm.HS256, "123456") //签名算法、密钥
                .setExpiration(new Date(System.currentTimeMillis() + 24*3600*1000)) //有效期
                .compact();

        System.out.println(jwt);
    }
```

> **注意**：如果使用加密算法为HS256，HS384或HS512，则密钥字节数组必须分别为256位（32字节），384位（48字节）或512位（64字节）

以上代码生成密钥：``eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNzA1MzkyOTc3LCJ1c2VybmFtZSI6IlRvbSJ9.Q4p8mqwWjJ2EX5_NHGcYSvmAiHPEWCfM64iKsb_NdMQ``

JWT官网可以解析：
![](https://pic.linjq.top/img/202407091645671.png)
## 校验JWT

```
public void parseJwt(){
    String jwt = "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNzA1MzkyOTc3LCJ1c2VybmFtZSI6IlRvbSJ9.Q4p8mqwWjJ2EX5_NHGcYSvmAiHPEWCfM64iKsb_NdMQ";
    Claims claims = Jwts.parser()
            .setSigningKey("123456")//指定签名密钥（必须保证和生成令牌时使用相同的签名密钥）
            .parseClaimsJws(jwt)
            .getBody();
    System.out.println(claims);
}
```

得到结果``{id=1, exp=1705392977, username=Tom}``

> 在实际项目中，JWT一般配合拦截器使用