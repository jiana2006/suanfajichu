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
