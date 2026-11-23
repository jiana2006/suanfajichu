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


下面将会是维序一周的练习（树）：

<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>580C - 凯法和公园</title>
</head>
<body>

  <h1>580C - 凯法和公园（Kefa and Park）</h1>

  <p>时间限制：2 秒</p>
  <p>内存限制：256 MB</p>

  <h2>题目描述</h2>
  <p>凯法（Kefa）决定用自己第一份丰厚的薪水去餐厅庆祝。</p>
  <p>他住在一个不寻常的公园旁边。这个公园是一棵有 <var>n</var> 个顶点的有根树，根是顶点 1。顶点 1 也是凯法的家。</p>
  <p>不幸的是，公园里还有猫。凯法已经知道哪些顶点上有猫。</p>
  <p>公园的叶子顶点上开有餐厅。凯法想选一个餐厅去吃饭，但他非常怕猫。因此，如果从餐厅到他家的路径上，包含超过 <var>m</var> 个连续有猫的顶点，他就不会去这个餐厅。</p>
  <p>你的任务是帮助凯法计算：他一共可以去多少个餐厅。</p>

  <h2>输入格式</h2>
  <p>第一行包含两个整数 <var>n</var> 和 <var>m</var>（2 ≤ <var>n</var> ≤ 10<sup>5</sup>，1 ≤ <var>m</var> ≤ <var>n</var>），分别表示树的顶点数，以及凯法最多能接受的连续有猫顶点数。</p>
  <p>第二行包含 <var>n</var> 个整数 <var>a</var><sub>1</sub>, <var>a</var><sub>2</sub>, ..., <var>a</var><sub>n</sub>。若 <var>a</var><sub>i</sub> = 0，表示顶点 <var>i</var> 没有猫；若 <var>a</var><sub>i</sub> = 1，表示顶点 <var>i</var> 有猫。</p>
  <p>接下来 <var>n</var> − 1 行，每行包含两个整数 <var>x</var><sub>i</sub> 和 <var>y</var><sub>i</sub>（1 ≤ <var>x</var><sub>i</sub>, <var>y</var><sub>i</sub> ≤ <var>n</var>，<var>x</var><sub>i</sub> ≠ <var>y</var><sub>i</sub>），表示树中顶点 <var>x</var><sub>i</sub> 和 <var>y</var><sub>i</sub> 之间有一条边。</p>
  <p>保证给出的边构成一棵树。</p>

  <h2>输出格式</h2>
  <p>输出一个整数，表示从凯法家出发，路径上连续有猫的顶点数不超过 <var>m</var> 的叶子餐厅数量。</p>

  <h2>样例 1</h2>

  <h3>输入</h3>
  <pre><code>4 1
1 1 0 0
1 2
1 3
1 4</code></pre>

  <h3>输出</h3>
  <pre><code>2</code></pre>

  <h2>样例 2</h2>

  <h3>输入</h3>
  <pre><code>7 1
1 0 1 1 0 0 0
1 2
1 3
2 4
2 5
3 6
3 7</code></pre>

  <h3>输出</h3>
  <pre><code>2</code></pre>

  <h2>说明</h2>
  <p>树是含有 <var>n</var> 个顶点和 <var>n</var> − 1 条边的连通图。有根树是指定一个特殊顶点作为根的树。在有根树中，对于一条边连接的两个顶点，离根更近的那个叫父节点，另一个叫子节点。没有子节点的顶点称为叶子。</p>
  <p>第一个样例中，有猫的顶点被标记出来。餐厅在顶点 2、3、4。凯法不能去顶点 2 的餐厅。</p>
  <p>第二个样例中，餐厅在顶点 4、5、6、7。凯法不能去餐厅 6 和 7。</p>

</body>
</html>


```cpp title="atcode580C.cpp"
#include<bits/stdc++.h>
using namespace std;

#define endl "\n"

const int N = 1e5 + 10;
const int M = 2 * N;

int h[N], nxt[M], t[M], cnt;
int a[N];

void add (int a, int b){
	t[cnt] = b;
	nxt[cnt] = h[a];
	h[a] = cnt ++;
}

int n, m;
int re = 0;

void dfs(int u, int fa, int shu){
	if (shu > m) return; // 剪枝
	
	bool leaf = true;    // 先假设是叶子
	
	for (int i = h[u]; i != -1; i = nxt[i]){
		int v = t[i];
		if (v == fa) continue;
		
		leaf = false;    // 只要进了这个循环，说明有儿子，不是叶子
		
		int nshu;
		if (a[v] == 1){
			nshu = shu + 1;
		}else{
			nshu = 0;
		}
		
		dfs(v, u, nshu); // ★ 修复 1：传参改成 v, u
	}
	
	// ★ 修复 2：判断叶子的逻辑必须放在 for 循环的外面
	if (leaf) {
		re++;
	}
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	cnt = 0;
	memset(h, -1, sizeof(h));
	
	cin >> n >> m;
	
	// ★ 修复 3：下标从 1 开始
	for (int i = 1; i <= n; i++) cin >> a[i];
	
	for (int i = 1; i < n; i++){
		int u, v; // 建议不要用 a, b 做变量名，容易和上面的猫数组 a 混淆
		cin >> u >> v;
		add(u, v);
		add(v, u);
	}
	
	dfs(1, 0, a[1]);
	
	cout << re << endl;
	 
	return 0;
}
```

<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>1689C - 被感染的树</title>
</head>
<body>

  <h1>1689C - 被感染的树（Infected Tree）</h1>

  <p>时间限制：3 秒</p>
  <p>内存限制：256 MB</p>

  <h2>题目描述</h2>
  <p>Byteland 是一片美丽的土地，以美丽的树而闻名。</p>
  <p>Misha 找到了一棵有 <var>n</var> 个顶点的二叉树，顶点编号为 1 到 <var>n</var>。二叉树是一个无环的连通无向图，包含 <var>n</var> 个顶点和 <var>n</var> − 1 条边。每个顶点的度数至多为 3，其中根是编号为 1 的顶点，根的度数至多为 2。</p>
  <p>不幸的是，根被感染了。</p>
  <p>接下来会发生 <var>n</var> 次如下过程：</p>
  <ul>
    <li>Misha 要么选择一个未被感染且未被删除的顶点，将它以及所有与它相连的边删除；要么什么也不做。</li>
    <li>然后，感染会扩散到所有与已感染顶点通过一条边相连的顶点。所有已经感染的顶点仍然保持感染状态。</li>
  </ul>
  <p>由于 Misha 没有太多时间思考，请告诉他：最多能有多少个顶点免于感染？注意，被删除的顶点不算作被拯救。</p>

  <h2>输入格式</h2>
  <p>输入包含多组测试数据。</p>
  <p>第一行一个整数 <var>t</var>（1 ≤ <var>t</var> ≤ 5000），表示测试数据组数。</p>
  <p>接下来是每组测试数据。</p>
  <p>每组测试数据第一行一个整数 <var>n</var>（2 ≤ <var>n</var> ≤ 3 × 10<sup>5</sup>），表示树的顶点数。</p>
  <p>接下来 <var>n</var> − 1 行，每行两个正整数 <var>u</var><sub>i</sub> 和 <var>v</var><sub>i</sub>（1 ≤ <var>u</var><sub>i</sub>, <var>v</var><sub>i</sub> ≤ <var>n</var>），表示它们之间有一条边。</p>
  <p>保证给出的图是一棵以 1 为根的二叉树。还保证所有测试数据的 <var>n</var> 之和不超过 3 × 10<sup>5</sup>。</p>

  <h2>输出格式</h2>
  <p>对于每组测试数据，输出 Misha 最多能拯救的顶点数。</p>

  <h2>样例</h2>

  <h3>输入</h3>
  <pre><code>4
2
1 2
4
1 2
2 3
2 4
7
1 2
1 5
2 3
2 4
5 6
5 7
15
1 2
2 3
3 4
4 5
4 6
3 7
2 8
1 9
9 10
9 11
10 12
10 13
11 14
11 15</code></pre>

  <h3>输出</h3>
  <pre><code>0
2
2
10</code></pre>

  <h2>说明</h2>
  <p>第一组数据中，唯一可行的操作是删除顶点 2，这样总共拯救 0 个顶点。</p>
  <p>第二组数据中，如果删除顶点 2，可以拯救顶点 3 和 4。</p>

</body>
</html>

```cpp title="atcode580C.cpp"
#include<bits/stdc++.h>
using namespace std;

#define endl "\n"

const int N = 3e5 + 10;
const int M = 2 * N;
int h[N], nxt[M], t[M], cnt;
int sz[N], f[N];

void add (int a, int b){
	t[cnt] = b;
	nxt[cnt] = h[a];
	h[a] = cnt++;
}

void dfs(int u, int fa){
	int c1 = 0, c2 = 0;
	sz[u] = 1; // ★ 修复 1：子树大小初始包含自己
	
	for (int i = h[u]; i != -1; i = nxt[i]){
		int v = t[i];
		if (v == fa) continue;
		
		dfs(v, u);
		sz[u] += sz[v]; // 累加子树大小
		
		// 记录前两个儿子（假设题目保证每个点度数有限制，或者只考虑前两个子节点）
		if (c1 == 0) c1 = v;
		else c2 = v; 
	}
	
	if (c1 == 0) {
		f[u] = 0;
	} else if (c2 == 0) {
		f[u] = sz[c1] - 1;
	} else {
		f[u] = max(sz[c1] - 1 + f[c2], sz[c2] - 1 + f[c1]);
	}
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	int t;
	cin >> t;
	while (t--){
		int n;
		cin >> n;
		cnt = 0;
		
		// ★ 修复 3：只清空前 n 个节点的内容，大大节省时间，避免 TLE
		for (int i = 1; i <= n; i++) {
			h[i] = -1;
			sz[i] = 0; // 清理 sz 数组
			f[i] = 0;  // 清理 f 数组
		}
		
		for (int i = 1; i < n; i++){
			int u, v;
			cin >> u >> v;
			add(u, v);
			add(v, u);
		}
		
		dfs(1, 0);
		cout << f[1] << endl;
	}
	
	return 0;
}
```

<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>1324F - 最大白色子树</title>
</head>
<body>

  <h1>1324F - 最大白色子树（Maximum White Subtree）</h1>

  <p>时间限制：2 秒</p>
  <p>内存限制：256 MB</p>

  <h2>题目描述</h2>
  <p>给定一棵包含 <var>n</var> 个顶点的树。树是一个有 <var>n</var> − 1 条边的连通无向图。</p>
  <p>每个顶点 <var>v</var> 都有一个颜色：如果 <var>a</var><sub>v</sub> = 1，则顶点 <var>v</var> 是白色；如果 <var>a</var><sub>v</sub> = 0，则顶点 <var>v</var> 是黑色。</p>
  <p>对于每个顶点 <var>v</var>，你需要解决以下问题：</p>
  <p>如果你选择一棵包含顶点 <var>v</var> 的子树，那么最多能得到多少个“白点数 − 黑点数”？这里的子树指给定树的一个连通子图。</p>
  <p>形式化地说，如果选择的子树包含 <var>cnt</var><sub>w</sub> 个白点和 <var>cnt</var><sub>b</sub> 个黑点，你需要最大化 <var>cnt</var><sub>w</sub> − <var>cnt</var><sub>b</sub>。</p>

  <h2>输入格式</h2>
  <p>第一行包含一个整数 <var>n</var>（2 ≤ <var>n</var> ≤ 2 × 10<sup>5</sup>），表示树的顶点数。</p>
  <p>第二行包含 <var>n</var> 个整数 <var>a</var><sub>1</sub>, <var>a</var><sub>2</sub>, ..., <var>a</var><sub>n</sub>（0 ≤ <var>a</var><sub>i</sub> ≤ 1），其中 <var>a</var><sub>i</sub> 表示第 <var>i</var> 个顶点的颜色。</p>
  <p>接下来 <var>n</var> − 1 行描述树的边。第 <var>i</var> 行包含两个整数 <var>u</var><sub>i</sub> 和 <var>v</var><sub>i</sub>，表示一条连接顶点 <var>u</var><sub>i</sub> 和 <var>v</var><sub>i</sub> 的边（1 ≤ <var>u</var><sub>i</sub>, <var>v</var><sub>i</sub> ≤ <var>n</var>，<var>u</var><sub>i</sub> ≠ <var>v</var><sub>i</sub>）。</p>
  <p>保证这些边构成一棵树。</p>

  <h2>输出格式</h2>
  <p>输出 <var>n</var> 个整数 <var>res</var><sub>1</sub>, <var>res</var><sub>2</sub>, ..., <var>res</var><sub>n</sub>。其中 <var>res</var><sub>i</sub> 表示：在包含顶点 <var>i</var> 的某个子树中，白点数减黑点数的最大值。</p>

  <h2>样例 1</h2>

  <h3>输入</h3>
  <pre><code>9
0 1 1 1 0 0 0 0 1
1 2
1 3
3 4
3 5
2 6
4 7
6 8
5 9</code></pre>

  <h3>输出</h3>
  <pre><code>2 2 2 2 2 1 1 0 2</code></pre>

  <h2>样例 2</h2>

  <h3>输入</h3>
  <pre><code>4
0 0 1 0
1 2
1 3
1 4</code></pre>

  <h3>输出</h3>
  <pre><code>0 -1 1 -1</code></pre>

  <h2>说明</h2>
  <p>第一个样例中，黑色顶点在图中加粗显示。</p>
  <p>第二个样例中，对于顶点 2、3、4，最优子树分别只包含它们自己。对于顶点 1，最优子树由顶点 1 和顶点 3 组成。</p>

</body>
</html>


```cpp linenums="1" title="1324F.cpp.cpp"
#include<bits/stdc++.h>
using namespace std;

typedef long long ll;
#define endl "\n"
const int N = 2e5 + 10;
const int M = 2 * N;
int h[N], nxt[M], t[M], cnt;
void add(int a, int b){
    t[cnt] = b;
    nxt[cnt] = h[a];
    h[a] = cnt ++;
}
int f[N], ans[N];
int a[N];
void dfs1(int u, int fa){
    if(a[u] == 1)f[u] = 1;
    else f[u] = -1;
    for (int i = h[u]; i != -1; i = nxt[i]){
        int j = t[i];
        if (j == fa) continue;
        dfs1(j, u);
        if(f[j] > 0)f[u] += f[j];
    }
}
void dfs2(int u, int fa){
    for (int i = h[u]; i != -1; i = nxt[i]){
        int j = t[i];
        if (j == fa) continue;
        int x = ans[u] - max(0, f[j]);
        if (x > 0){
            ans[j] = f[j] + x;
        }
        else{
            ans[j] = f[j];
        }
        dfs2(j, u);
    }
}
int main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    int n;
    cin >> n;
    cnt = 0;
    memset(h, -1, sizeof(h));
    for (int i = 1; i <= n; i++){
        cin >> a[i];
    } 
    for (int i = 1; i < n; i++){
        int x, y;
        cin >> x >> y;
        add(x, y);
        add(y, x);
    }  
    dfs1(1, 0);
    ans[1] = f[1];
    dfs2(1, 0);
    for (int i = 1; i <= n; i++){
        cout << ans[i] << " ";
    }


    return 0;
}

```

<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>1528A - Parsa 的巨大树</title>
</head>
<body>

  <h1>1528A - Parsa 的巨大树（Parsa's Humongous Tree）</h1>

  <p>时间限制：1 秒</p>
  <p>内存限制：256 MB</p>

  <h2>题目描述</h2>
  <p>Parsa 有一棵巨大的树，包含 <var>n</var> 个顶点。对于每个顶点 <var>v</var>，他写了两个整数 <var>l</var><sub>v</sub> 和 <var>r</var><sub>v</sub>。</p>
  <p>为了让 Parsa 的树看起来更加壮观，Nima 想给每个顶点 <var>v</var> 分配一个整数 <var>a</var><sub>v</sub>，满足 <var>l</var><sub>v</sub> ≤ <var>a</var><sub>v</sub> ≤ <var>r</var><sub>v</sub>，使得 Parsa 的树的美感最大化。</p>
  <p>Nima 对美感的定义很奇怪。他把树的美感定义为：对于树中每条边 (<var>u</var>, <var>v</var>)，计算 |<var>a</var><sub>u</sub> − <var>a</var><sub>v</sub>|，然后对所有边求和。</p>
  <p>由于 Parsa 的树太大了，Nima 无法自己最大化美感。你的任务是求出 Parsa 的树可能达到的最大美感。</p>

  <h2>输入格式</h2>
  <p>第一行包含一个整数 <var>t</var>（1 ≤ <var>t</var> ≤ 250），表示测试数据组数。</p>
  <p>对于每组测试数据：</p>
  <p>第一行包含一个整数 <var>n</var>（2 ≤ <var>n</var> ≤ 10<sup>5</sup>），表示 Parsa 的树的顶点数。</p>
  <p>接下来 <var>n</var> 行，第 <var>i</var> 行包含两个整数 <var>l</var><sub>i</sub> 和 <var>r</var><sub>i</sub>（1 ≤ <var>l</var><sub>i</sub> ≤ <var>r</var><sub>i</sub> ≤ 10<sup>9</sup>）。</p>
  <p>接下来 <var>n</var> − 1 行，每行包含两个整数 <var>u</var> 和 <var>v</var>（1 ≤ <var>u</var>, <var>v</var> ≤ <var>n</var>，<var>u</var> ≠ <var>v</var>），表示 Parsa 的树中顶点 <var>u</var> 和 <var>v</var> 之间有一条边。</p>
  <p>保证给出的图是一棵树。保证所有测试数据的 <var>n</var> 之和不超过 2 × 10<sup>5</sup>。</p>

  <h2>输出格式</h2>
  <p>对于每组测试数据，输出 Parsa 的树的最大可能美感。</p>

  <h2>样例</h2>

  <h3>输入</h3>
  <pre><code>3
2
1 6
3 8
1 2
3
1 3
4 6
7 9
1 2
2 3
6
3 14
12 20
12 19
2 12
10 17
3 17
3 2
6 5
1 5
2 6
4 6</code></pre>

  <h3>输出</h3>
  <pre><code>7
8
62</code></pre>

  <h2>说明</h2>
  <p>第一组数据中，一种可行赋值是 <var>a</var> = {1, 8}，美感为 |1 − 8| = 7。</p>
  <p>第二组数据中，一种可行赋值是 <var>a</var> = {1, 5, 9}，美感为 |1 − 5| + |5 − 9| = 8。</p>

</body>
</html>

```cpp title="1528A - Parsa 的巨大树"

#include<bits/stdc++.h>
using namespace std;
#define endl "\n"
typedef long long ll;

const int N = 2e5 + 10;
const int M = 2 * N;

int h[N], e[M], ne[M], idx;     
int T;                           
int l[N], r[N];
ll dp[N][2];                 

void add(int a, int b) {
    e[idx] = b;
    ne[idx] = h[a];
    h[a] = idx++;
}
void dfs(int u, int fa) {
    dp[u][0] = dp[u][1] = 0;
    for (int i = h[u]; i != -1; i = ne[i]) {
        int v = e[i];
        if (v == fa) continue;            
        dfs(v, u);
        dp[u][0] += max(dp[v][0] + abs((ll)l[u] - l[v]),
                        dp[v][1] + abs((ll)l[u] - r[v]));
        dp[u][1] += max(dp[v][0] + abs((ll)r[u] - l[v]),
                        dp[v][1] + abs((ll)r[u] - r[v]));
    }
}
int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
    cin >> T;
    while (T--) {
        int n;
        cin >> n;
        idx = 0;
        memset(h, -1, sizeof(h));

        for (int i = 1; i <= n; i++) {
            cin >> l[i] >> r[i];
        }

        for (int i = 1; i < n; i++) {
            int u, v;
            cin >> u >> v;
            add(u, v);
            add(v, u);                    
        }

        dfs(1, 0);                      
        cout << max(dp[1][0], dp[1][1]) << endl;
    }
    return 0;
}

```


<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>274B - 零树</title>
</head>
<body>

  <h1>274B - 零树（Zero Tree）</h1>

  <p>时间限制：2 秒</p>
  <p>内存限制：256 MB</p>

  <h2>题目描述</h2>
  <p>树是一个有 <var>n</var> 个顶点和恰好 <var>n</var> − 1 条边的图。它满足：任意两个顶点之间恰好存在一条最短路径（按边数计算）。</p>
  <p>树 <var>T</var> 的子树是指：顶点集合和边集合分别都是 <var>T</var> 的顶点集合和边集合的子集，并且本身也是一棵树。</p>
  <p>给定一棵有 <var>n</var> 个顶点的树。顶点编号为 1 到 <var>n</var>。每个顶点上写有一个整数。初始时，第 <var>i</var> 个顶点上的整数为 <var>v</var><sub>i</sub>。</p>
  <p>一次操作如下：</p>
  <ul>
    <li>选择一棵包含顶点 1 的子树。</li>
    <li>把这棵子树中所有顶点上的整数同时加 1 或同时减 1。</li>
  </ul>
  <p>请计算：让树上所有顶点上的整数都变成 0，最少需要多少次操作。</p>

  <h2>输入格式</h2>
  <p>第一行包含一个整数 <var>n</var>（1 ≤ <var>n</var> ≤ 10<sup>5</sup>）。</p>
  <p>接下来 <var>n</var> − 1 行，每行包含两个整数 <var>a</var><sub>i</sub> 和 <var>b</var><sub>i</sub>（1 ≤ <var>a</var><sub>i</sub>, <var>b</var><sub>i</sub> ≤ <var>n</var>，<var>a</var><sub>i</sub> ≠ <var>b</var><sub>i</sub>），表示顶点 <var>a</var><sub>i</sub> 和 <var>b</var><sub>i</sub> 之间有一条边。保证输入图是一棵树。</p>
  <p>最后一行包含 <var>n</var> 个用空格分隔的整数 <var>v</var><sub>1</sub>, <var>v</var><sub>2</sub>, ..., <var>v</var><sub>n</sub>（|<var>v</var><sub>i</sub>| ≤ 10<sup>9</sup>）。</p>

  <h2>输出格式</h2>
  <p>输出一个整数，表示让所有整数变成 0 所需的最少操作次数。</p>
  <p>提示：请使用 64 位整数。</p>

  <h2>样例</h2>

  <h3>输入</h3>
  <pre><code>3
1 2
1 3
1 -1 1</code></pre>

  <h3>输出</h3>
  <pre><code>3</code></pre>

</body>
</html>


<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>161D - 树上距离</title>
</head>
<body>

  <h1>161D - 树上距离（Distance in Tree）</h1>

  <p>时间限制：3 秒</p>
  <p>内存限制：512 MB</p>

  <h2>题目描述</h2>
  <p>树是一个连通且不包含环的图。</p>
  <p>树中两个顶点之间的距离，是指连接这两个顶点的最短路径上的边数。</p>
  <p>给定一棵有 <var>n</var> 个顶点的树和一个正整数 <var>k</var>。请计算有多少对不同的顶点，它们之间的距离恰好为 <var>k</var>。</p>
  <p>注意，顶点对 (<var>v</var>, <var>u</var>) 和 (<var>u</var>, <var>v</var>) 被认为是同一对。</p>

  <h2>输入格式</h2>
  <p>第一行包含两个整数 <var>n</var> 和 <var>k</var>（1 ≤ <var>n</var> ≤ 50000，1 ≤ <var>k</var> ≤ 500），分别表示顶点数和要求的距离。</p>
  <p>接下来 <var>n</var> − 1 行描述边，每行格式为：“<var>a</var><sub>i</sub> <var>b</var><sub>i</sub>”（1 ≤ <var>a</var><sub>i</sub>, <var>b</var><sub>i</sub> ≤ <var>n</var>，<var>a</var><sub>i</sub> ≠ <var>b</var><sub>i</sub>），表示第 <var>i</var> 条边连接顶点 <var>a</var><sub>i</sub> 和 <var>b</var><sub>i</sub>。所有给出的边互不相同。</p>

  <h2>输出格式</h2>
  <p>输出一个整数，表示树中距离恰好为 <var>k</var> 的不同顶点对数量。</p>
  <p>提示：请使用 64 位整数。</p>

  <h2>样例 1</h2>

  <h3>输入</h3>
  <pre><code>5 2
1 2
2 3
3 4
2 5</code></pre>

  <h3>输出</h3>
  <pre><code>4</code></pre>

  <h2>样例 2</h2>

  <h3>输入</h3>
  <pre><code>5 3
1 2
2 3
3 4
4 5</code></pre>

  <h3>输出</h3>
  <pre><code>2</code></pre>

  <h2>说明</h2>
  <p>第一个样例中，距离为 2 的顶点对是：(1, 3)、(1, 5)、(3, 5)、(2, 4)。</p>

</body>
</html>


<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>DP P - 独立集</title>
</head>
<body>

  <h1>DP P - 独立集（Independent Set）</h1>

  <p>时间限制：2 秒</p>
  <p>内存限制：1024 MiB</p>
  <p>分值：100 分</p>

  <h2>题目描述</h2>
  <p>有一棵包含 <var>N</var> 个顶点的树，顶点编号为 1, 2, …, <var>N</var>。</p>
  <p>对于每个 <var>i</var>（1 ≤ <var>i</var> ≤ <var>N</var> − 1），第 <var>i</var> 条边连接顶点 <var>x</var><sub>i</sub> 和顶点 <var>y</var><sub>i</sub>。</p>
  <p>Taro 决定把每个顶点涂成白色或黑色。但是，不允许两个相邻的顶点都被涂成黑色。</p>
  <p>求一共有多少种合法的涂色方案，答案对 10<sup>9</sup> + 7 取模。</p>

  <h2>约束条件</h2>
  <ul>
    <li>输入中的所有值都是整数。</li>
    <li>1 ≤ <var>N</var> ≤ 10<sup>5</sup></li>
    <li>1 ≤ <var>x</var><sub>i</sub>, <var>y</var><sub>i</sub> ≤ <var>N</var></li>
    <li>给定的图是一棵树。</li>
  </ul>

  <h2>输入格式</h2>
  <p>输入从标准输入给出，格式如下：</p>
  <pre><code>N
x<sub>1</sub> y<sub>1</sub>
x<sub>2</sub> y<sub>2</sub>
:
x<sub>N−1</sub> y<sub>N−1</sub></code></pre>

  <h2>输出格式</h2>
  <p>输出合法涂色方案数对 10<sup>9</sup> + 7 取模后的结果。</p>

  <h2>样例输入 1</h2>
  <pre><code>3
1 2
2 3</code></pre>

  <h2>样例输出 1</h2>
  <pre><code>5</code></pre>

  <p>一共有 5 种合法涂色方案。</p>

  <h2>样例输入 2</h2>
  <pre><code>4
1 2
1 3
1 4</code></pre>

  <h2>样例输出 2</h2>
  <pre><code>9</code></pre>

  <p>一共有 9 种合法涂色方案。</p>

  <h2>样例输入 3</h2>
  <pre><code>1</code></pre>

  <h2>样例输出 3</h2>
  <pre><code>2</code></pre>

  <h2>样例输入 4</h2>
  <pre><code>10
8 5
10 8
6 5
1 5
4 8
2 10
3 6
9 2
1 7</code></pre>

  <h2>样例输出 4</h2>
  <pre><code>157</code></pre>

</body>
</html>



<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>B4016 树的直径</title>
</head>
<body>

    <h1>B4016 树的直径</h1>

    <h2>题目描述</h2>
    <p>给定一棵 $n$ 个结点的树，树没有边权。请求出树的直径是多少，即树上最长的不重复经过一个点的路径长度是多少。</p>

    <h2>输入格式</h2>
    <p>第一行输入一个正整数 $n$，表示结点个数。<br>
    第二行开始，往下一共 $n-1$ 行，每一行两个正整数 $(u,v)$，表示一条边。</p>

    <h2>输出格式</h2>
    <p>输出一行，表示树的直径是多少。</p>

    <h2>输入输出样例 #1</h2>
    
    <h3>输入 #1</h3>
    <pre>
```
5
1 2
2 4
4 5
2 3
```
</pre>

    <h3>输出 #1</h3>
    <pre>
```
3
```
</pre>

    <h2>说明/提示</h2>
    <p>数据保证，$1 \leq n \leq 10^5$。</p>

</body>
</html>


```cpp title="树的直径.cpp"

#include<bits/stdc++.h>
using namespace std;

#define endl "\n"

const int N = 1e5 + 10;
const int M = 2 * N;
int h[N], nxt[M], t[M], cnt;
int re = 0;
int f[N];
void add(int a, int b){
	t[cnt] = b;
	nxt[cnt] = h[a];
	h[a] = cnt ++;
} 

void dfs(int u, int fa){
	int d1 = 0, d2 = 0; 
	for (int i = h[u]; i != -1; i = nxt[i]){
		int v = t[i];
		if (v == fa)continue;
		dfs(v, u);
		int d = f[v] + 1;
		f[u] = max(f[u], d);
		if (d >= d1){
			d2 = d1;
			d1 = d;
		}else if(d > d2){
			d2 = d;
		}
		re = max(re, d1 + d2);
	}
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);	
	int n;
	cin >> n;
	cnt = 0;
	memset(h, -1, sizeof(h));
	for (int i = 1; i < n; i++){
		int a, b;
		cin >> a >> b;
		add(a, b);
		add(b, a);
	}
	dfs(1, 0);
	cout << re << endl;
	return 0;
}
```



<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>1073. 树的中心</title>
</head>
<body>

    <header>
        <h1>1073. 树的中心</h1>
    </header>

    <main>
        <section>
            <h2>题目描述</h2>
            <p>给定一棵树，树中包含 <code>n</code> 个节点（编号为 <code>1</code> 到 <code>n</code>）和 <code>n - 1</code> 条无向边，每条边都有一个权值。</p>
            <p>请你在树中找到一个节点，使得该节点到树中其他节点的最远距离尽可能小。</p>
        </section>

        <section>
            <h2>输入格式</h2>
            <p>第一行包含一个整数 <code>n</code>。</p>
            <p>接下来的 <code>n - 1</code> 行，每行包含三个整数 <code>ai</code>、<code>bi</code> 和 <code>ci</code>，表示节点 <code>ai</code> 和节点 <code>bi</code> 之间存在一条权值为 <code>ci</code> 的边。</p>
        </section>

        <section>
            <h2>输出格式</h2>
            <p>输出一个整数，表示所求节点到树中其他节点的最远距离。</p>
        </section>

        <section>
            <h2>数据范围</h2>
            <ul>
                <li><code>1 ≤ n ≤ 10000</code></li>
                <li><code>1 ≤ ai, bi ≤ n</code></li>
            </ul>

            <p>输入样例：</p>
            <pre>
```
5
2 1 1
3 2 1
4 3 1
5 1 1
```
            </pre>
            <p>输出样例：</p>
            <pre>
```
2
```
</pre>
        </section>
    </main>

</body>
</html>

```cpp title="树的中心.cpp"
#include<bits/stdc++.h>
using namespace std;

typedef long long ll;
#define endl "\n" 
const int N = 1e5 + 10;
const int M = 2 * N;
int h[N], nxt[M], t[M], w[M], cnt;
void add(int a, int b, int c){
	t[cnt] = b;
	w[cnt] = c;
	nxt[cnt] = h[a];
	h[a] = cnt ++;
}
ll d1[N], d2[N];
int son[N];
ll up[N]; 
void dfs(int u, int fa){
	for (int i = h[u]; i != -1; i = nxt[i]){		
		int v = t[i];
		if (v == fa)continue;
		dfs(v, u);	
		ll d = d1[v] + w[i];
		if (d > d1[u]){
			d2[u] = d1[u];
			d1[u] = d;
			son[u] = v;
		}else if(d > d2[u]){
			d2[u] = d;
		}
	}
}
void dfs_up(int u, int fa){
	for (int i = h[u]; i != -1; i = nxt[i]){
		int v = t[i];
		if (v == fa)continue;
		if (son[u] == v){
			up[v] = max(up[u], d2[u]) + w[i];
		}else {
			up[v] = max(up[u], d1[u]) + w[i];
		}
		dfs_up(v, u);
	}
}
int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	cnt = 0;
	memset(h, -1, sizeof(h));
	int n;
	cin >> n;
	for (int i = 1; i < n; i++){
		int a, b, c;
		cin >> a >> b >> c;
		add(a, b, c);
		add(b, a, c);		
	}
	dfs(1, 0);
	up[1] = 0;
	dfs_up(1, 0);
	ll re = 1e18;
	for (int i = 1; i <= n; i++){
		re = min(re, max(d1[i], up[i]));
	}
	cout << re << endl;
	
	return 0;
}

```