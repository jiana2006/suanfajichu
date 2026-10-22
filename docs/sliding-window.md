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

<h2>切蛋糕</h2>
今天是大肥鱼的生日，梁圣给她准备了一个方形蛋糕，蛋糕被不同颜色分成了相同的n块，每个颜色代表不同的数字<br>
大肥鱼希望自己吃到的数字和最大。但是大肥鱼最多只能吃m块蛋糕。问大肥鱼连续吃蛋糕的最大数字和。

<div style="text-align:center;">
<img src="../assets/gif/大肥鱼2.jpg" style="width:280px; max-width:100%;" alt="大肥鱼2表情包"></div>

其实这道题应该用队列来解决。
但是暴力窗口可以得部分分。因为数据量太大了所以不能用暴力窗口。
但是我觉得暴力窗口可以练一下。

```cpp title="切蛋糕.cpp"
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	int n , m; 
	cin >> n >> m;
	vector<ll>nums(n+1,0);
	for (int i =1 ; i <= n ;i++)
	{
		int a;
		cin >>a ;
		nums[i] = nums[i-1] + a;
	}
	
	ll res = -1e18;
	for (int i = 1 ;i<= n;i++){
		for (int j = max(0, i-m); j < i; j++){ 
			ll re = nums[i] - nums[j];
			res = max(re, res);
		}
	}
	cout << res << "\n";
	return 0;
}
```
这个就比较好理解了。<br>
我们利用前缀和来求区间最大值。第一个for循环是我们假设窗口大小固定去找区间最大值。<br>
第二个循环就是窗口有1-m个去暴力枚举。<br>
我们用res来记录区间最大值。<br>

下面写一下正确的解法。

```cpp title="切蛋糕.cpp"
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

const int MAXN = 500005;
ll nums[MAXN]; // 前缀和数组
int q[MAXN];   // 单调队列，存的是前缀和数组的【下标】

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);

    int n, m;
    cin >> n >> m;

    // 预处理前缀和
    for (int i = 1; i <= n; i++) {
        ll a;
        cin >> a;
        nums[i] = nums[i - 1] + a;
    }

    ll ans = -1e18; // 初始答案设为极小值，防止全负数
    int head = 1, tail = 0; // 队列头、尾指针

    q[++tail] = 0; // 把下标 0（前缀和为 0）加入队列

    for (int i = 1; i <= n; i++) {
        // 1. 判断队头是否过期（长度不能超过 m）
        if (head <= tail && i - q[head] > m) {
            head++;
        }

        // 2. 此时队头就是合法范围内最小的前缀和，更新答案
        ans = max(ans, nums[i] - nums[q[head]]);

        // 3. 维护队列的单调性（单调递增）
        while (head <= tail && nums[q[tail]] >= nums[i]) {
            tail--;
        }

        // 4. 将当前下标加入队尾
        q[++tail] = i;
    }

    cout << ans << "\n";
    return 0;
}
```
