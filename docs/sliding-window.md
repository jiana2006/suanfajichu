<h1>滑动窗口</h1>
滑动窗口是一种常用的算法，用于解决区间问题。
其本质是利用两个指针维护一个区间，
并根据区间内的元素进行判断。

滑动窗口的核心就是快慢指针。

<b>滑动窗口的精髓在于:右指针无脑扩张，左指针见好就收。</b>

我们写一个滑动窗口模板

```
//外层循环扩展右边界，内层循环扩展左边界
for (int l = 0, r = 0 ; r < n ; r++) {
	//当前考虑的元素
	while (l <= r && check()) {//区间[left,right]不符合题意
        //扩展左边界
    }
    //区间[left,right]符合题意，统计相关信息
}
```
这里我们写一题滑动窗口的题目：

<h2>无重复的最长子串</h2>
给定一个字符串s，求s中最长的无重复子串的长度。

```cpp title="无重复的最长子串.cpp"
#include<bits/stdc++.h>
using namespace std;

int main(){
	string s;
	cin >> s;
	vector<int>cnt(256,0);
	int l = 0;
	int ans = 0;
	int r = 0;
	for (auto & c : s){
		cnt[c]++;
		r++;
		while (cnt[c]>1){
			cnt[s[l]]--;
			l++;
		}
		ans = max(ans,r-l);	
	}
	cout << ans;
	return 0;
}
```

<p>这里我们遍历字符串s，如果当前字符c在区间[left,right]中没出现过，
我们扩展右边界，并将字符c加入区间。
如果当前字符c在区间[left,right]中出现过，
我们扩展左边界，并将字符s[l]从区间中移除。
这里面的cnt[c]++是统计字符c在区间[left,right]中出现的次数。
cnt[s[l]]--也是统计字符s[l]在区间[left,right]中出现的次数。
l++是将左边界向右移动，l(left)
r++是将右边界向右移动。r(right)
</p>

<h2>长度最小的子数组</h2>
给一个目标值target，
和一个数组nums，nums的大小为n，
求nums中长度最小的子数组，
其和大于等于target。
如果不存在，返回0。

```cpp title="长度最小的子数组.cpp"
#include<bits/stdc++.h>
using namespace std;

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	int target , n; 
	
	cin  >>target >> n;	 
	vector<int>nums(n);
	for(int i = 0 ; i< n ; i++){
		cin>>nums[i];
	}
	int l = 0;
	int r= 0;
	int shu = 0;
	int re = 1e8;
    while(r<n){
        shu += nums[r]; 
        r++;
    
        while(shu >= target){
          if(r-l<re){
               re = r-l;
         }
            shu -=nums[l];
            l++;
     }
    }
    if(re==1e8){
        re = 0;
    }
	cout << re;
	return 0;
}
    
```
我写的就比较简单大家应该是都能理解的。

上面的两道题是动态的滑动窗口。下面我们写一题静态的滑动窗口。

<h2>重复的DNA序列</h2>

<p>DNA序列 由一系列核苷酸组成，缩写为 'A', 'C', 'G' 和 'T'.。</p>

<p>例如，"ACGAATTCCG" 是一个 DNA序列 。
在研究 DNA 时，识别 DNA 中的重复序列非常有用。</p>

<p>给定一个表示 DNA序列 的字符串 s ，返回所有在 DNA 分子中出现不止一次的 长度为 10 的序列(子字符串)。你可以按 任意顺序 返回答案。</p>

```cpp title="重复的DNA序列.cpp"
#include<bits/stdc++.h>
using namespace std;

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	string s;
	cin >> s;
	int n = s.length();
	const int l =10;
	vector<string>ans;
	unordered_map<string,int>cnt;
	for (int i = 0 ;i <= n ;i++){
		string sub = s.substr(i,l);
		if (cnt[sub]++==1){
			ans.push_back(sub);
		}
	} 
	for (int i =0 ; i< ans.size();i++){
		cout<<ans[i]<< " ";
	}
	cout << endl;
	return 0;
}
```
这个窗口是静态的因为我们将它的大小固定为10，每次截取10个字符。
我们用一个unordered_map来统计每个字符的出现次数。
如果字符的出现次数为1，
我们将其加入答案。
