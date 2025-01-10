---
title: Go语言实践案例
auther: ljq
top_img: 'https://img.linjq.top/top_img.jpg'
cover: 'https://img.linjq.top/default_post_cover.png'
categories:
  - 后端
tags:
  - Golang
abbrlink: 2b056add
date: 2024-11-04 20:23:44
mathjax:
aside:
description:
---
# 猜谜游戏
## 生成随机数

我们可以使用 **`math/rand`** 包的`Intn`函数来生成随机数：
```
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	maxNum := 100
	secretNumber := rand.Intn(maxNum) // 生成从0-99的随机数
	fmt.Println("The secret number is ", secretNumber)
	fmt.Println(time.Now().UnixNano())
}
```
上面的例子生成了一个0-99的随机数，`rand.Intn` 函数会使用 `math/rand` 包的全局随机数生成器来产生随机数。这个全局随机数生成器在包被初始化时会被种子化，通常是在程序启动时，使用当前时间作为种子。
我们也可以自己定义一个随机数生成器：
```
// 创建一个自定义的随机数生成器
r := rand.New(rand.NewSource(time.Now().UnixNano()))
```
在Go 1.20之前，使用的是`rand.Seed(time.Now().UnixNano())`，但是该方法目前已被弃用，我们应该尽量避免使用该方法。
## 读取用户输入
可以使用标准库中的`bufio`包来读取用户的输入。`bufio`包提供了缓冲的I/O功能，它封装了一个`io.Reader`和`io.Writer`对象，创建了另一个也实现了接口的对象，它同时提供了缓冲和一些帮助操作，如行的读取和写入、字符串的读取和写入等。
```
package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	// 创建一个新的bufio.Reader对象，它将os.Stdin作为输入
	reader := bufio.NewReader(os.Stdin)

	// 提示用户输入
	fmt.Print("请输入一些内容: ")

	// 使用ReadString方法读取一行输入，直到遇到换行符或EOF
	input, err := reader.ReadString('\n')
	if err != nil {
		// 处理错误
		fmt.Println("读取输入时发生错误:", err)
		return
	}

	// 去掉输入字符串末尾的换行符
	input = strings.TrimSuffix(input, "\n")

	// 输出用户输入的内容
	fmt.Println("你输入的内容是:", input)
}
```
在这个例子中，程序会等待用户输入，直到用户按下回车键（即输入了换行符）。`ReadString`方法会读取输入直到遇到指定的分隔符（在这个例子中是换行符`'\n'`），然后返回读取的内容。返回的结果中包含了换行符，所以我们通过`input = strings.TrimSuffix(input, "\n")`去掉了末尾的换行符。
由于输入的是字符串，因此我们需要将其转化成数字：
```
guess, err := strconv.Atoi(input)
```
## 实现判断逻辑和游戏循环
获取到用户的输入后，我们需要判断用户的输入和随机数之间的关系（大于、小于或相等），并给出提示，以便用户下一次输入，在用户没得到正确答案之前，需要不断循环，知道得出正确答案为止，具体见代码：
```
package main

import (
	"bufio"
	"fmt"
	"math/rand"
	"os"
	"strconv"
	"strings"
	"time"
)

func main() {
	maxNum := 100
	// 创建一个自定义的随机数生成器
	r := rand.New(rand.NewSource(time.Now().UnixNano()))

	// 使用自定义的随机数生成器生成随机数
	secretNumber := r.Intn(maxNum) // 生成一个0到99之间的随机数
	// fmt.Println("The secret number is ", secretNumber)

	fmt.Println("Please input your guess")
	// 创建一个新的bufio.Reader对象，它将os.Stdin作为输入
	reader := bufio.NewReader(os.Stdin)
	for {
		// 读取用户输入
		input, err := reader.ReadString('\n')
		if err != nil {
			fmt.Println("An error occured while reading input. Please try again", err)
			continue
		}
		// 去掉输入字符串末尾的换行符
		input = strings.Trim(input, "\r\n")

		// 将输入字符串转换为整数
		guess, err := strconv.Atoi(input)
		if err != nil {
			fmt.Println("Invalid input. Please enter an integer value")
			continue
		}
		fmt.Println("You guess is", guess)
		if guess > secretNumber { // 判断猜测的数字是否大于随机数
			fmt.Println("Your guess is bigger than the secret number. Please try again")
		} else if guess < secretNumber { // 判断猜测的数字是否小于随机数
			fmt.Println("Your guess is smaller than the secret number. Please try again")
		} else { // 判断猜测的数字是否等于随机数
			fmt.Println("Correct, you Legend!")
			break
		}
	}
}
```
# 在线词典
## 概述
在线词典的原理是根据输入的要查询的单词，构造请求报文，发送到彩云翻译，然后抓包，解析返回的数据，然后显示到本地。
## 发送Http请求
我们可以试着打开彩云翻译，并按F12打开开发者工具，查看网络请求：
![image.png](https://img.linjq.top/202411051046489.png)
可以看到`dict`这个包(请求方法为Post)包含了我们的请求，我们只需要解析这个请求的响应报文即可。
那么在Go语言中如何发送这个Http请求呢？
其实我们手动去创建请求是很麻烦的，有一个在线工具可以帮助我们快速生成请求：[curl to Go](https://curlconverter.com/go/)。我们可以复制`dict`包的`cUrl`，然后粘贴到这个在线工具中，它就会帮我们自动生成代码：
![image.png](https://img.linjq.top/202411051055559.png)
![image.png](https://img.linjq.top/202411051058060.png)
代码注释如下：
```
func main() {
    // 创建一个 HTTP 客户端
    client := &http.Client{}
    // 创建一个 JSON 格式的请求体，包含翻译类型和源文本
    var data = strings.NewReader(`{"trans_type":"en2zh","source":"good"}`)
    // 创建一个 HTTP 请求，指定方法、URL 和请求体
    req, err := http.NewRequest("POST", "https://api.interpreter.caiyunai.com/v1/dict", data)
    // 如果创建请求时发生错误，记录错误并终止程序
    if err!= nil {
        log.Fatal(err)
    }
    // 设置请求头，指定接受的内容类型为 JSON、纯文本等
    req.Header.Set("accept", "application/json, text/plain, */*")
    // 设置请求头，指定接受的语言为中文
    req.Header.Set("accept-language", "zh")
    // 设置请求头，指定应用名称为 xiaoyi
    req.Header.Set("app-name", "xiaoyi")
    // 设置请求头，指定授权类型为 Bearer，但未提供具体的 token
    req.Header.Set("authorization", "Bearer")
    // 设置请求头，指定内容类型为 JSON，并设置字符编码为 UTF-8
    req.Header.Set("content-type", "application/json;charset=UTF-8")
    // 设置请求头，指定设备 ID
    req.Header.Set("device-id", "3a58cdf8ea538ddff30f0464b7d99c22")
    // 设置请求头，指定请求的来源为彩云翻译网页版
    req.Header.Set("origin", "https://fanyi.caiyunapp.com")
    // 设置请求头，指定操作系统类型为 Web
    req.Header.Set("os-type", "web")
    // 设置请求头，指定操作系统版本为空
    req.Header.Set("os-version", "")
    // 设置请求头，指定请求的优先级
    req.Header.Set("priority", "u=1, i")
    // 设置请求头，指定请求的来源页面为彩云翻译网页版
    req.Header.Set("referer", "https://fanyi.caiyunapp.com/")
    // 设置请求头，指定用户代理为 Edge 浏览器的特定版本
    req.Header.Set("sec-ch-ua", `"Chromium";v="130", "Microsoft Edge";v="130", "Not?A_Brand";v="99"`)
    // 设置请求头，指定是否为移动设备请求
    req.Header.Set("sec-ch-ua-mobile", "?0")
    // 设置请求头，指定平台为 Windows
    req.Header.Set("sec-ch-ua-platform", `"Windows"`)
    // 设置请求头，指定请求的目的
    req.Header.Set("sec-fetch-dest", "empty")
    // 设置请求头，指定请求的模式为跨域
    req.Header.Set("sec-fetch-mode", "cors")
    // 设置请求头，指定请求的来源站点为跨站
    req.Header.Set("sec-fetch-site", "cross-site")
    // 设置请求头，指定用户代理为 Edge 浏览器的特定版本
    req.Header.Set("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0")
    // 设置请求头，指定自定义的授权信息
    req.Header.Set("x-authorization", "token:qgemv4jr1y38jyq6vhvi")
    // 发送 HTTP 请求，并获取响应
    resp, err := client.Do(req)
    // 如果发送请求时发生错误，记录错误并终止程序
    if err!= nil {
        log.Fatal(err)
    }
    // 延迟关闭响应体
    defer resp.Body.Close()
    // 读取响应体的内容
    bodyText, err := io.ReadAll(resp.Body)
    // 如果读取响应体时发生错误，记录错误并终止程序
    if err!= nil {
        log.Fatal(err)
    }
    // 打印响应体的内容
    fmt.Printf("%s\n", bodyText)
}
```
## 创建请求和响应结构
请求和响应都是JSON格式的数据，因此我们需要构造请求和响应的结构体
### 请求结构
可以看到请求头里面包含的数据有：
![image.png](https://img.linjq.top/202411051128995.png)
如果登录了的话，还会有`user_id`，因此我们可以构造结构：
```
type DictRequest struct {
	TransType string `json:"trans_type"`
	Source    string `json:"source"`
	UserID    string `json:"user_id"`
}
```
### 响应结构
同样我们如果手动去构建的话，会比较麻烦，因此我们这里也是借助了一个工具：[JSON转Golang Struct - 在线工具 - OKTools](https://oktools.iokde.com/json2go)，复制响应的JSON数据，粘贴到工具中进行转换即可
![image.png](https://img.linjq.top/202411051338088.png)
![image.png](https://img.linjq.top/202411051338480.png)
```
type AutoGenerated struct {
	Rc int `json:"rc"`
	Wiki struct {
	} `json:"wiki"`
	Dictionary struct {
		Prons struct {
			EnUs string `json:"en-us"`
			En string `json:"en"`
		} `json:"prons"`
		Explanations []string `json:"explanations"`
		Synonym []string `json:"synonym"`
		Antonym []string `json:"antonym"`
		WqxExample [][]string `json:"wqx_example"`
		Entry string `json:"entry"`
		Type string `json:"type"`
		Related []interface{} `json:"related"`
		Source string `json:"source"`
	} `json:"dictionary"`
}
```
## 封装请求与解析响应
封装请求比较简单，根据上面构造的请求结构体，把“Source”的值改成我们输入的word即可。
封装好请求体后，利用上面所说的发送Http请求的方法，发送请求，将会得到了响应数据。
得到响应数据后，要进行以下操作：
1. 判断请求是否成功，即响应状态码是否为200(Http状态码中200是成功的意思)，成功才进行下面的解析操作，否则返回
2. 使用 `Unmarshal`对数据进行反序列化，依次打印出数据项即可
整体的代码如下：
```
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"bufio"
	"strings"
)

type DictRequest struct {
	TransType string `json:"trans_type"`
	Source    string `json:"source"`
	UserID    string `json:"user_id"`
}

type DictResponse struct {
	Rc int `json:"rc"`
	Wiki struct {
	} `json:"wiki"`
	Dictionary struct {
		Prons struct {
			EnUs string `json:"en-us"`
			En string `json:"en"`
		} `json:"prons"`
		Explanations []string `json:"explanations"`
		Synonym []string `json:"synonym"`
		Antonym []string `json:"antonym"`
		WqxExample [][]string `json:"wqx_example"`
		Entry string `json:"entry"`
		Type string `json:"type"`
		Related []interface{} `json:"related"`
		Source string `json:"source"`
	} `json:"dictionary"`
}

func query(word string) {
	client := &http.Client{}
	request := DictRequest{TransType: "en2zh", Source: word}
	buf, err := json.Marshal(request)
	if err != nil {
		log.Fatal(err)
	}
	var data = bytes.NewReader(buf)
	req, err := http.NewRequest("POST", "https://api.interpreter.caiyunai.com/v1/dict", data)
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Set("Connection", "keep-alive")
	req.Header.Set("DNT", "1")
	req.Header.Set("os-version", "")
	req.Header.Set("sec-ch-ua-mobile", "?0")
	req.Header.Set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36")
	req.Header.Set("app-name", "xy")
	req.Header.Set("Content-Type", "application/json;charset=UTF-8")
	req.Header.Set("Accept", "application/json, text/plain, */*")
	req.Header.Set("device-id", "")
	req.Header.Set("os-type", "web")
	req.Header.Set("X-Authorization", "token:qgemv4jr1y38jyq6vhvi")
	req.Header.Set("Origin", "https://fanyi.caiyunapp.com")
	req.Header.Set("Sec-Fetch-Site", "cross-site")
	req.Header.Set("Sec-Fetch-Mode", "cors")
	req.Header.Set("Sec-Fetch-Dest", "empty")
	req.Header.Set("Referer", "https://fanyi.caiyunapp.com/")
	req.Header.Set("Accept-Language", "zh-CN,zh;q=0.9")
	req.Header.Set("Cookie", "_ym_uid=16456948721020430059; _ym_d=1645694872")
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()
	bodyText, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	if resp.StatusCode != 200 {
		log.Fatal("bad StatusCode:", resp.StatusCode, "body", string(bodyText))
		return
	}
	var dictResponse DictResponse
	err = json.Unmarshal(bodyText, &dictResponse)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(word, "UK:", dictResponse.Dictionary.Prons.En, "US:", dictResponse.Dictionary.Prons.EnUs)
	for _, item := range dictResponse.Dictionary.Explanations {
		fmt.Println(item)
	}
}

func main() {
	// 输出提示信息
	fmt.Print("请输入一个单词：")
	// 输入一个单词
	reader := bufio.NewReader(os.Stdin)
	word, err := reader.ReadString('\n')
	// 处理错误
	if err!= nil { 
		fmt.Println(err)
		return
	}
	// 去掉单词末尾的换行符
	word = strings.Trim(word, "\n")
	// 调用函数查询单词
	query(word)
}
```
# SOCKS5代理
## SOCKS5简介
SOCKS5代理是一种网络代理协议，它允许客户端通过代理服务器来访问互联网，隐藏用户的真实IP地址，增加隐私性与安全性。它的用途是，如果某些企业的内网为了确保数据的安全性，可能会配置很严格的防火墙策略，但带来的副作用是哪怕你是管理员，访问某些资源也会很麻烦SOCKS5协议相当于在防火墙内部开了个口子，让用户可以通过单个端口访问内部的所有资源
## 原理
![image.png](https://img.linjq.top/202411071635941.png)
**协商阶段：**
1. **客户端**（Client）向**SOCKS5服务器**发起连接请求，并告知服务器支持的认证方法
2. **SOCKS5服务器**回应客户端并选择合适的认证方式，完成协商
3. 在某些情况下，SOCKS5代理可以要求身份认证，特别是需要更高安全性的环境
**发送请求：**
1. 协商完成后，**客户端**发送具体的请求到**SOCKS5服务器**，请求访问目标主机（Host）
2. **SOCKS5服务器**收到请求后，会代表客户端向**目标主机**建立TCP连接
3. 当连接成功建立，**目标主机**会返回响应，告知**SOCKS5服务器**连接状态
4. **SOCKS5服务器**将状态信息反馈给**客户端**，告知客户端连接已建立，可以开始传输数据
**数据传输**：
1. 一旦连接建立，**客户端**可以通过**SOCKS5服务器**将数据发送到**目标主机**
2. **SOCKS5服务器**会接收到客户端的数据，并将其 **“relay”（转发）** 到目标主机
3. **目标主机**处理请求后返回结果，**SOCKS5服务器**将结果返回给**客户端**
4. 此阶段持续进行，直到客户端完成数据传输或断开连接
整个流程中，SOCKS5服务器起到中介作用，帮助客户端与目标主机建立连接并传输数据。这个过程隐藏了客户端的真实IP，增加了访问的匿名性和安全性。
## 简易版服务器
我们先来实现一个**简单版的服务器**，主要实现的功能是：我们发给它什么内容，它就回复给我们什么内容。
首先需要监听一个端口，这里监听本地的1080端口：
```
// 监听本地的 1080 端口
server, err := net.Listen("tcp", "127.0.0.1:1080")
// 如果发生错误，使用 panic 抛出异常
if err!= nil {
    panic(err)
}
```
接着我们需要创建一个循环，不断接收客户端的连接请求：
```
// 无限循环，等待客户端连接
for {
    // 接受客户端连接
    client, err := server.Accept()
    // 如果发生错误，记录错误并继续循环
    if err!= nil {
        log.Printf("Accept failed %v", err)
        continue
    }
    // 为每个客户端连接启动一个新的 goroutine 来处理请求
    go process(client)
}
```
调用`server.Accept()`程序会陷入阻塞，直到收到客户端的请求。收到请求后，使用`go`关键字调用`process`函数为每个客户端连接启动一个新的 goroutine 来处理请求
> goroutine是建立在线程上的轻量级的抽象，它允许我们以非常低的代价在同一个地址空间中并行的执行多个函数或者方法，相比于线程，它的创建和销毁代价小很多，并且它的调度室独立于线程的。在golang中使用go关键字创建一个goroutine。

process函数的内容如下：
```
// process 函数处理传入的网络连接，读取连接中的数据并原样写回
func process(conn net.Conn) {
    // 延迟关闭网络连接，确保在函数结束时释放资源
    defer conn.Close()
    // 创建一个读取器，用于从网络连接中读取数据
    reader := bufio.NewReader(conn)
    // 无限循环，处理网络连接中的数据
    for {
        // 从读取器中读取一个字节的数据
        b, err := reader.ReadByte()
        // 如果读取过程中发生错误，跳出循环
        if err!= nil {
            break
        }
        // 将读取到的字节数据写回到网络连接中
        _, err = conn.Write([]byte{b})
        // 如果写入过程中发生错误，跳出循环
        if err!= nil {
            break
        }
    }
}
```
我们创建了一个读取器:`bufio.NewReader(conn)`，可以从**客户端**的输入中读取数据，然后**阻塞**等待读取数据`reader.ReadByte()`，最后又把数据写入链接，**发回给客户端**。

在本地run以上代码后，新开一个终端窗口，输入命令（注意需要下载[nmap](https://nmap.org/download.html#windows)）建立连接：`ncat 127.0.0.1 1080`:
![image.png](https://img.linjq.top/202411071934002.png)
## 实现SOCKS5代理服务器
### 协商阶段
代理服务器需要认证客户端，只有客户端通过认证，才允许客户端通过代理访问最终服务器。浏览器给代理服务器一个包，**请求报文**的格式如下：

| VER | NMETHODS | METHODS  |
| --- | -------- | -------- |
| 1   | 1        | 1 to 255 |
* VER: 协议版本，socks5为0x05
* NMETHODS: 支持认证的方法数量
* METHODS: 对应NMETHODS，NMETHODS的值为多少，METHODS就有多少个字节。如`00`表示不需要认证，`02`表示用户名/密码认证。
**返回报文**的内容如下：

| VER | METHODS |
| --- | ------- |
| 1   | 1       |
* VER：协议版本，socks5为0x05
* METHOD：从客户端支持的认证方法中选一种。在本例中，我们采取**无需认证**的方法，因此需返回0x00。
我们把**协商阶段**抽象成`auth`函数，首先读第一个字节：协议版本号，如果等于SOCKS5的协议版本号，则继续处理，如果不是，则返回错误信息，直接退出。
```
ver, err := reader.ReadByte()
if err != nil {
    return fmt.Errorf("read ver failed:%w", err)
}
if ver != socks5Ver {
    return fmt.Errorf("not supported ver:%v", ver)
}
```
接着读取第二个字节：NMETHODS，**客户端支持的认证方法的数量**，若读取失败则退出：
```
methodSize, err := reader.ReadByte()
if err != nil {
    return fmt.Errorf("read methodSize failed:%w", err)
}
```
接着读取剩下的字节：METHODS，客户端支持的每一种认证方法
```
method := make([]byte, methodSize)
_, err = io.ReadFull(reader, method)
if err != nil {
    return fmt.Errorf("read method failed:%w", err)
}
log.Println("ver", ver, "method", method)
```
服务器对协商报文解析后，需要在客户端支持的认证方式中选择一种，并返回报文：
```
_, err = conn.Write([]byte{socks5Ver, 0x00})
if err != nil {
    return fmt.Errorf("write failed:%w", err)
}
```
我们可以测试一下，`curl --socks5 127.0.0.1:8080 -v http://www.qq.com`(意思是通过socks5代理与`http://www.qq.com`建立连接)：
![image.png](https://img.linjq.top/202411072043999.png)
可以看到，我们客户端与代理服务器建立连接成功，代理服务器和目的服务器建立连接失败，因为我们还没进行处理。
### 发送请求
协商成功后，客户端向代理服务器发送请求，报文如下：

| VER | CMD | RSV   | ATYP | DST.ADDR | DST.PORT |
| --- | --- | ----- | ---- | -------- | -------- |
| 1   | 1   | X'00' | 1    | Variable | 2        |
* VER 版本号，socks5的值为0x05
* CMD 0x01表示CONNECT请求
* RSV 保留字段，值为0x00
* ATYP 目标地址类型，DST.ADDR的数据对应这个字段的类型。
    * 0x01表示IPv4地址，DST.ADDR为4个字节
    * 0x03表示域名，DST.ADDR是一个可变长度的域名
* DST.ADDR 一个可变长度的值
* DST.PORT 目标端口，固定2个字节
也是一样，读出每个字段的值并校验：
```
buf := make([]byte, 4)
_, err = io.ReadFull(reader, buf)
if err != nil {
    return fmt.Errorf("read header failed:%w", err)
}
ver, cmd, atyp := buf[0], buf[1], buf[3]
if ver != socks5Ver {
    return fmt.Errorf("not supported ver:%v", ver)
}
if cmd != cmdBind {
    return fmt.Errorf("not supported cmd:%v", cmd)
}
addr := ""
switch atyp {
    case atypeIPV4:
        _, err = io.ReadFull(reader, buf)
        if err != nil {
            return fmt.Errorf("read atyp failed:%w", err)
        }
        addr = fmt.Sprintf("%d.%d.%d.%d", buf[0], buf[1], buf[2], buf[3])
    case atypeHOST:
        hostSize, err := reader.ReadByte()
        if err != nil {
            return fmt.Errorf("read hostSize failed:%w", err)
        }
        host := make([]byte, hostSize)
        _, err = io.ReadFull(reader, host)
        if err != nil {
            return fmt.Errorf("read host failed:%w", err)
        }
        addr = string(host)
    case atypeIPV6:
        return errors.New("IPv6: no supported yet")
    default:
        return errors.New("invalid atyp")
}
_, err = io.ReadFull(reader, buf[:2])
if err != nil {
    return fmt.Errorf("read port failed:%w", err)
}
port := binary.BigEndian.Uint16(buf[:2])

log.Println("dial", addr, port)
```
接下来，代理服务器要去和目标服务器**建立TCP连接**：
```
dest, err := net.Dial("tcp", fmt.Sprintf("%v:%v", addr, port))
if err != nil {
    return fmt.Errorf("dial dst failed:%w", err)
}
defer dest.Close()
log.Println("dial", addr, port)
```
建立连接后，返回**确认报文**：
```
// +----+-----+-------+------+----------+----------+
// |VER | REP |  RSV  | ATYP | BND.ADDR | BND.PORT |
// +----+-----+-------+------+----------+----------+
// | 1  |  1  | X'00' |  1   | Variable |    2     |
// +----+-----+-------+------+----------+----------+
// VER socks版本，这里为0x05
// REP Relay field,内容取值如下 X’00’ succeeded
// RSV 保留字段
// ATYPE 地址类型
// BND.ADDR 服务绑定的地址
// BND.PORT 服务绑定的端口DST.PORT
_, err = conn.Write([]byte{0x05, 0x00, 0x00, 0x01, 0, 0, 0, 0, 0, 0})
if err != nil {
    return fmt.Errorf("write failed: %w", err)
}
```
### 数据传输
最后实现双向数据传输：
```
ctx, cancel := context.WithCancel(context.Background())
defer cancel()

go func() {
    _, _ = io.Copy(dest, reader)
    cancel()
}()
go func() {
    _, _ = io.Copy(conn, dest)
    cancel()
}()

<-ctx.Done()
```
再次测试，可以看到代理服务器运行成功：
![image.png](https://img.linjq.top/202411072108280.png)
