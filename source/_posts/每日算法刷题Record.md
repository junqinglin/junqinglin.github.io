---
title: 每日算法刷题Record
auther: ljq
top_img: https://pic.linjq.top/img/top_img.jpg
cover: https://pic.linjq.top/img/default_post_cover.png
categories:
  - 算法
abbrlink: c757a24b
date: 2024-08-27 15:52:35
tags:
  - 每日算法记录
mathjax: "true"
aside:
---
{% note blue modern %}
日常的算法刷题记录，主要是简要写一些思路和实现代码。
{% endnote %}
# 2024.08.27
## 题目一
### 简介
链接：[找出唯一性数组的中位数](https://leetcode.cn/problems/find-the-median-of-the-uniqueness-array/)
难度：{% label 困难 red %}
Tags：{% label 二分 blue %} + {% label 滑动窗口 blue %}
### 思路
首先长度为n的数组的**非空子数组**的个数为$m=\frac{n(n+1)}{2}$，题目要求的是**唯一性数组**中的第$k=\frac{m}{2}$个元素，即为求唯一性数组的**第$k$大**的元素。给定一个值$t(1<=t<=n)$，令$c_{t}$为唯一性数组中小于等于$t$的元素个数。举个例子，假定$nums=[1,2,3]$，则唯一性数组为$[1, 1, 1, 2, 2, 3]$，当$t$为2的时候，$c_{t}=5$。
如果$c_{t}>k$，则说明应该缩小$t$，如果$c_{t}<k$，则说明应该增大$t$。由于$1<=t<=n$，并且$c_{t}$随着$t$的增大而增大，所以可以使用**二分法**，求使$c_{t}=k$的最小的$t$即为题目所求的答案。
那么$c_{t}$如何求呢？可以使用**滑动窗口**。首先可以用一个哈希表记录滑动窗口内元素出现的次数，枚举窗口右端点$r$，把$nums[r]$的次数$+1$，如果哈希表内的元素个数大于$t$，则需要缩小窗口，枚举左端点$l$，把$nums[l]$移除出窗口，即把出现次数$-1$，直到哈希表内的元素个数小于等于$t$为止。当一个窗口满足要求时，其中满足要求的子数组个数为$r-l+1$(右端点为$r$，左端点为$l,l+1,...,r$)。
### 代码
```
class Solution {
    public int medianOfUniquenessArray(int[] nums) {
        //二分
        int n = nums.length;
        int l = 1;
        int r = n;
        long k = ((long)n * (n + 1) / 2 + 1) / 2;
        while(l <= r){
            int mid = (l + r) / 2;
            if(check(nums, mid, k)){ 
                r = mid - 1;
            }else{
                l = mid + 1;
            }
        }
        return l;
    }
    public boolean check(int[] nums, int t, long k){
        int l = 0;
        long cnt = 0; //distinct小于k的子数组个数
        HashMap<Integer, Integer> map = new HashMap<>();
        for(int r = 0; r < nums.length; r++){
            map.merge(nums[r], 1, Integer::sum); //加入哈希表，次数+1
            while(map.size() > t){ //如果distinct大于t，则缩小滑动窗口
                int out = nums[l++];
                if(map.merge(out, -1, Integer::sum) == 0){ //如果次数为0，则从哈希表中删除
                    map.remove(out);
                }
            }
            cnt += r - l + 1; //统计子数组个数
            if(cnt >= k){ 
                return true;
            }
        }
        return false;
    }
}
```

# 2024.08.28
## 题目一
### 简介
链接：[分割字符频率相等的最少子字符串](https://leetcode.cn/problems/minimum-substring-partition-of-equal-character-frequency/)
难度：{% label 中等 orange %}
Tags：{% label 动态规划 blue %}
### 思路
定义$dp[i]$为$s[0]-s[i]$组成的字符串最少能分割成的平衡子字符串个数。那么可以在$0-i$之间枚举$j$，若$s[j]-s[i]$为平衡字符串，那么$dp[i]=min(dp[i], dp[j-1] + 1)$。
如何判断子串是否为平衡字符串呢？暴力的做法是用哈希表统计每个字符出现的次数，看是否相等。这里有一个比较巧妙的方法：记录字母出现次数的最大值$maxCnt$，当$i-j+1=k*maxCnt$的时候，子串就是平衡字符串。
### 代码
```
class Solution {
    public int minimumSubstringsInPartition(String s) {
        char[] strs = s.toCharArray();
        int n = strs.length;
        int[] dp = new int[n + 1];
        Arrays.fill(dp, Integer.MAX_VALUE); //初始化
        dp[0] = 0; //初始化
        for(int i = 1; i <= n; i++){
            int[] cnt = new int[26]; //数组作哈希表，统计出现次数
            int maxCnt = 0; //字符出现最大次数
            int k = 0; //字符种类
            for(int j = i; j > 0; j--){
                int t = strs[j - 1] - 'a';
                k += cnt[t]++ == 0 ? 1 : 0;
                maxCnt = Math.max(maxCnt, cnt[t]);
                if(k * maxCnt == i - j + 1){
                    dp[i] = Math.min(dp[i], dp[j - 1] + 1);
                }
            }
        }
        return dp[n];
    }
}
```


