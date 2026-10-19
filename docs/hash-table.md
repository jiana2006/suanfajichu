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

下面我们看一道用unordered_map容器的题。

https://leetcode.cn/problems/roman-to-integer/description/?envType=problem-list-v2&envId=hash-table

```cpp title="罗马数字转整数.cpp"
#include<bits/stdc++.h>
using namespace std;

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	 unordered_map<char, int> mp = {
        {'I', 1}, {'V', 5}, {'X', 10}, 
        {'L', 50}, {'C', 100}, {'D', 500}, {'M', 1000}
    };
	string s;
	cin >> s;
	int n = s.length();
	int re= 0;
	for (int i = 0 ;i <n ;i++){
		
		if (i < n-1 && mp[s[i]]<mp[s[i+1]]){
			re -=mp[s[i]];
		}else{
			re+=mp[s[i]];
		}
	}
	cout<<re<<endl;
	return 0;
}
```

这个就比较好理解了。

下面我们来看他的进阶版：
https://leetcode.cn/problems/integer-to-roman/?envType=problem-list-v2&envId=hash-table
```cpp title="整数转罗马数字.cpp"
#include<bits/stdc++.h>
using namespace std;

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	int n ;
	cin >> n ;
 unordered_map<int, string> mp = {
        {1000, "M"}, {900, "CM"}, {500, "D"}, {400, "CD"},
        {100, "C"},  {90, "XC"},  {50, "L"},  {40, "XL"},
        {10, "X"},   {9, "IX"},   {5, "V"},   {4, "IV"}, {1, "I"}
    };
    int v[13] = {1000,900,500,400,100,90,50,40,10,9,5,4,1};
    string ans = "";
    for (int i = 0 ;i <13;i++){
    	while(n>=v[i]){
    		ans+=mp[v[i]];
    		n-=v[i];
		}
	}
	cout << ans<<endl;
	return 0;
}
```
这个多写了v数组，是因为我们需要从大到小的顺序来减去整数。但是unordered_map容器是无序的，所以我们需要用v数组来强制顺序。