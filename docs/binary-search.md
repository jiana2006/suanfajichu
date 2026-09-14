<h1 style="\\\*\\\*font-weight:bold; color:#222;\\\*\\\*">二分查找：</h1>

正如他的名字所示，二分查找是一种在有序数组中查找元素的算法。
它的工作原理是：
弄两个指针，一个指向数组的开头，一个指向数组的结尾。
一般都是用left和right表示。

二分查找的核心就是指针的移动。

<h1 style="\\\*\\\*font-weight:bold; color:#222;\\\*\\\*">搜索插入位置：</h1>

给定一个排序数组和一个目标值，在数组中找到目标值并返回它的索引。

如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

请务必用时间复杂度为O(logn)的算法实现。

```cpp linenums="1" title="搜索插入位置.cpp"
#include<bits/stdc++.h>
using namespace std;
int main(){
	int n;
	cin>>n;
	vector<int>v(n);
	for(int i=0;i<n;i++){
		cin>>v[i];
	}
	int m;
	cin>>m;
	int left=0;
	int right=n-1;
	while(left<=right){
		int mid=(left+right)/2;
		if(v[mid]==m){
		cout<< mid;	
		break;
		}
		if(v[mid]>m){
			right=mid-1;
		}else if(v[mid]<m){
			left=mid+1;
		}
	}
	cout<<left;
	return 0;
	
} 
```
这里面如果没有找到目标值，那么left就会指向目标值应该插入的位置。

因为我们循环的条件是left<=right，所以当left大于right时，left就会指向目标值应该插入的位置。