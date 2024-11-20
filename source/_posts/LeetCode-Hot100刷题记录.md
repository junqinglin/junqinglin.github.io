---
title: LeetCode-Hot100刷题记录
auther: ljq
top_img: 'https://pic.linjq.top/img/top_img.jpg'
cover: 'https://pic.linjq.top/img/default_post_cover.png'
categories:
  - 算法
tags:
  - 每日算法记录
mathjax: 'true'
abbrlink: c0f57039
date: 2024-10-16 11:05:28
aside:
description:
---
# 写在前面
{% note blue modern %}
日常的算法刷题记录之LeetCode-Hot100篇，主要是简要写一些思路和实现代码。
{% endnote %}
# 模板
```
## [题目标题]
### 简介
* 难度: {% label 简单 green %}、{% label 中等 orange %}、{% label 困难 red %}
* 其他Tags: {% label xx blue %}或无
* 刷题日期: 
* 是否做出: ✅ or ❎

### 思路
### 代码
```
# 哈希
## [两数之和](https://leetcode.cn/problems/two-sum/)
### 简介
* 难度: {% label 简单 green %}
* 其他Tags: 无
* 刷题日期: 
* 是否做出: ✅ or ❎

### 思路
题目所求的是和为target的两个数，可以通过哈希表把nums存起来，遍历nums的同时，查询哈希表中是否有$target - num[i]$出现，若有，可以直接返回。
### 代码
```
class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for(int i = 0; i < nums.length; i++) {
            if(map.containsKey(target - nums[i])) {
                return new int[]{i, map.get(target - nums[i])};
            }
            map.put(nums[i], i);
        }
        return new int[]{0, 0};
    }
}
```

## [字母异位词分组](https://leetcode.cn/problems/group-anagrams/)
### 简介
* 难度: {% label 中等 orange %}
* 其他Tags: 无
* 刷题日期: 2024.10.16
* 是否做出: ✅

### 思路
字母异位的字符串排序后一定是相同的，因此可以将排序后的字符串作为键，异位字符串的集合作为值存在哈希表中，最后统一归类即可。
### 代码
```
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String str : strs) {
            char[] c = str.toCharArray();
            Arrays.sort(c); 
            String ts = new String(c);
            if (map.containsKey(ts)) {
                map.get(ts).add(str);
            } else {
                List<String> list = new ArrayList<>();
                list.add(str);
                map.put(ts, list);
            }
        }
        List<List<String>> res = new ArrayList<>();
        for (List list : map.values()) {
            res.add(list);
        }
        return res;
    }
}
```
## [最长连续序列](https://leetcode.cn/problems/longest-consecutive-sequence/)
### 简介
* 难度: {% label 中等 orange %}
* 其他Tags: 无
* 刷题日期: 2024.10.20
* 是否做出: ❎

### 思路
题目要求最长的连续序列，那么我可以枚举每个数num，看num+1是否存在，由于要求最长的，因此肯定是从最小的数开始枚举才能有最优解。那么如何从最小的数开始枚举呢？我们可以在枚举这个数的时候，看num-1是否存在，如果存在，那么当前的数就不是最小的，直接跳过，否则从当前数开始枚举。
我们可以把num存在Set中，既可以去重，又方便判定它是否存在。
### 代码
```
class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> num_set = new HashSet<Integer>();
        for (int num : nums) {
            num_set.add(num);
        }

        int longestStreak = 0;

        for (int num : num_set) {
            if (!num_set.contains(num - 1)) {
                int currentNum = num;
                int currentStreak = 1;

                while (num_set.contains(currentNum + 1)) {
                    currentNum += 1;
                    currentStreak += 1;
                }

                longestStreak = Math.max(longestStreak, currentStreak);
            }
        }

        return longestStreak;
    }
}
```

# 双指针
## [移动零](https://leetcode.cn/problems/move-zeroes/)
### 简介
* 难度: {% label 简单 green %}
* 其他Tags: 无
* 刷题日期: 2024.10.19
* 是否做出: ✅

### 思路
左右指针初始都指向0，每次移动右指针，使其指向不为0的数，然后将左右指针的数交换，，这样就可以做到不为0的数的顺序不会发生变化，0也会被移到后面。
### 代码
```
class Solution {
    public void moveZeroes(int[] nums) {
        int l = 0, r = 0;
        while (r < nums.length) {
            if (nums[r] != 0) {
                int t = nums[r];
                nums[r] = nums[l];
                nums[l] = t;
                l++;
            }
            r++;
        }
    }
}
```
## [盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/)
### 简介
* 难度: {% label 中等 orange %}
* 其他Tags: 无
* 刷题日期: 2024.10.20
* 是否做出: ❎

### 思路
初始化左右指针，一个指向数组起始，一个指向数组末尾。每一次移动height较小的那个指针，因为较小的那个指针不可能作为容器的边界了。过程中记录最大的容积即可。
### 代码
```
class Solution {
    public int maxArea(int[] height) {
        int l = 0;
        int r = height.length - 1;
        int res = 0;
        while (l < r) {
            res = Math.max(res, Math.min(height[l], height[r]) * (r - l));
            if (height[l] < height[r]) {
                l++;
            } else {
                r--;
            }
        }
        return res;
    }
} 
```

## [三数之和](https://leetcode.cn/problems/3sum/)
* 难度: {% label 中等 orange %}
* 其他Tags: 无
* 刷题日期: 2024.10.21
* 是否做出: ❎

### 思路
首先对数组进行排序，维护三个指针i，j，k，枚举i，令j=i+1，k=n-1
* 若 x + nums[j] + nums[k] > 0，k--
* 若x + nums[j] + nums[k] < 0，j++
* 否则找到了一个三元组，记录
这里可以有两个优化：
* 当$nums[i] + nums[i + 1] + nums[i + 2] > 0$，则后面无论怎么枚举，都不会有等于0的三元组出现，直接退出
* 当$nums[i] + nums[n - 1] + nums[n - 2] < 0$，则nums[i]一定不在三元组中，跳过nums[i]
此外，还需要去重
### 代码
```
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < n - 2; i++) {
            int x = nums[i];
            if (i > 0 && x == nums[i - 1]) continue;
            int j = i + 1;
            int k = n - 1;
            if (x + nums[i + 1] + nums[i + 2] > 0) break;
            if (x + nums[n - 1] + nums[n - 2] < 0) continue;

            while (j < k) {
                if (j < k && x + nums[j] + nums[k] > 0) k--;
                else if (j < k && x + nums[j] + nums[k] < 0) j++;
                else {
                    res.add(List.of(x, nums[j], nums[k]));
                    j++;
                    k--;
                    while (j < k && nums[j] == nums[j - 1]) j++;
                    while (j < k && nums[k] == nums[k + 1]) k--;

                } 
            }
        }
        return res;
    }
}
```
## [接雨水](https://leetcode.cn/problems/trapping-rain-water/)
### 简介
* 难度: {% label 困难 red %}
* 其他Tags: {% label 单调栈 blue %}
* 刷题日期: 2024.10.22
* 是否做出: ❎

### 思路
可以看[代码随想录](https://programmercarl.com/0042.%E6%8E%A5%E9%9B%A8%E6%B0%B4.html#%E7%AE%97%E6%B3%95%E5%85%AC%E5%BC%80%E8%AF%BE)题解，有双指针和单调栈做法
### 代码
```
// 双指针
class Solution {
    public int trap(int[] height) {
        int n =  height.length;
        int[] pre = new int[n]; // i前最大高度
        int[] suf = new int[n]; // i后最大高度
        pre[0] = height[0];
        suf[n - 1] = height[n - 1];
        for(int i = 1; i < n; i++) pre[i] = Math.max(pre[i - 1], height[i]);
        for(int i = n - 2; i >= 0; i--) suf[i] = Math.max(suf[i + 1], height[i]);

        int ans = 0; 
        for(int i = 0; i < n; i++){
            ans += Math.min(pre[i], suf[i]) - height[i];
        }
        return ans;


    }
}
```
# 滑动窗口
## [无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)
### 简介
* 难度: {% label 中等 orange %}
* 其他Tags: 无
* 刷题日期: 2024.10.23
* 是否做出: ❎

### 思路
假设第i~j个字符是不重复的，刚好第j+1个字符和前面i~j的字符串中有重复的，假设第j+1个字符和第k（i<=k<=j）个字符重复，那么我们下一次查找如果从i+1查找，查找到的长度肯定是小于j-i+1的，因此我们可以从j+1开始查找，而左指针从指向i转变为指向k+1。用滑动窗口可以解决。

### 代码
```
class Solution {
    public int lengthOfLongestSubstring(String S) {
        char[] s = S.toCharArray(); // 转换成 char[] 加快效率（忽略带来的空间消耗）
        int n = s.length, ans = 0, left = 0;
        boolean[] has = new boolean[128]; // 也可以用 HashSet<Character>，这里为了效率用的数组
        for (int right = 0; right < n; right++) {
            char c = s[right];
            // 如果窗口内已经包含 c，那么再加入一个 c 会导致窗口内有重复元素
            // 所以要在加入 c 之前，先移出窗口内的 c
            while (has[c]) { // 窗口内有 c
                has[s[left++]] = false; // 缩小窗口
            }
            has[c] = true; // 加入 c
            ans = Math.max(ans, right - left + 1); // 更新窗口长度最大值
        }
        return ans;
    }
}
```
## [找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/)
### 简介
* 难度: {% label 中等 orange %}
* 其他Tags: 无
* 刷题日期: 2024.10.24
* 是否做出: ❎

### 思路
由于字符串s中p的异位词的长度一定等于p的长度，因此可以构造一个滑动窗口，在窗口中维护每种字母的数量。思路比较简单，但是实现起来的细节有点难度，详细可以看代码解释。
除了以下代码的方法外，还可以用两个数组来分别记录窗口中字符的出现次数，比较两个数组是否相同（`Arrays.equals()`）。
### 代码
```
class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        int[] count = new int[26]; //记录窗口内字母的出现次数，在s中出现+1，在p中出现-1
        int lenS = s.length();
        int lenP = p.length();
        List<Integer> res = new ArrayList<>();
        if (lenS < lenP) return res;
        // 初始化窗口
        for (int i = 0; i < lenP; i++) {
            count[s.charAt(i) - 'a']++;
            count[p.charAt(i) - 'a']--;
        }
        // 计算字母差异
        int diff = 0;
        for (int i = 0; i < 26; i++) {
            if (count[i] != 0) {
                diff++;
            }
        }

        if (diff == 0) res.add(0);

        for (int i = 0; i < lenS - lenP; i++) {
            //******判断把i移出窗口是否会改变diff******
            // 如果count[s.charAt(i) - 'a'] == 1，则代表移出当前字符i后，count[s.charAt(i) - 'a'] == 0，字母差异将会少一个
            if (count[s.charAt(i) - 'a'] == 1) {
                diff--;
            } else if (count[s.charAt(i) - 'a'] == 0) {
                // 如果count[s.charAt(i) - 'a'] == 0，则代表移出当前字符i后，count[s.charAt(i) - 'a'] == -1，字母差异将会多一个
                diff++;
            }

            // 移出了，都要减掉
            count[s.charAt(i) - 'a']--;

            //******判断把i+lenP移入窗口是否会改变diff******
            // 如果count[s.charAt(i + lenP) - 'a'] == -1，则代表移入当前字符i+lenP后，count[s.charAt(i+lenP) - 'a'] == 0，字母差异将会少一个
            if (count[s.charAt(i + lenP) - 'a'] == -1) {
                diff--;
            } else if (count[s.charAt(i + lenP) - 'a'] == 0) {
                // 如果count[s.charAt(i + lenP) - 'a'] == 0，则代表移入当前字符i+lenP后，count[s.charAt(i+lenP) - 'a'] == 1，字母差异将会少一个
                diff++;
            }
            // 移入了，都要增加
            count[s.charAt(i + lenP) - 'a']++;

            // 没有字母差异，找到了异位词
            if (diff == 0) {
                res.add(i + 1);
            }

        }
        return res;
    }
}
```
# 子串
## [和为 K 的子数组](https://leetcode.cn/problems/subarray-sum-equals-k/)
### 简介
* 难度: {% label 中等 orange %}
* 其他Tags: {% label 前缀和 blue %}、{% label 哈希表 blue %}
* 刷题日期: 2024.10.25
* 是否做出: ❎

### 思路
前缀和+哈希表，没想出来，看灵神题解吧：[560. 和为 K 的子数组 - 力扣（LeetCode）](https://leetcode.cn/problems/subarray-sum-equals-k/solutions/2781031/qian-zhui-he-ha-xi-biao-cong-liang-ci-bi-4mwr/?envType=study-plan-v2&envId=top-100-liked)
### 代码
```
class Solution {
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> cnt = new HashMap<>(nums.length + 1);
        cnt.put(0, 1);
        int s = 0;
        int res = 0;
        for (int num : nums) {
            s += num;
            res += cnt.getOrDefault(s - k, 0);
            cnt.merge(s, 1, Integer::sum);
        }
        return res;
    }
}
```
## [滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum/)
### 简介
* 难度: {% label 困难 red %}
* 其他Tags: {% label 单调队列 blue %}
* 刷题日期: 2024.10.26
* 是否做出: ❎

### 思路
假设当前滑动窗口中有两个下标i和j(i < j)，且$nums[i]$ < $nums[j]$，那么当滑动窗口右移的时候，只要i还在窗口中，那么j也一定在窗口中，$nums[i]$一定不会是最大值。因此我们可以用单调队列来存储滑动窗口里面值的下标（下标从小到大，值从大到小），如果当前要加入窗口的值比单调队列尾的值要大，那么单调队列中比当前值小的都不可能作为窗口的最大值了，因此可以移除出去。另外，如果当前的单调队列维护的最大值不在窗口中，则把它移出单调队列。
### 代码
```
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] q = new int[n]; // 数组代替双端队列，存索引
        int[] res = new int[n - k + 1];
        int cur = 0; 
        int head = 0;
        int tail = 0; 
        
        for (int i = 0; i < k; i++) {
            while (head < tail && nums[q[tail - 1]] <= nums[i]) {
                tail--;
            }
            q[tail++] = i;
        }
        res[cur++] = nums[q[head]];

        for (int i = k; i < n; i++) {
            // nums[i]加入窗口
            while (head < tail && nums[q[tail - 1]] <= nums[i]) {
                tail--;
            }
            q[tail++] = i;
            // nums[i - k]移出窗口
            while (q[head] <= i - k) {
                head++;
            }
            res[cur++] = nums[q[head]];
        }
        return res;
    }
}
```
## [最小覆盖子串](https://leetcode.cn/problems/minimum-window-substring/)
### 简介
* 难度: {% label 困难 red %}
* 其他Tags: {% label 滑动窗口 blue %}
* 刷题日期: 2024.10.28
* 是否做出: ❎

### 思路
看灵神的题解：[76. 最小覆盖子串 - 力扣（LeetCode）](https://leetcode.cn/problems/minimum-window-substring/solutions/2713911/liang-chong-fang-fa-cong-o52mn-dao-omnfu-3ezz/?envType=study-plan-v2&envId=top-100-liked)
### 代码
```
class Solution {
    public String minWindow(String s, String t) {
        if (s.length() < t.length()) return "";

        int n = s.length();
        int m = t.length();
        int ansL = -1, ansR = n;
        int[] cntS = new int[128];
        int[] cntT = new int[128];
        for (int i = 0; i < m; i++) {
            cntT[t.charAt(i)]++;
            cntS[s.charAt(i)]++;
        }
        if (isCover(cntS, cntT)) {
            ansL = 0;
            ansR = m - 1;
        }

        for (int l = 0, r = m; r < n; r++) {
            cntS[s.charAt(r)]++;
            while (isCover(cntS, cntT)) {
                if (ansR - ansL > r - l) {
                    ansL = l;
                    ansR = r;
                }
                cntS[s.charAt(l)]--;
                l++;
            }
        }
        if (ansL == -1) return "";
        return s.substring(ansL, ansR + 1);
    }

    private boolean isCover(int[] cntS, int[] cntT) {
        for (int i = 0; i < 26; i++) {
            int t1 = i + 'a';
            int t2 = i + 'A';
            if (cntT[t1] > cntS[t1]) return false;
            if (cntT[t2] > cntS[t2]) return false;
        }
        return true;
    }
}
```
# 数组
## [最大子数组和](https://leetcode.cn/problems/maximum-subarray/)
### 简介
* 难度: {% label 中等 orange %}
* 其他Tags: {% label  blue %}或无
* 刷题日期: 2024.11.01
* 是否做出: ❎

### 思路
定义$dp[i]$为以i结尾的字符串的最大子序和，那么可以有：
* 和前面的拼接，即$dp[i] = dp[i - 1] + nums[i]$
* 自己从头开始计算，即$dp[i] = nums[i]$
取最大的即可
### 代码
```
class Solution {
    public int maxSubArray(int[] nums) {
        int[] dp = new int[nums.length];
        dp[0] = nums[0];
        int res = dp[0];
        for (int i = 1; i < nums.length; i++) {
            dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
            if (res < dp[i]) res = dp[i];
        }
        return res;
    }
}
```
## [轮转数组](https://leetcode.cn/problems/rotate-array/)
### 简介
* 难度: {% label 中等 orange %}
* 其他Tags: 无
* 刷题日期: 2024.11.13
* 是否做出: ✅

### 思路
比较容易想的做法就是，新建一个数组，将每个`nums[i]`放到轮转后的位置，最后复制到原数组中即可
另外一个做法就是，反转数组：[189. 轮转数组 - 力扣（LeetCode）](https://leetcode.cn/problems/rotate-array/solutions/551039/xuan-zhuan-shu-zu-by-leetcode-solution-nipk/?envType=study-plan-v2&envId=top-100-liked)
还有一个环状替换的思路看得不是很懂。
### 代码
```
class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k %= n;
        int[] res = new int[n];
        for (int i = 0; i < n; i++) {
            res[(i + k) % n] = nums[i];
        } 
        System.arraycopy(res, 0, nums, 0, n);
    }
}

// 反转数组
class Solution {
public:
    void reverse(vector<int>& nums, int start, int end) {
        while (start < end) {
            swap(nums[start], nums[end]);
            start += 1;
            end -= 1;
        }
    }

    void rotate(vector<int>& nums, int k) {
        k %= nums.size();
        reverse(nums, 0, nums.size() - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, nums.size() - 1);
    }
};
```
## [合并区间](https://leetcode.cn/problems/merge-intervals/)
### 简介
* 难度:{% label 中等 orange %}
* 其他Tags: 无
* 刷题日期: 2024.11.14
* 是否做出: ✅

### 思路
1. 首先对数组按照区间的左端点从大到小进行排序
2. 初始化变量pl为`intervals[0][0]`，pr为`intervals[0][1]`
3. 从1开始依次遍历区间，如果当前区间的左端点小于等于pr，即认定为重叠，更新pr为当前右端点和pr中最大的那个
4. 如果如果当前区间的左端点大于pr，则认定为不重叠，把pl，pr组成的区间加入答案中，更新pl和pr分别为当前区间的左右端点
5. 遍历结束后，当前的pl和pr都还没加入答案，因此需要额外把它加入到答案中
### 代码
```
class Solution {
    public int[][] merge(int[][] intervals) {
        List<int[]> res = new ArrayList<>();
        Arrays.sort(intervals, (i1, i2) -> i1[0] - i2[0]);
        int pl = intervals[0][0];
        int pr = intervals[0][1];
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] <= pr) { //重叠
                pr = Math.max(pr, intervals[i][1]);
            } else {
                res.add(new int[]{pl, pr});
                pl = intervals[i][0];
                pr = intervals[i][1];
            }
        }
        res.add(new int[]{pl, pr});
        return res.toArray(new int[res.size()][2]);
    }
}
```
## [除自身以外数组的乘积](https://leetcode.cn/problems/product-of-array-except-self/)
### 简介
* 难度: {% label 中等 orange %}
* 其他Tags: 无
* 刷题日期: 2024.11.14
* 是否做出: ✅

### 思路
题目要求不能使用除法，因此我们可以求数组的前缀乘积和后缀乘积，将当前num对应的前缀乘积和后缀乘积相乘即可。
### 代码
```
// class Solution {
//     public int[] productExceptSelf(int[] nums) {
//         int product = 1;
//         int[] preProduct = new int[nums.length]; 

//         preProduct[0] = nums[0];
//         for (int i = 1; i < nums.length; i++) {
//             preProduct[i] = nums[i] * preProduct[i - 1];
//         }
        
//         for (int i = nums.length - 2; i >= 0; i--) {
//             nums[i] *= nums[i + 1];
//         }

//         for (int i = 0; i < nums.length; i++) {
//             int pre = i == 0 ? 1 : preProduct[i - 1];
//             int next = i == nums.length - 1 ? 1 : nums[i + 1];
//             nums[i] = pre * next; 
//         }


//         return nums;
//     }
// }

class Solution {
    public int[] productExceptSelf(int[] nums) {
        int length = nums.length;
        int[] answer = new int[length];

        // answer[i] 表示索引 i 左侧所有元素的乘积
        // 因为索引为 '0' 的元素左侧没有元素， 所以 answer[0] = 1
        answer[0] = 1;
        for (int i = 1; i < length; i++) {
            answer[i] = nums[i - 1] * answer[i - 1];
        }

        // R 为右侧所有元素的乘积
        // 刚开始右边没有元素，所以 R = 1
        int R = 1;
        for (int i = length - 1; i >= 0; i--) {
            // 对于索引 i，左边的乘积为 answer[i]，右边的乘积为 R
            answer[i] = answer[i] * R;
            // R 需要包含右边所有的乘积，所以计算下一个结果时需要将当前值乘到 R 上
            R *= nums[i];
        }
        return answer;
    }
}

```
# 矩阵
## [矩阵置零](https://leetcode.cn/problems/set-matrix-zeroes/)
### 简介
* 难度: {% label 中等 orange %}
* 其他Tags: 无
* 刷题日期: 2024.11.15
* 是否做出: ✅

### 思路
* 首先遍历矩阵，使用两个标记数组来标记每一行和每一列是否有0出现。
* 再次遍历数组，如果当前元素所在的行或列已经被标记，则把当前元素置零。

### 代码
```
class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length;
        int n = matrix[0].length;
        boolean[] rowExit = new boolean[m];
        boolean[] colExit = new boolean[n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 0) {
                    rowExit[i] = true;
                    colExit[j] = true;
                }
            }
        }
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (rowExit[i] || colExit[j]) {
                    matrix[i][j] = 0;
                }
            }
        }
        
    }
}
```
## [螺旋矩阵](https://leetcode.cn/problems/spiral-matrix/)
### 简介
* 难度: {% label 中等 orange %}
* 其他Tags: {% label 模拟 blue %}
* 刷题日期: 2024.11.19
* 是否做出: ❎

### 思路
模拟即可
### 代码
```
class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> order = new ArrayList<Integer>();
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
            return order;
        }
        int rows = matrix.length, columns = matrix[0].length;
        int left = 0, right = columns - 1, top = 0, bottom = rows - 1;
        while (left <= right && top <= bottom) {
            for (int column = left; column <= right; column++) {
                order.add(matrix[top][column]);
            }
            for (int row = top + 1; row <= bottom; row++) {
                order.add(matrix[row][right]);
            }
            if (left < right && top < bottom) {
                for (int column = right - 1; column > left; column--) {
                    order.add(matrix[bottom][column]);
                }
                for (int row = bottom; row > top; row--) {
                    order.add(matrix[row][left]);
                }
            }
            left++;
            right--;
            top++;
            bottom--;
        }
        return order;
    }
}
```


# 链表
## [相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/)
### 简介
* 难度: {% label 简单 green %}
* 其他Tags: {% label 双指针 blue %}
* 刷题日期: 2024.10.31
* 是否做出: ❎

### 思路
这个有图解比较清晰：[160. 相交链表 - 力扣（LeetCode）](https://leetcode.cn/problems/intersection-of-two-linked-lists/solutions/12624/intersection-of-two-linked-lists-shuang-zhi-zhen-l/?envType=study-plan-v2&envId=top-100-liked)
### 代码
```
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode A = headA, B = headB;
        while (A != B) {
            A = A != null ? A.next : headB;
            B = B != null ? B.next : headA;
        }
        return A;
    }
}
```
## [反转链表](https://leetcode.cn/problems/reverse-linked-list/)
### 简介
* 难度: {% label 简单 green %}
* 其他Tags: 无
* 刷题日期: 2024.11.13
* 是否做出: ✅

### 思路
新建一个头结点，遍历链表，依次把结点使用头插法插入链表头。
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
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode phead = new ListNode();
        phead.next = null;
        ListNode cur = head;
        while (cur != null) {
            ListNode tp = cur.next;
            cur.next = phead.next;
            phead.next = cur;
            cur = tp;
        }
        return phead.next;
    }
}
```


、