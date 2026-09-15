回溯算法
- 回溯算法是一种试错法，它尝试所有可能的解决方案，直到找到一个解决方案。
- 回溯算法通常用于解决组合问题，例如排列、组合、解数独等。
- 回溯算法的基本思想是尝试所有可能的解决方案，直到找到一个解决方案。

<h1 style="\\\*\\\*font-weight:bold; color:#222;\\\*\\\*">势均力敌:</h1>

给你一个数n;随后输入n个数，这n个数最多可以组成n!种排列。

要求你将他们分成两队，每队平方和相等。
```
2=<n<=4
```
我一看就只有3种情况就直接写了。

```cpp linenums="1" title="势均力敌.cpp"
#include<bits/stdc++.h>
using namespace std;

int main(){
	int n;
	cin>>n;
	vector<int>nums(n);
	for(int i=0;i<n;i++){
		cin>>nums[i];
	} 
	sort(nums.begin(),nums.end());
	if(n==2){
		cout<<nums[1]*10+nums[0]<<endl;
	}
	if(n==3){
		cout<<nums[0]*100+nums[1]*10+nums[2]<<endl;
		cout<<nums[1]*100+nums[2]*10+nums[0]<<endl;
		cout<<nums[2]*100+nums[0]*10+nums[1]<<endl; 
	}
	if(n==4){
		cout<<nums[0]*1000+nums[1]*100+nums[2]*10+nums[3]<<endl; 
		cout<<nums[0]*1000+nums[2]*100+nums[3]*10+nums[1]<<endl;
		cout<<nums[0]*1000+nums[3]*100+nums[1]*10+nums[2]<<endl;
		cout<<nums[1]*1000+nums[0]*100+nums[3]*10+nums[2]<<endl;
		cout<<nums[1]*1000+nums[2]*100+nums[0]*10+nums[3]<<endl;
		cout<<nums[1]*1000+nums[3]*100+nums[2]*10+nums[0]<<endl;
		cout<<nums[2]*1000+nums[0]*100+nums[3]*10+nums[1]<<endl;
		cout<<nums[2]*1000+nums[1]*100+nums[0]*10+nums[3]<<endl;
		cout<<nums[2]*1000+nums[3]*100+nums[1]*10+nums[0]<<endl;
		cout<<nums[3]*1000+nums[0]*100+nums[1]*10+nums[2]<<endl;
		cout<<nums[3]*1000+nums[1]*100+nums[2]*10+nums[0]<<endl;
		cout<<nums[3]*1000+nums[2]*100+nums[0]*10+nums[1]<<endl;
	}
	return 0;	
}
```