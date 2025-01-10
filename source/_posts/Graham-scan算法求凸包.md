---
title: Graham-scan算法求凸包
auther: ljq
top_img: 'https://img.linjq.top/top_img.jpg'
cover: 'https://img.linjq.top/default_post_cover.png'
categories:
  - 算法
tags:
  - 计算几何
  - 凸包
mathjax: 'true'
description: 介绍凸包，以及使用Graham-scan算法求凸包的过程
abbrlink: 6e13163f
date: 2024-10-16 15:43:36
aside:
---
# 凸包是什么
凸包的概念为：在平面上能包含所有给定点的**最小凸多边形**叫做凸包。看概念很抽象，打个比方，假如在一块木板上钉若干钉子，我们拿一个橡皮筋套上去，把所有的钉子都包围在里面，那么这个橡皮筋所形成的多边形便是凸包。
![image.png](https://img.linjq.top/202410161551037.png)

# Graham-scan算法
## 原理
求解凸包一般可以用Andrew算法或Graham-scan算法，这里介绍Graham-scan的算法流程：
1. 首先找到一定在凸包上的一个点，一般来说，我们会找在最左下角的点，即纵坐标最小的点，若纵坐标相同，则找横坐标更小的点（可以证明这个点一定在凸包上：假设这个点不在凸包上，那么肯定有纵坐标比它小的点在凸包上，但是没有纵坐标比这个点更小的点，因此它肯定在凸包上）。下图中最小的点为B
 ![image.png](https://img.linjq.top/202410161558067.png)
3. 以上面找到的点为原点，对其他点进行极角排序，排序后顺序应该是：B,C,E,D,F,A
4. 新建一个栈存储凸包，首先把前两个点先入栈，这里先把B和C入栈，第三个点作为当前点
5. 取出栈顶的两个点，将**栈顶两个点组成的向量**和**栈顶点与当前点组成的向量**进行叉乘（这里首先是$\vec{BC}$和$\vec{CD}$），判断当前点的拐向，若叉乘大于0，则当前点是向左拐，否则是向右拐。
![image.png](https://img.linjq.top/202410161606730.png)
6. 如果叉乘小于0，则把栈顶点出栈，重复执行第5步，直到叉乘大于0或者栈中的点数量小于2就把当前点压入栈

例子：
* 这里首先判断点E相对BC的拐向，由于点E在左边，直接进栈，这时栈中的元素为$[B, C, E]$
![image.png](https://img.linjq.top/202410161606730.png)
* 接着判断点D相对于CE的拐向，在左边，也是直接进栈，这时栈中的元素为$[B, C, E, D]$
![image.png](https://img.linjq.top/202410161614386.png)
* 接着判断点F相对于ED的拐向，在右边，把栈顶元素出栈，这时栈中的元素为$[B, C, E]$
* 继续判断点F相对于CE的拐向，在左边，直接进栈，这时栈中的元素为$[B, C, E, F]$
![image.png](https://img.linjq.top/202410161616495.png)
* 继续判断点A相对于EF的拐向，在左边，直接进栈，这时栈中的元素为$[B, C, E, F, A]$
* 至此，所有点都遍历完了，栈中所有的点就是凸包上的点
![image.png](https://img.linjq.top/202410161618009.png)
## 代码
JS的代码：
```
// 凸包计算，使用Graham-scan算法
convexHullCal() {
	// 先保存一份索引，待会对索引排序即可
	let pointsIndex = Array.from({length: this.pointsData.length}, (_, i) => i)
	// 首先找到最左下角的点
	let leftMost = pointsIndex[0];
	for (var i = 1; i < this.pointsData.length; i++) {
		let p1 = this.pointsData[i];
		let p2 = this.pointsData[leftMost];
		if (p1.y < p2.y || (p1.y == p2.y && p1.x < p2.x)) {
			leftMost = i;
		}
	}
	// 将最左下角的点放到第一位
	[pointsIndex[0], pointsIndex[leftMost]] = [pointsIndex[leftMost], pointsIndex[0]];
	// 然后按照极角排序，极角相同的时候按照距离排序
	let temp = pointsIndex.slice(1); // 除了左下角的点，其他都参与极角排序
	temp.sort((a, b) => {
		let p1 = this.pointsData[a];
		let p2 = this.pointsData[b];
		let t = Math.atan2(p1.y - this.pointsData[pointsIndex[0]].y, p1.x - this.pointsData[pointsIndex[0]].x) - Math.atan2(p2.y - this.pointsData[pointsIndex[0]].y, p2.x - this.pointsData[pointsIndex[0]].x);
		if (t == 0) {
			return Utils.dis(this.pointsData[pointsIndex[0]], p1) - Utils.dis(this.pointsData[pointsIndex[0]], p2);
		}
		return t;
	})
	// 将左下角的点放回第一位
	pointsIndex = [pointsIndex[0], ...temp]; 
	// 进行排序，按照极角排序
	// pointsIndex.sort((a, b) => {
	//     let p1 = this.pointsData[a];
	//     let p2 = this.pointsData[b];
	//     // 使用叉乘来进行极角对比，以左下角为原点
	//     let t = Utils.crossProduct(this.pointsData[leftMost], p2, this.pointsData[leftMost], p1);
	//     if (t == 0) {
	//         return Utils.dis(this.pointsData[leftMost], p1) - Utils.dis(this.pointsData[leftMost], p2);
	//     }
	//     return t;
	// })

	// 先把前面两个点入栈
	let stack = [pointsIndex[0], pointsIndex[1]];
	let top = 1; // 栈顶指针
	for (var i = 2; i < pointsIndex.length; i++) {
		let p = this.pointsData[pointsIndex[i]];
		// 不满足左转关系，出栈
		while (top >= 1 && Utils.crossProduct(this.pointsData[stack[top - 1]], this.pointsData[stack[top]], this.pointsData[stack[top]], p) <= 0) {
			top--;
		}
		// 把当前点入栈
		stack[++top] = pointsIndex[i];
	}
	// 将栈中的点保存为凸包
	this.convexHull = stack.slice(0, top + 1); 
}
```
Java的代码，对应题目[圈奶牛Fencing the Cows](https://www.luogu.com.cn/problem/P2742)：
```
package com.ljq.onecoupon;

import java.text.DecimalFormat;
import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        Point[] points = new Point[n];
        for (int i = 0; i < n; i++) {
            double x = scanner.nextDouble();
            double y = scanner.nextDouble();
            points[i] = new Point(x, y);
        }

        // 找到最左下角的点
        int k = 0;
        for (int i = 1; i < points.length; i++) {
            if(points[i].y < points[k].y || (points[i].y == points[k].y && points[i].x < points[k].x)) {
                k = i;
            }
        }

        // 交换
        Point tp = points[0];
        points[0] = points[k];
        points[k] = tp;

        // 极角排序
        Arrays.sort(points, 1, points.length, (p1, p2) -> {
            double t = cha(points[0], p2, points[0], p1);
            if (t == 0) {
                t = dis(points[0], p1) - dis(points[0], p2);
            }
            if (t == 0) return 0;
            return t > 0 ? 1 : -1;
        });

        int[] s = new int[n];
        s[0] = 0;
        s[1] = 1;
        int top = 1;
        for (int i = 2; i < n; i++) {
            while(top >= 1 && cha(points[s[top-1]], points[s[top]], points[s[top]], points[i]) <= 0) {
                top--;
            }
            s[++top] = i;
        }
        double res = 0;
        for (int i = 1; i <= top; i++) {
            res += dis(points[s[i-1]], points[s[i]]);
        }
        res += dis(points[s[top]], points[s[0]]);
        DecimalFormat df = new DecimalFormat("#.00");
        System.out.printf(df.format(res));
    }

    public static double cha(Point p11, Point p12, Point p21, Point p22) {
        return (p12.x - p11.x) * (p22.y - p21.y) - (p22.x - p21.x) * (p12.y - p11.y);
    }

    public static double dis(Point p1, Point p2) {
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    }

}
class Point{
    double x;
    double y;
    public Point(double x, double y) {
        this.x = x;
        this.y = y;
    }
}

```





