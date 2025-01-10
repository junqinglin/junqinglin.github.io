---
title: Docker安装记录
auther: ljq
top_img: https://img.linjq.top/top_img.jpg
cover: https://img.linjq.top/default_post_cover.png
categories:
  - 后端
tags:
  - Docker
abbrlink: 7db66c50
date: 2024-07-17 11:37:08
mathjax: 
aside: 
description: 自己安装Docker的记录
---
# step1 Centos7换yum源
1. 备份：
```Bash
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```
2. 下载新的CentOS-Base.repo 到/etc/yum.repos.d/
```Bash
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
```
3. 清空并生成缓存
```Bash
yum clean all
yum makecache
```
# Step2 配置Docker的yum库
1. 首先要安装一个yum工具:
 ```Bash
yum install -y yum-utils device-mapper-persistent-data lvm2
```
2. 安装成功后，执行命令，配置Docker的yum源,用阿里云的：
```Bash
yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```
# Step3 安装Docker
安装社区版docker：
```Bash
yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

# Step4 启动和校验
```Bash
# 启动Docker
systemctl start docker

# 停止Docker
systemctl stop docker

# 重启
systemctl restart docker

# 设置开机自启
systemctl enable docker

# 执行docker ps命令，如果不报错，说明安装启动成功
docker ps
```
# ~~Step5 配置镜像加速（已失效）~~
在**阿里云镜像服务->镜像工具->镜像加速器**中找到配置文档说明，按照上面的命令运行即可。
# Step5 配置镜像加速
```
# 创建目录
mkdir -p /etc/docker

# 复制内容，注意把其中的镜像加速地址改成你自己的
tee /etc/docker/daemon.json <<-'EOF'
{
    "registry-mirrors": [
        "http://hub-mirror.c.163.com",
        "https://mirrors.tuna.tsinghua.edu.cn",
        "http://mirrors.sohu.com",
        "https://ustc-edu-cn.mirror.aliyuncs.com",
        "https://ccr.ccs.tencentyun.com",
        "https://docker.m.daocloud.io",
        "https://docker.awsl9527.cn"
    ]
}
EOF

# 重新加载配置
systemctl daemon-reload

# 重启Docker
systemctl restart docker
```