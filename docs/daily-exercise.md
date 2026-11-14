<h1>日常练习</h1>
这里面大部分是一些比赛题

<h2>未竟之志（空悲切）</h2>

<p>给定一串数，你可以挪动其中的一个数，使得连续的5个数和最大.<br>
给定t组数据，每组数据包含n个数，输出每组数据的最大和.
</p>

未竟之志确实很遗憾这道题当时我也没写出来，空悲切

这道题其实是有三种情况的，分别是：<br>
1. 5个数都在原串中<br>
2. 选4个数后挪动一个数<br>
3.在6个数中挪走一个数<br>
最终结果就是这三种情况取最大值<br>

当然中间是需要优化的不然一定会超时(TE)<br>

```cpp linenums="1" title="未竟之志（空悲切）..cpp"
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
int main(){
	int t;
	cin >> t;
	
	for (int i = 0;i < t; i++){
		int n;
		cin >> n;
		vector<ll>nums(n+5);
		vector<ll>sum1(n+5,0);
		vector<ll>sum2(n+5,-1e18);
		vector<ll>sum3(n+6,-1e18);
		ll re = -1e18;
		for (int i = 1; i <= n; i++){
			cin >> nums[i];
			sum1[i]=sum1[i-1]+nums[i];	
		}
		for (int i = 1;i <= n; i++){
			sum2[i] = max(sum2[i-1],nums[i]);
		}
		for (int i = n ;i > 0; i--){
			sum3[i] = max(sum3[i+1],nums[i]);
		}
		for (int i = 1; i + 4 <= n; i++){
			ll sum5 = sum1[i+4] - sum1[i-1];
			re = max(sum5,re);
		}
		for (int i = 1; i + 3 <=n; i++){
			ll sum4 = sum1[i+3] - sum1[i-1];
			ll shumax = max(sum2[i-1],sum3[i+4]);
			re = max(sum4+shumax,re);
		}
		for (int i = 1 ;i + 5 <= n; i++){
			ll sum6 = sum1[i+5] - sum1[i-1];
			ll shumin = 1e8;
			for (int j =i ;j <= i+5; j++){
				shumin = min(shumin,nums[j]);
			}	
			re = max(re,sum6-shumin);
		}
		cout << re <<endl;
	}
	
}
```
好的我们来学习一下这个优化过程<br>
这个就是利用前缀和来求区间和<br>







<h2>档案分册</h2>

<p>给定n个案件，依次编号为1到n。第i条记录属于编号C<sub>i</sub>的案件，有W<sub>i</sub>页。<br>
</p>
<p>给定k个档案册，每册档案必须包含一段非空且连续的记录，所有档案册按顺序恰好覆盖全部记录。同时，同一案件的所有记录必须在同一页档案册中。你需要将所有案件的记录分到k个档案册中，使每个档案册的页数和最小。输出最小化的最大页数和。<br>
</p>

```cpp linenums="1" title="档案分册..cpp"
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, k;
    if (!(cin >> n >> k)) return 0;

    // 使用 unordered_map 记录每个案件的最早位置、最晚位置、总页数
    unordered_map<int, int> min_pos, max_pos;
    unordered_map<int, ll> sum_w;

    for (int i = 1; i <= n; i++) {
        int c; ll w;
        cin >> c >> w;
        if (min_pos.find(c) == min_pos.end()) {
            min_pos[c] = i;
        }
        max_pos[c] = i;
        sum_w[c] += w;
    }

    // 提取所有案件，按最早出现位置排序
    vector<tuple<int, int, ll>> cases;
    for (auto& [c, w] : sum_w) {
        cases.push_back({min_pos[c], max_pos[c], w});
    }
    sort(cases.begin(), cases.end());

    // 区间合并，得到不可拆分的“大块”
    vector<ll> blocks;
    int curL = -1, curR = -1;
    ll curSum = 0;

    for (auto [L, R, W] : cases) {
        if (curL == -1) {
            curL = L; curR = R; curSum = W;
        } else if (L <= curR) {
            // 有重叠，合并
            curR = max(curR, R);
            curSum += W;
        } else {
            // 无重叠，结算上一个块
            blocks.push_back(curSum);
            curL = L; curR = R; curSum = W;
        }
    }
    if (curL != -1) blocks.push_back(curSum);

    int m = blocks.size();
    // 如果合并后的块数超过 k，无解
    if (m > k) {
        cout << -1 << "\n";
        return 0;
    }

    // 二分答案
    ll low = 0, high = 0;
    for (ll w : blocks) {
        low = max(low, w); // 下界是最大的单块页数
        high += w;         // 上界是总页数
    }

    ll ans = high;
    while (low <= high) {
        ll mid = low + (high - low) / 2;
        
        // check(mid): 能否在每册不超过 mid 的情况下，划分为 <= k 册
        int cnt = 0;     // 需要的册数
        ll cur = 0;      // 当前册的页数
        for (ll w : blocks) {
            if (cur + w > mid) {
                cnt++;
                cur = w;
            } else {
                cur += w;
            }
        }
        if (cur > 0) cnt++; // 最后一册

        if (cnt <= k) {
            ans = mid;
            high = mid - 1; // 尝试更小的最大值
        } else {
            low = mid + 1;  // 限制太严，需要放宽
        }
    }

    cout << ans << "\n";
    return 0;
}
```
<p>这个要用到哈希表来记录每个案件的最早位置、最晚位置、总页数<br>
我之前的哈希表里是没有tuple这个的介绍的所以现在我来介绍一下tuple
</p>
<p>tuple是一个元组，可以同时存储多个数据类型。他是c++11新增的<br>
我们可以简单地理解为加强版的pair<br>
但是tuple可以同时存储多个数据类型，而pair只能存储两种数据类型<br>
</p>
<p>例如：pair<int,int><br>
tuple<int,int,int><br>
</p>
<p>如果你用不习惯tuple，你可以用结构体来代替
</p>




<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>一次移动后能否使 A 与 B 一致</title>
</head>
<body>
    <h1>一次移动后能否使 A 与 B 一致</h1>

    <h2>问题描述</h2>
    <p>
        给定由正整数组成、长度为 <code>N</code> 的序列
        <code>A=(A<sub>1</sub>,A<sub>2</sub>,…,A<sub>N</sub>)</code>
        和
        <code>B=(B<sub>1</sub>,B<sub>2</sub>,…,B<sub>N</sub>)</code>。
    </p>
    <p>
        对序列 <code>A</code> 恰好进行 1 次以下操作。
    </p>
    <p>
        从 <code>A</code> 中选出一个元素取出，并将其插入剩余序列的任意位置。
        更严格地说，依次进行以下 2 个操作。
    </p>
    <ol>
        <li>
            选择一个满足 <code>1 ≤ i ≤ N</code> 的整数 <code>i</code>，
            令长度为 <code>N−1</code> 的序列
            <code>X=(X<sub>1</sub>,X<sub>2</sub>,…,X<sub>N−1</sub>)</code>
            为
            <code>(A<sub>1</sub>,A<sub>2</sub>,…,A<sub>i−1</sub>,A<sub>i+1</sub>,A<sub>i+2</sub>,…,A<sub>N</sub>)</code>，
            并令整数 <code>Y=A<sub>i</sub></code>。
        </li>
        <li>
            选择一个满足 <code>1 ≤ j ≤ N</code> 的整数 <code>j</code>，
            将长度为 <code>N</code> 的序列
            <code>(X<sub>1</sub>,X<sub>2</sub>,…,X<sub>j−1</sub>,Y,X<sub>j</sub>,X<sub>j+1</sub>,…,X<sub>N−1</sub>)</code>
            作为新的 <code>A</code>。
        </li>
    </ol>
    <p>
        注意，插入元素时，也可以插入到序列的左端或右端。
    </p>
    <p>
        请判断操作之后能否使 <code>A</code> 与 <code>B</code> 一致。
    </p>

    <h2>约束</h2>
    <ul>
        <li><code>1 ≤ N ≤ 2×10<sup>5</sup></code></li>
        <li><code>1 ≤ A<sub>i</sub> ≤ N</code>（<code>1 ≤ i ≤ N</code>）</li>
        <li><code>1 ≤ B<sub>i</sub> ≤ N</code>（<code>1 ≤ i ≤ N</code>）</li>
        <li>输入均为整数</li>
    </ul>

    <h2>输入</h2>
    <p>输入以如下格式从标准输入给出。</p>
    <pre>
N
A<sub>1</sub> A<sub>2</sub> … A<sub>N</sub>
B<sub>1</sub> B<sub>2</sub> … B<sub>N</sub>
</pre>

    <h2>输出</h2>
    <p>
        如果恰好进行 1 次操作后能使 <code>A</code> 与 <code>B</code> 一致，则输出一行 <code>Yes</code>；
        否则输出一行 <code>No</code>。
    </p>

    <h2>输入样例 1</h2>
    <pre>
6
1 4 1 4 2 1
1 4 1 1 4 2
</pre>

    <h2>输出样例 1</h2>
    <pre>
Yes
</pre>

    <p>
        例如，取出 <code>A<sub>6</sub></code>，并将其插入剩余序列从头数第 3 项和第 4 项之间，
        则操作后的 <code>A</code> 可以变为
        <code>(1,4,1,1,4,2)</code>。
    </p>
    <p>因此输出 <code>Yes</code>。</p>

    <h2>输入样例 2</h2>
    <pre>
2
1 1
1 2
</pre>

    <h2>输出样例 2</h2>
    <pre>
No
</pre>

    <p>
        无论对 <code>A</code> 进行怎样的操作，都无法使其与 <code>B</code> 一致。
    </p>

    <h2>输入样例 3</h2>
    <pre>
3
1 2 3
1 2 3
</pre>

    <h2>输出样例 3</h2>
    <pre>
Yes
</pre>

    <p>
        将取出的元素插入到原本所在的位置也可以。
    </p>

    <h2>输入样例 4</h2>
    <pre>
30
25 11 21 15 30 20 17 19 17 21 10 13 22 10 22 14 30 25 17 25 11 19 27 27 15 18 16 16 20 16
25 11 15 30 20 17 19 17 21 10 13 22 10 22 14 30 25 17 25 11 19 27 27 15 21 18 16 16 20 16
</pre>

    <h2>输出样例 4</h2>
    <pre>
Yes
</pre>
</body>
</html>



```cpp title="一次移动后能否使 A 与 B 一致.cpp"
#include<bits/stdc++.h>
using namespace std;
#define endl '\n'

int main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    int n;
    cin >> n;
    vector<int> v1(n), v2(n);
    for (int i = 0; i < n; i++) cin >> v1[i];
    for (int i = 0; i < n; i++) cin >> v2[i];

    if (v1 == v2){
        cout << "Yes" << endl;
        return 0;
    }
    int l = 0;
    while (l < n && v1[l] == v2[l]) l++;
    int r = n - 1;
    while (r >= 0 && v1[r] == v2[r]) r--;
    bool f = (v1[l] == v2[r]);
    for (int i = l; i < r && f; i++){
        if (v1[i + 1] != v2[i]) f = false;
    }
    bool f1 = (v1[r] == v2[l]);
    for (int i = l; i < r && f1; i++){
        if (v1[i] != v2[i + 1]) f1 = false;
    }

    if (f || f1){
        cout << "Yes" << endl;
    } else {
        cout << "No" << endl;
    }
    return 0;
}
```

这个题我当时看到的时候也是想不出来



<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>操作后可能得到的序列种数</title>
</head>
<body>
    <h1>操作后可能得到的序列种数</h1>

    <h2>问题描述</h2>
    <p>
        给定一个由正整数组成、长度为 <code>N</code> 的序列
        <code>A=(A<sub>1</sub>,A<sub>2</sub>,…,A<sub>N</sub>)</code>。
    </p>
    <p>
        对序列 <code>A</code> 恰好进行 1 次以下操作。
    </p>
    <p>
        从 <code>A</code> 中选出一个元素取出，并将它插入到剩余序列中原来的位置或比原来更靠前的位置。
        更严格地说，依次进行以下 2 个操作。
    </p>
    <ol>
        <li>
            选择一个满足 <code>1 ≤ i ≤ N</code> 的整数 <code>i</code>，
            令长度为 <code>N−1</code> 的序列
            <code>X=(X<sub>1</sub>,X<sub>2</sub>,…,X<sub>N−1</sub>)</code>
            为
            <code>(A<sub>1</sub>,A<sub>2</sub>,…,A<sub>i−1</sub>,A<sub>i+1</sub>,A<sub>i+2</sub>,…,A<sub>N</sub>)</code>，
            并令整数 <code>Y=A<sub>i</sub></code>。
        </li>
        <li>
            选择一个满足 <code>1 ≤ j ≤ i</code> 的整数 <code>j</code>，
            将长度为 <code>N</code> 的序列
            <code>(X<sub>1</sub>,X<sub>2</sub>,…,X<sub>j−1</sub>,Y,X<sub>j</sub>,X<sub>j+1</sub>,…,X<sub>N−1</sub>)</code>
            作为新的 <code>A</code>。
        </li>
    </ol>
    <p>
        注意，插入元素时，有时可以插入到序列的左端或右端。
    </p>
    <p>
        请回答：作为操作结果，可能得到多少种不同的序列？
    </p>
    <p>
        即使选择的是不同的 <code>(i,j)</code>，如果得到的序列相同，也只算作同一种。
    </p>

    <h2>约束</h2>
    <ul>
        <li>输入均为整数</li>
        <li><code>1 ≤ N ≤ 2×10<sup>5</sup></code></li>
        <li><code>1 ≤ A<sub>i</sub> ≤ N</code>（<code>1 ≤ i ≤ N</code>）</li>
    </ul>

    <h2>输入</h2>
    <p>输入以如下格式从标准输入给出。</p>
    <pre>
N
A<sub>1</sub> A<sub>2</sub> … A<sub>N</sub>
</pre>

    <h2>输出</h2>
    <p>输出答案。</p>

    <h2>输入样例 1</h2>
    <pre>
```
6
1 4 1 4 2 1
```
</pre>

    <h2>输出样例 1</h2>
    <pre>
12
</pre>

    <p>
        例如，取 <code>i=6,j=4</code> 进行操作，可以得到
        <code>(1,4,1,1,4,2)</code>。
    </p>
    <p>
        除此之外，还可以得到以下 11 种序列。
    </p>
    <pre>
(1,1,4,1,4,2)
(1,1,4,4,2,1)
(1,2,4,1,4,1)
(1,4,1,2,4,1)
(1,4,1,4,1,2)
(1,4,1,4,2,1)
(1,4,2,1,4,1)
(1,4,4,1,2,1)
(2,1,4,1,4,1)
(4,1,1,4,2,1)
(4,1,4,1,2,1)
</pre>
    <p>因此输出 12。</p>

    <h2>输入样例 2</h2>
   
    <pre>
```
5
1 1 1 1 1
```
</pre>

    <h2>输出样例 2</h2>
    <pre>
1
</pre>

    <p>
        注意，即使由不同的 <code>(i,j)</code> 得到，只要序列相同，就只计作 1 种。
    </p>

    <h2>输入样例 3</h2>
    <pre>
```
30
24 22 18 20 14 22 14 14 26 14 26 26 20 22 24 18 22 22 14 24 18 14 14 24 22 18 18 26 14 20
```
</pre>

    <h2>输出样例 3</h2>
    <pre>
303
</pre>
</body>
</html>

```cpp title="atcode11.14D.cpp"
#include <bits/stdc++.h>
using namespace std;
#define endl '\n'
typedef long long ll;
int main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    int n;
    cin >> n;
    vector<int> A(n);
    for (auto &x : A) cin >> x;

    ll ans = 1;                 
    vector<ll> cnt(n + 1, 0);   
    cnt[A[0]] = 1;

    for (int r = 1; r < n; r++){
        if (A[r-1] != A[r]){
            ans += r - cnt[A[r]]; 
        }     
        cnt[A[r]]++;
    }
    cout << ans << endl;
    return 0;
}
```