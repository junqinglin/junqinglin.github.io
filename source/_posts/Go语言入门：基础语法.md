---
title: Go语言入门：基础语法
auther: ljq
top_img: 'https://img.linjq.top/top_img.jpg'
cover: 'https://img.linjq.top/default_post_cover.png'
categories:
  - 后端
tags:
  - Golang
description: Go语言的基础语法介绍
abbrlink: 29d80bdb
date: 2024-11-02 21:07:15
mathjax:
aside:
---
# 什么是Go语言
Go语言，又称为Golang，是一种由Google开发的开源编程语言。它以简洁、高效、并发支持而闻名，特别适合于构建高性能的网络服务和分布式系统。Go语言在语法上类似于C语言，但提供了垃圾回收机制和内存安全特性，简化了内存管理。Go语言还内置了丰富的标准库，支持多种编程范式，包括面向对象、过程式和函数式编程。由于其编译速度快、执行效率高，Go语言被广泛应用于云计算、微服务架构、区块链技术等领域。
# 第一个Go程序
```
package main

import "fmt"

func main() {
   fmt.Println("Hello, World!")
}
```
* 首先第一行代码`package main`定义了包名，指明文件属于哪个包，这和Java类似
* 下面一行`import "fmt"`，导入了`fmt`这个包，这个包实现了格式化 IO（输入/输出）的函数
* 下一行`func main()`是程序开始执行的函数，`main`函数是每一个可执行程序所必须包含的
* `fmt.Println("Hello, World!")`可以将字符串`"Hello, World!"`输出到控制台，并在最后自动增加换行字符 `\n`
需要注意的是函数后面的 `{` 不能单独放在一行，以下代码在运行时会产生错误：
```
package main

import "fmt"

func main() 
{ // 错误
   fmt.Println("Hello, World!")
}
```
# 数据类型
## 布尔型
布尔型可以是`true`或者`false`
## 数字类型
### 整型
* **uint8**：无符号 8 位整型 (0 到 255)
* **uint16**：无符号 16 位整型 (0 到 65535)
* **uint32**：无符号 32 位整型 (0 到 4294967295)
* **uint64**：无符号 64 位整型 (0 到 18446744073709551615)
* **int8**：有符号 8 位整型 (-128 到 127)
* **int16**：有符号 16 位整型 (-32768 到 32767)
* **int32**：有符号 32 位整型 (-2147483648 到 2147483647)
* **int64**：有符号 64 位整型 (-9223372036854775808 到 9223372036854775807)
### 浮点型
* **float32**：IEEE-754 32位浮点型数
* **float64**：IEEE-754 64位浮点型数
* **complex64**：32 位实数和虚数
* **complex128**：64 位实数和虚数
### 其他数字类型
* byte：类似 uint8
* rune：类似 int32
* uint：32 或 64 位
* int：与 uint 一样大小
* uintptr：无符号整型，用于存放一个指针
## 字符串类型
字符串就是一串固定长度的字符连接起来的字符序列，Go 语言的字符串的字节使用 UTF-8 编码标识 Unicode 文本
## 其他派生类型
- (a) 指针类型（Pointer）
- (b) 数组类型
- (c) 结构化类型(struct)
- (d) Channel 类型
- (e) 函数类型
- (f) 切片类型
- (g) 接口类型（interface）
- (h) Map 类型
# 变量
Go语言中的变量声明一般是使用`var`关键字
## 单变量声明
### 方法一
**指定变量类型**，如果没有初始化，则变量为默认值
```
var v_name v_type // 声明变量
v_name = value // 赋值
```
### 方法二
不用指定变量类型，根据值自行判定变量类型
```
var v_name = value
```
### 方法三
使用`:=`声明变量
```
v_name := value
```
例如`intVal := 1`等价于：
```
var intVal int 
intVal =1 
```
## 多变量声明
详细看下面的示例：
```
//类型相同多个变量, 非全局变量
var vname1, vname2, vname3 type
vname1, vname2, vname3 = v1, v2, v3

var vname1, vname2, vname3 = v1, v2, v3 // 和 python 很像,不需要显示声明类型，自动推断

vname1, vname2, vname3 := v1, v2, v3 // 出现在 := 左侧的变量不应该是已经被声明过的，否则会导致编译错误


// 这种因式分解关键字的写法一般用于声明全局变量
var (
    vname1 v_type1
    vname2 v_type2
)

```
# 常量
常量的定义格式：`const identifier [type] = value`
常量还可以用作枚举：
```
const (
    Unknown = 0
    Female = 1
    Male = 2
)
```
## itoa
iota，特殊常量，可以认为是一个可以被编译器修改的常量。
iota 在 const关键字出现时将被重置为 0(const 内部的第一行之前)，const 中每新增一行常量声明将使 iota 计数一次(iota 可理解为 const 语句块中的行索引)。
第一个 iota 等于 0，每当 iota 在新的一行被使用时，它的值都会自动加 1；所以 a=0, b=1, c=2 可以简写为如下形式（b、c没有显式赋值，因此继承上一个常量的值itoa）：
```
const (
    a = iota // 0
    b        // 1
    c        // 2
)
```

# if else语句
Go 语言中`if else`语句的语法如下：
```
if 布尔表达式 {
   /* 在布尔表达式为 true 时执行 */
} else {
  /* 在布尔表达式为 false 时执行 */
}
```
需要注意的是，布尔表达式不需要写括号

# 循环语句
## for循环
for循环有如下几种形式：
1. 一般形式的for循环，这个和其他语言基本一样，格式为：
```
for init; condition; post { }
```
2. while循环，Go语言中没有while循环，可以用for来替代，格式为：
```
for condition { }
```
3. 不写条件，即死循环，格式为：
```
for { }
```
4. for 循环的 range 格式可以对 slice、map、数组、字符串等进行迭代循环
* 如果想读取key 和 value，格式如下：
```
for key, value := range oldMap {
    newMap[key] = value
}
```
* 如果只想读取 key，格式如下：
```
for key := range oldMap
```
* 如果只想读取 value，格式如下：
```
for _, value := range oldMap
```

# switch语句
switch 默认情况下 case 最后**自带 break 语句**，匹配成功后就不会执行其他 case，如果我们需要执行后面的 case，可以使用 **`fallthrough`**
形式一，语法如下：
```
switch var1 {
    case val1:
        ...
    case val2:
        ...
    default:
        ...
}
```
形式二，语法如下：
```
switch {
      case condition :
         ... 
      case condition :
         ...
      case condition :
         ...
      default:
         ...
   }
```
形式三，语法如下：
```
switch x.(type){
    case type:
       statement(s);      
    case type:
       statement(s); 
    default: /* 可选 */
       statement(s);
}
```
# 数组
数组声明需要指定元素类型及元素个数，语法格式如下：
```
var arrayName [size]dataType
```
可以使用初始化列表来初始化数组的元素:
```
var numbers = [5]int{1, 2, 3, 4, 5}
```
另外，还可以使用 `:=` 简短声明语法来声明和初始化数组：
```
numbers := [5]int{1, 2, 3, 4, 5}
```
如果数组**长度不确定**，可以使用 `...` 代替数组的长度，编译器会根据元素个数自行推断数组的长度：
```
var balance = [...]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
或
balance := [...]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
```
如果设置了数组的长度，我们还可以通过指定下标来初始化元素：
```
//  将索引为 1 和 3 的元素初始化
balance := [5]float32{1:2.0,3:7.0}
```
数组元素可以通过索引（位置）来读取，但是**不支持负数索引**。
# 切片
Go 语言切片是对数组的抽象。切片相当于是”**动态数组**“。
你可以声明一个未指定大小的数组来定义切片，不需要说明长度：
```
var identifier []type
```
或使用 **make()** 函数来创建切片：
```
var slice1 []type = make([]type, len)
```
也可以简写为：
```
slice1 := make([]type, len)
```
可以取切片的一部分，从startIndex开始，到endIndex - 1，这个和python类似：
```
s := arr[startIndex:endIndex] 
```
# map
定义map的格式如下：
```
map_variable := make(map[KeyType]ValueType, initialCapacity)
```
其中KeyType 是键的类型，ValueType 是值的类型，initialCapacity 是可选的参数，用于指定 Map 的初始容量
初始化示例：
```
m := map[string]int{
    "apple": 1,
    "banana": 2,
    "orange": 3,
}
```
获取值：
```
v1 := m["apple"]
v2, ok := m["pear"]  // 如果键不存在，ok 的值为 false，v2 的值为该类型的零值
```
修改值或增加键值对：
```
m["apple"] = 5
```
获取长度：
```
len := len(m)
```
遍历：
```
for k, v := range m {
    fmt.Printf("key=%s, value=%d\n", k, v)
}
```
删除元素：
```
delete(m, "banana")
```
# range
range 关键字用于 for 循环中迭代数组(array)、切片(slice)、通道(channel)或集合(map)的元素。在数组和切片中它返回元素的索引和索引对应的值，在集合中返回 key-value 对。
for 循环的 range 格式可以对 slice、map、数组、字符串等进行迭代循环。格式如下：
```
for key, value := range oldMap {
    newMap[key] = value
}
```
如果只想读取 key，格式如下：
```
for key := range oldMap
// 或
for key, _ := range oldMap
```
如果只想读取 value，格式如下：
```
for _, value := range oldMap
```
遍历切片实例：
```
package main

import "fmt"

// 声明一个包含 2 的幂次方的切片
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

func main() {
   // 遍历 pow 切片，i 是索引，v 是值
   for i, v := range pow {
      // 打印 2 的 i 次方等于 v
      fmt.Printf("2**%d = %d\n", i, v)
   }
}
// 2**0 = 1
// 2**1 = 2
// 2**2 = 4
// 2**3 = 8
// 2**4 = 16
// 2**5 = 32
// 2**6 = 64
// 2**7 = 128
```
遍历字符串实例：
```
package main

import "fmt"

func main() {
    for i, c := range "hello" {
        fmt.Printf("index: %d, char: %c\n", i, c)
    }
}

```
# 函数
## 函数定义与调用
Go语言的函数定义格式如下：
```
func function_name( [parameter list] ) [return_types] {
   函数体
}
```
与其他语言不同，Go语言的函数返回类型是**后置**的
函数调用实例：
```
package main

import "fmt"

func main() {
   /* 定义局部变量 */
   var a int = 100
   var b int = 200
   var ret int

   /* 调用函数并返回最大值 */
   ret = max(a, b)

   fmt.Printf( "最大值是 : %d\n", ret )
}

/* 函数返回两个数的最大值 */
func max(num1, num2 int) int {
   /* 定义局部变量 */
   var result int

   if (num1 > num2) {
      result = num1
   } else {
      result = num2
   }
   return result 
}
```
Go语言的函数还可以返回多个值：
```
package main

import "fmt"

func swap(x, y string) (string, string) {
   return y, x
}

func main() {
   a, b := swap("Google", "Runoob")
   fmt.Println(a, b)
}
```
## 函数参数传递
### 值传递
值传递是指在调用函数时将实际参数复制一份传递到函数中，这样在函数中如果对参数进行修改，将不会影响到实际参数。
默认情况下，Go 语言使用的是值传递，即在调用过程中不会影响到实际参数。
实例：
```
package main

import "fmt"

func main() {
   /* 定义局部变量 */
   var a int = 100
   var b int = 200

   fmt.Printf("交换前 a 的值为 : %d\n", a )
   fmt.Printf("交换前 b 的值为 : %d\n", b )

   /* 通过调用函数来交换值 */
   swap(a, b)

   fmt.Printf("交换后 a 的值 : %d\n", a )
   fmt.Printf("交换后 b 的值 : %d\n", b )
}

/* 定义相互交换值的函数 */
func swap(x, y int) int {
   var temp int

   temp = x /* 保存 x 的值 */
   x = y    /* 将 y 值赋给 x */
   y = temp /* 将 temp 值赋给 y*/

   return temp;
}
```
### 引用传递
引用传递是指在调用函数时将实际参数的地址传递到函数中，那么在函数中对参数所进行的修改，将影响到实际参数。
实例：
```
package main

import "fmt"

func main() {
   /* 定义局部变量 */
   var a int = 100
   var b int= 200

   fmt.Printf("交换前，a 的值 : %d\n", a )
   fmt.Printf("交换前，b 的值 : %d\n", b )

   /* 调用 swap() 函数
   * &a 指向 a 指针，a 变量的地址
   * &b 指向 b 指针，b 变量的地址
   */
   swap(&a, &b)

   fmt.Printf("交换后，a 的值 : %d\n", a )
   fmt.Printf("交换后，b 的值 : %d\n", b )
}

func swap(x *int, y *int) {
   var temp int
   temp = *x    /* 保存 x 地址上的值 */
   *x = *y      /* 将 y 值赋给 x */
   *y = temp    /* 将 temp 值赋给 y */
}
```
# 指针
一个指针变量指向了一个值的内存地址。
指针声明格式为：
```
var var_name *var-type
```
示例：
```
var ip *int        /* 指向整型*/
var fp *float32    /* 指向浮点型 */
```
指针使用实例：
```
package main

import "fmt"

func main() {
   var a int= 20   /* 声明实际变量 */
   var ip *int        /* 声明指针变量 */

   ip = &a  /* 指针变量的存储地址 */

   fmt.Printf("a 变量的地址是: %x\n", &a  )

   /* 指针变量的存储地址 */
   fmt.Printf("ip 变量储存的指针地址: %x\n", ip )

   /* 使用指针访问值 */
   fmt.Printf("*ip 变量的值: %d\n", *ip )
}
```
Go语言中空指针为：**nil**
# 结构体
结构体是由一系列具有相同类型或不同类型的数据构成的数据集合
## 结构体定义
结构体定义格式如下：
```
type struct_variable_type struct {
   member definition
   member definition
   ...
   member definition
}
```
定义了结构体之后，就可以用于变量声明，格式如下：
```
variable_name := structure_variable_type {value1, value2...valuen}
// 或
variable_name := structure_variable_type { key1: value1, key2: value2..., keyn: valuen}
```
实例：
```
package main

import "fmt"

type Books struct {
   title string
   author string
   subject string
   book_id int
}


func main() {

    // 创建一个新的结构体
    fmt.Println(Books{"Go 语言", "A", "Go 语言教程", 6495407})

    // 也可以使用 key => value 格式
    fmt.Println(Books{title: "Go 语言", author: "A", subject: "Go 语言教程", book_id: 6495407})

    // 忽略的字段为 0 或 空
   fmt.Println(Books{title: "Go 语言", author: "A"})
}
```
## 访问结构体成员
如果要访问结构体成员，需要使用点号 . 操作符，格式为：
```
结构体.成员名
```
## 结构体指针
定义指向结构体的指针类似于其他指针变量，格式如下：
```
var struct_pointer *Books
```
以上定义的指针变量可以存储结构体变量的地址。查看结构体变量地址，可以将 & 符号放置于结构体变量前：
```
struct_pointer = &Book1
```
使用结构体指针访问结构体成员，使用 "." 操作符：
```
struct_pointer.title
```
## 结构体方法
定义结构体方法的格式如下：
```
func (variable_name variable_data_type) function_name() [return_type]{
   /* 函数体*/
}
```
实例：
```
package main

import (
   "fmt"  
)

/* 定义结构体 */
type Circle struct {
  radius float64
}

func main() {
  var c1 Circle
  c1.radius = 10.00
  fmt.Println("圆的面积 = ", c1.getArea())
}

//该 method 属于 Circle 类型对象中的方法
func (c Circle) getArea() float64 {
  //c.radius 即为 Circle 类型对象中的属性
  return 3.14 * c.radius * c.radius
}
```
# 错误处理
Go 语言通过内置的错误接口提供了非常简单的错误处理机制。
error 类型是一个接口类型，这是它的定义：
```
type error interface {
    Error() string
}
```

我们可以在编码中通过实现 error 接口类型来生成错误信息。
函数通常在最后的返回值中返回错误信息。使用 **`errors.New`** 可返回一个错误信息：
```
package main

import (
	"errors"
	"fmt"
	"math"
)


func Sqrt(f float64) (float64, error) {
    if f < 0 {
        return 0, errors.New("math: square root of negative number")
    }
	return math.Sqrt(f), nil
}

func main() {
	result, err:= Sqrt(-1)

	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(result)
	}
}
```
# 字符串操作
Go语言的字符串很多种方法可以进行不同的字符串操作，以下为一些实例：
```
package main

import (
	"fmt"
	"strings"
)

func main() {
	a := "hello"
	fmt.Println(strings.Contains(a, "ll"))                // true
	fmt.Println(strings.Count(a, "l"))                    // 2
	fmt.Println(strings.HasPrefix(a, "he"))               // true
	fmt.Println(strings.HasSuffix(a, "llo"))              // true
	fmt.Println(strings.Index(a, "ll"))                   // 2
	fmt.Println(strings.Join([]string{"he", "llo"}, "-")) // he-llo
	fmt.Println(strings.Repeat(a, 2))                     // hellohello
	fmt.Println(strings.Replace(a, "e", "E", -1))         // hEllo
	fmt.Println(strings.Split("a-b-c", "-"))              // [a b c]
	fmt.Println(strings.ToLower(a))                       // hello
	fmt.Println(strings.ToUpper(a))                       // HELLO
	fmt.Println(len(a))                                   // 5
	b := "你好"
	fmt.Println(len(b)) // 6
}
```
# 格式化输出
Go 可以使用 fmt.Sprintf 来格式化字符串，格式如下：
```
fmt.Sprintf(格式化样式, 参数列表…)
```
- 格式化样式：字符串形式，格式化符号以 % 开头， %s 字符串格式，%d 十进制的整数格式。
- 参数列表：多个参数以逗号分隔，个数必须与格式化样式中的个数一一对应，否则运行时会报错。
## 字符串格式化符号
| 格式  | 符号                     |
| --- | ---------------------- |
| %v  | 按值的本来值输出               |
| %+v | 在 %v 基础上，对结构体字段名和值进行展开 |
| %#v | 输出 Go 语言语法格式的值         |
| %T  | 输出 Go 语言语法格式的类型和值      |
| %%  | 输出 % 本体                |
| %b  | 整型以二进制方式显示             |
| %o  | 整型以八进制方式显示             |
| %d  | 整型以十进制方式显示             |
| %x  | 整型以十六进制方式显示            |
| %X  | 整型以十六进制、字母大写方式显示       |
| %U  | Unicode 字符             |
| %f  | 浮点数                    |
| %p  | 指针，十六进制方式显示            |

通过在格式化字符串中使用宽度和对齐参数，可以控制生成的字符串的对齐方式。
常用的对齐参数有：
- `%s`：字符串格式，可以使用以下对齐参数：
    - `%s`：默认对齐方式，左对齐。
    - `%10s`：指定宽度为 10 的右对齐。
    - `%-10s`：指定宽度为 10 的左对齐。
- `%d`：整数格式，可以使用以下对齐参数：
    - `%d`：默认对齐方式，右对齐。
    - `%10d`：指定宽度为 10 的右对齐。
    - `%-10d`：指定宽度为 10 的左对齐。
- `%f`：浮点数格式，可以使用以下对齐参数：
    - `%f`：默认对齐方式，右对齐。
    - `%10f`：指定宽度为 10 的右对齐。
    - `%-10f`：指定宽度为 10 的左对齐。
部分实例：
```
package main

import "fmt"

type point struct {
	x, y int
}

func main() {
	s := "hello"
	n := 123
	p := point{1, 2}
	fmt.Println(s, n) // hello 123
	fmt.Println(p)    // {1 2}

	fmt.Printf("s=%v\n", s)  // s=hello
	fmt.Printf("n=%v\n", n)  // n=123
	fmt.Printf("p=%v\n", p)  // p={1 2}
	fmt.Printf("p=%+v\n", p) // p={x:1 y:2}
	fmt.Printf("p=%#v\n", p) // p=main.point{x:1, y:2}

	fmt.Printf("s=%U\n", 41) // s=true

	f := 3.141592653
	fmt.Println(f)          // 3.141592653
	fmt.Printf("%.2f\n", f) // 3.14
}
```

# Json处理
Go具有对JSON编码和解码的内置支持。它还支持自定义数据类型。
**Marshal**函数用于将go数据类型转换为JSON格式。
**Marshal**函数的语法为：
```
func Marshal(v interface{}) ([]byte, error)
```
此外还有一个**MarshalIndent**函数，可以将数据类型转换为为**带缩进**的JSON格式。

JSON的解码是使用**Unmarshal**函数完成的。
**Unmarshal**函数的语法为：
```
func Unmarshal(data []byte, v interface{}) error
```
实例：
```
package main

import (
	"encoding/json"
	"fmt"
)

type userInfo struct {
	Name  string
	Age   int `json:"age"`
	Hobby []string
}

func main() {
	a := userInfo{Name: "wang", Age: 18, Hobby: []string{"Golang", "TypeScript"}}
	buf, err := json.Marshal(a)
	if err != nil {
		panic(err)
	}
	fmt.Println(buf)         // [123 34 78 97...]
	fmt.Println(string(buf)) // {"Name":"wang","age":18,"Hobby":["Golang","TypeScript"]}

	buf, err = json.MarshalIndent(a, "", "\t")
	if err != nil {
		panic(err)
	}
	fmt.Println(string(buf))

	var b userInfo
	err = json.Unmarshal(buf, &b)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%#v\n", b) // main.userInfo{Name:"wang", Age:18, Hobby:[]string{"Golang", "TypeScript"}}
}
```
# 时间处理
我们可以使用**time**包中提供的**Date**方法来构建时间对象。该包包含诸如year()，month()，day()，location()等方法。我们通过使用时间对象来调用这些方法。
实例：
```
package main

import (
	"fmt"
	"time"
)

func main() {
	now := time.Now()
	fmt.Println(now) // 2022-03-27 18:04:59.433297 +0800 CST m=+0.000087933
	t := time.Date(2022, 3, 27, 1, 25, 36, 0, time.UTC)
	t2 := time.Date(2022, 3, 27, 2, 30, 36, 0, time.UTC)
	fmt.Println(t)                                                  // 2022-03-27 01:25:36 +0000 UTC
	fmt.Println(t.Year(), t.Month(), t.Day(), t.Hour(), t.Minute()) // 2022 March 27 1 25
	fmt.Println(t.Format("2006-01-02 15:04:05"))                    // 2022-03-27 01:25:36
	diff := t2.Sub(t)
	fmt.Println(diff)                           // 1h5m0s
	fmt.Println(diff.Minutes(), diff.Seconds()) // 65 3900
	t3, err := time.Parse("2006-01-02 15:04:05", "2022-03-27 01:25:36")
	if err != nil {
		panic(err)
	}
	fmt.Println(t3 == t)    // true
	fmt.Println(now.Unix()) // 1648738080
}
```
# 数字解析
Go语言中的数字解析是指将以**字符串**形式存在的数字转换为**数字**形式，最广泛使用的数字解析包是Go库为我们提供的”**strconv**“包
首先最广泛使用的是 **`Atoi()`** 函数，语法如下：
```
result, error := strconv.Atoi(String)
```
第二种最常见的数字解析是当我们想把一个以字符串形式存在的数字转换为64位数字。为此，我们可以使用 **`strconv`** 本身中的 **`ParseInt()`** 或 **`ParseFloat()`** 函数，语法如下：
```
number, error := strconv.ParseInt(string, base, bitSize)
number, error := strconv.ParseFloat(string, bitSize)
```
其中`base`指定进制（2到36），如果`base`为0，则会从字符串前置判断，"0x"是16进制，"0"是8进制，否则是10进制
# os包
Go语言的`os`包提供了操作系统函数的不依赖平台的接口。`os`包提供了丰富的方法和函数，用于处理文件、目录、进程、环境变量等操作系统相关的功能，常用方法有：
- 文件和目录操作：Create、Open、Mkdir、Remove等。
- 环境变量操作：Getenv、Setenv、Environ等。
- 进程控制：Exit、Getpid、StartProcess等。
- 执行系统命令：Exec、Command等。
- 文件路径操作：Join、Split、Base等。
实例：
```
package main

import (
	"fmt"
	"os"
	"os/exec"
)

func main() {
	fmt.Println(os.Args)           // [/var/folders/8p/n34xxfnx38dg8bv_x8l62t_m0000gn/T/go-build3406981276/b001/exe/main a b c d]
	fmt.Println(os.Getenv("PATH")) // /usr/local/go/bin...
	fmt.Println(os.Setenv("AA", "BB"))

	buf, err := exec.Command("grep", "127.0.0.1", "/etc/hosts").CombinedOutput()
	if err != nil {
		panic(err)
	}
	fmt.Println(string(buf)) // 127.0.0.1       localhost
}
```