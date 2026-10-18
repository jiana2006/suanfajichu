<h1>滑动窗口</h1>
滑动窗口是一种常用的算法，用于解决区间问题。
其本质是利用两个指针维护一个区间，
并根据区间内的元素进行判断。

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
    int target;
    cin >> target;
    vector<int>nums;
    int n;
    cin >> n;
    while (n--){
        int x;
        cin >> x;
        nums.push_back(x);
    }
    int l = 0;
    int s = 0;
    int ans = 1e9;
    for (int r = 0; r < n; r++){
        s += nums[r];
        while (s >= target){
           if (r - l + 1 < ans){
                ans = r - l + 1;
           }
            s -= nums[l++];
            l++;
        }
    }
    if(ans==1e9){
        cout << 0 << endl;
    }else{
    cout << ans << endl;
    }
    return 0;
}

```