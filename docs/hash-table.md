<h1>哈希表：</h1>
<p>用到了map容器。</p>
<h2>报名比赛：</h2>
<p>现在有n支队伍打算报名比赛，其中第i支队伍会在V<sub>i</sub>秒报名。</p><br>
<p>对于所有正整数s：
<br>
若在第s秒时访问报名网页的队伍数量不超过x；则所有在第 s 秒时访问报名网页的队伍报名成功。
<br>
否则，报名网页会因为太多队伍访问而在这一秒崩溃，所有在第 s 秒时访问报名网页的队伍报名失败。<br>
输出报名成功的队伍数量。
<br>

```cpp title="报名比赛.cpp"
#include<bits/stdc++.h>
using namespace std;

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	int t;
	cin >> t;
	while (t--){
		int n , x;
		cin >> n >> x;
		vector<int>nums(n,0);
		
		for (int i = 0 ; i < n ; i++ ){
			cin >> nums[i];	
			}
			map<int,int>cnt;
			for (auto & v:nums){
				cnt[v]++;
			}
		int re = n;
		for (auto & p : cnt){
			if (p.second > x){
				re -= p.second;
			}
		}
			
		cout << re <<endl;
	}
	return 0;
}
```
这道题我想的是用map容器来记录每个时间点的队伍数量，然后遍历map容器，如果队伍数量大于x，就减去队伍数量。<br>
最后输出报名成功的队伍数量。
<br>