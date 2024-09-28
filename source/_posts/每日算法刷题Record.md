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
description: 日常的算法刷题记录，主要是简要写一些思路和实现代码。
---
{% note blue modern %}
日常的算法刷题记录，主要是简要写一些思路和实现代码。✅❎
{% endnote %}
# 2024.09.09
## 题目一
### 简介
链接：[合并零之间的节点](https://leetcode.cn/problems/merge-nodes-in-between-zeros/)
难度：{% label 中等 orange %}
Tags：{% label 模拟 blue %}或者{% label 快慢指针 blue %}
是否做出：{% label YES green %}
### 思路
#### 模拟
直接新建一个链表，从左到右遍历即可。
#### 快慢指针
在原地修改，一个指针cur正常遍历链表，一个指针tail指向新链表的末尾
* cur.val == 0时，更新tail为tail.next，并且使tail.val=0
* cur.val != 0时，把cur.val累加到tail.val中去
### 代码
```
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
 //模拟
class Solution {
    public ListNode mergeNodes(ListNode head) {
        ListNode res = new ListNode(0);
        ListNode p = head.next;
        int temp = 0;
        ListNode pre = res;
        while(p != null){
            if(p.val == 0){
                ListNode tp = new ListNode(temp);
                temp = 0;
                pre.next = tp;
                pre = tp;
            }else {
                temp += p.val;
            }
            p = p.next;
        }
        return res.next;
    }
}

//快慢指针
class Solution {
    public ListNode mergeNodes(ListNode head) {
        ListNode tail = head;
        ListNode cur = head.next;
        while(cur.next != null){
            if (cur.val != 0) {
                tail.val += cur.val;
            } else {
                tail = tail.next;
                tail.val = 0;
            }
            cur = cur.next;
        }
        tail.next = null;
        return head;
    }
}
```
# 2024.09.08
## 题目一
### 简介
链接：[有序数组的平方](https://leetcode.cn/problems/squares-of-a-sorted-array/)
难度：{% label 简单 green %}
Tags：{% label 双指针 blue %}
是否做出：{% label YES green %}
### 思路
由于数组是非递减的，因此可以用两个指针，左指针l指向数组头，右指针r指向数组尾，对比$abs(nums[l])$和$abs(nums[r])$，大的放入答案数组的末尾。
### 代码
```
class Solution {
    public int[] sortedSquares(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        int l = 0, r = n - 1;
        int i = n - 1;
        while(l <= r){
            if(Math.abs(nums[l]) > Math.abs(nums[r])){
                res[i--] = nums[l] * nums[l];
                l++;
            }else {
                res[i--] = nums[r] * nums[r];
                r--;
            }
        }
        return res;
    }
}
```
## 题目二
### 简介
链接：[最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/)
难度：{% label 中等 orange %}
Tags：{% label 动态规划 blue %}
是否做出：{% label NO red %}
### 思路
$dp[i]$表示i之前包括i的以$nums[i]$结尾的最长递增子序列的长度，因此状态转移方程为：
$$if (nums[i] > nums[j]) dp[i] = max(dp[i], dp[j] + 1);$$
其中$j∈[0, i-1]$。
### 代码
```
class Solution {
    public int lengthOfLIS(int[] nums) {
        int n = nums.length;
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        int res = dp[0];
        for(int i = 1; i < n; i++){
            for(int j = 0; j < i; j++){
                if(nums[i] > nums[j]) dp[i] = Math.max(dp[i], dp[j] + 1);
            }
            if(dp[i] > res) res = dp[i];
        }
        return res;
    }
}
```
# 2024.09.07
## 题目一
### 简介
链接：[买卖股票的最佳时机含手续费](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)
难度：{% label 中等 orange %}
Tags：{% label 动态规划 blue %} 或 {% label 贪心 blue %}
### 思路
这里用动态规划来解决，$dp[i][0]$表示第i天持有股票的最大利润，$dp[i][1]$表示第i天不持有股票的最大利润。则：$$dp[i][0] = max(dp[i - 1][0], dp[i - 1][1] - prices[i])$$
$$dp[i][1] = max(dp[i - 1][1], dp[i - 1][0] + prices[i] - fee)$$
### 代码
```
class Solution {
    public int maxProfit(int[] prices, int fee) {
        //dp[i][0]表示第i天持有股票的最大利润
        //dp[i][1]表示第i天不持有股票的最大利润
        int len = prices.length;
        int[][] dp = new int[len][3];
        dp[0][0] = -prices[0];
        dp[0][1] = 0;
        for(int i = 1; i < len; i++){
            dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i]);
            dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i] - fee);
        }
        return dp[len - 1][1];
    }
}
```
# 2024.09.05
## 题目一
### 简介
链接：[清除数字](https://leetcode.cn/problems/clear-digits/)
难度：{% label 简单 green %}
Tags：{% label 栈 blue %}
### 思路
可以使用栈来解决，从左到右遍历字符串，如果是字母，则进栈，如果是数字且栈不为空，则出栈。最后返回栈自底向上的所有字符组成的字符串即为结果。
### 代码
```
class Solution {
    public String clearDigits(String s) {
        Deque<Character> stack = new LinkedList<>();
        for(char c : s.toCharArray()){
            if(c >= 'a' && c <= 'z'){
                stack.push(c);
            }else if(!stack.isEmpty()){
                stack.pop();
            }
        }
        String res = "";
        while(!stack.isEmpty()){
            res = stack.pop() + res;
        }
        return res;
    }
}

//版本2，更简洁方便
class Solution {
    public String clearDigits(String s) {
        StringBuilder res = new StringBuilder();
        for (char c : s.toCharArray()){
            if (Character.isDigit(c)) {
                res.deleteCharAt(res.length() - 1);
            } else {
                res.append(c);
            }
        }
        return res.toString();
    }
}
```
# 2024.09.03
## 题目一
### 简介
链接：[一个小组的最大实力值](https://leetcode.cn/problems/maximum-strength-of-a-group/)
难度：{% label 中等 orange %}
Tags：{% label 分类讨论 blue %}或{% label 动态规划 blue %}
### 思路
#### 分类讨论
这道题实际上是求所有元素都为整数的数组的子序列的最大积，从最大积的正负性入手。
* 当数组仅有 1 个元素且为负数时，最大积为负数。
* 当数组不包含正数，且负数元素小于等于 1 个时，最大积为 0。
* 其他情况下，最大积为正数。那么如何求这个最大积呢？可以将所有非 0 元素求积，如果乘积为正数，则为最大积。如果乘积为负数，则说明乘积中包含奇数个负数，此时将这个乘积除以最大负数则为最大积。
---力扣官方题解
#### 动态规划
[灵茶山艾府](https://leetcode.cn/problems/maximum-strength-of-a-group/solutions/2897806/on-yi-ci-bian-li-jian-ji-xie-fa-pythonja-xni2/)（这个有点难想）
### 代码
```
//分类讨论
class Solution {
    public long maxStrength(int[] nums) {
        int negCnt = 0;
        int zeroCnt = 0;
        int positiveCnt = 0;
        long res = 1;
        int maxNeg = -9;
        for(int num : nums){
            if(num < 0){
                negCnt++;
                res *= num;
                maxNeg = Math.max(maxNeg, num);
            }else if(num == 0){
                zeroCnt++;
            }else {
                res *= num;
                positiveCnt++;
            }
        }
        if(negCnt == 1 && zeroCnt == 0 && positiveCnt == 0){
            return nums[0];
        }
        if(negCnt <= 1 && positiveCnt == 0){
            return 0;
        }
        if(res < 0){
            return res / maxNeg;
        }else {
            return res;
        }
    }
}

//动态规划
class Solution {
    public long maxStrength(int[] nums) {
        long mn = nums[0];
        long mx = mn;
        for (int i = 1; i < nums.length; i++) {
            long x = nums[i];
            long tmp = mn;
            mn = Math.min(Math.min(mn, x), Math.min(mn * x, mx * x));
            mx = Math.max(Math.max(mx, x), Math.max(tmp * x, mx * x));
        }
        return mx;
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






