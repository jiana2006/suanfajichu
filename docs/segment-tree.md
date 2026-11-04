<h1>线段树</h1>
线段树：线段树（Segment Tree） 是一种用于维护区间信息的数据结构，常用于处理数组上的区间查询和区间修改问题。

1. 基本思想
把数组的每个区间递归地划分成若干子区间，每个节点表示一个区间，并维护该区间的某种统计信息，例如：

区间和

区间最大值 / 最小值

区间乘积

区间 gcd

区间内满足某条件的元素个数

根节点表示整个数组区间，叶子节点表示单个元素。

例如数组 a[1..8]，线段树大致为：

```
              [1,8]
           /        \
       [1,4]        [5,8]
      /    \        /    \
   [1,2]  [3,4]  [5,6]  [7,8]
   / \     / \    / \    / \
 [1] [2] [3] [4][5] [6][7] [8]
 ```

2. 节点结构

常见实现中，一个节点至少保存：
```
struct Node {
    int l, r;      // 当前节点表示的区间
    long long sum; // 例如区间和
    long long lazy; // 懒标记，区间修改时使用
};
```
也可以用数组实现
```
sum[p];   // 节点 p 维护的区间和
lazy[p];  // 节点 p 的懒标记
```

3.适用场景
线段树适合解决：

区间求和 + 区间修改

区间最值查询

区间赋值、区间加

动态维护区间统计量

扫描线求矩形面积

维护区间最大子段和

离散化后的区间覆盖问题

现在我们先写一题：

<h2>野生狗奶</h2>
现实生活中肯定是不会有野生狗奶的，毕竟没有加入表。
现在有n个数，一个代表时间的开始，一个代表时间的结束。代表牛奶的生产时间和过期时间。
你现在需要求出至少有一瓶牛奶不过期的最大时间段，以及中间没有牛奶的最大时间段。
<div style="text-align:center;">
<img src="../assets/gif/野生狗奶.jpg" style="width:280px; max-width:100%;" alt="野生狗奶"></div>

```cpp title="野生狗奶"
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
    int n;
    cin >> n;
    struct time {
        int begin;
        int end;
    };
    vector<time> v(n);
    for (int i = 0; i < n; i++) {
        cin >> v[i].begin >> v[i].end;
    }

    sort(v.begin(), v.end(), [](const time &a, const time &b) {
        return a.begin < b.begin;
    });
    int st   = v[0].begin;   
    int en   = v[0].end;     
    int ne   = 0;           
    int next = 0;           
    int re1  = 0;     
    int re2  = 0;        

    for (int i = 1; i < n; i++) {
        ne   = v[i].begin;
        next = v[i].end;

        if (ne <= en) {
            en = max(en, next);
        } else {

            re1 = max(re1, en - st);   
            re2 = max(re2, ne - en);   
            st = ne;                  
            en = next;
        }
    }
    re1 = max(re1, en - st);
    cout << re1 << " " << re2 << "\n";
    return 0;
}
```
