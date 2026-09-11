排序
这个有很多方法但是我目前用的最多的是sort排序。

sort排序最大的优势就是他是C++内置的函数可以直接使用，别人还在写排序的框架我们用sort就已经排好序了。

sort排序必须依赖于容器这里不同的容器有不同的写法；

先来一个问题：给定n个整数，求它们的排序。

在此之前我忘了一些事情那就是头文件bits/stdc++.h这个头文件包含了大部分的头文件，是竞赛中常用的一个头文件。

在main函数里面可能会看到这样的代码：

ios::sync_with_stdio(0);这个是关闭同步流，使输入输出更快。

cin.tie(0);这个是关闭cin的同步流，使输入更快更快。

cout.tie(0);这个是关闭cout的同步流，使输出更快更快。

其实`cin.tie(0)`和`cout.tie(0)`作用一样，写一个即可。

```cpp linenums="1" title="IO加速示例.cpp"
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main()
{
    ios::sync_with_stdio(0);
     cin.tie(0);
    int n;
    cin >> n;
    vector<int> a(n);
    for(int i = 0; i < n; i++)
    {
        cin >> a[i];
    }
    sort(a.begin(), a.end());
    for(int i = 0; i < n; i++)
    {
        cout << a[i] << '\n';
    }
    return 0;
}
```
这里sort默认是升序排序的。即从小到大排序。

如果要降序排序，需要在sort函数里面添加一个参数，即greater<int>()。  

也就是sort(a.begin(),a.end(),greater<int>());

这行代码的含义是：对a的元素进行降序排序。即从大到小排序。


如果你学过c语言，那么你一定知道冒泡排序和选择排序以及插入排序。

但是这些排序的复杂度都是O(n^2)，。这些排序不常用。

而sort排序的复杂度是O(nlogn)，。

下面我介绍一下快速排序和桶排序。

快速排序正如他的名字效率比较快。所以他被广泛应用于竞赛中。

快速排序：

快速排序是一种分治算法。

快速排序的基本思想是：

将一个数组分成两个子数组，一个子数组的所有元素都小于等于另一个子数组的所有元素。

然后递归地对这两个子数组进行排序。

举个例子；
```
[5][7][2][8][1][9][6][4][0][3]
```
现在我们要将这个数组排序。

首先我们随便取出一个元素，比如5。记作m

然后将比m小的元素放到一个子数组里，大于等于m的元素放到另一个子数组里。

```
[2][1][0][3]
[7][8][9][6]
```
然后递归地对这两个子数组进行排序。

也就是快速排序就三步走。
1. 选择一个元素m。

2. 将比m小的元素放到一个子数组里，大于等于m的元素放到另一个子数组里。

3. 递归地对这两个子数组进行排序。

我们先来一个简单的快速排序的代码实现。

代码实现如下：

```cpp title="快速排序.cpp"
#include <iostream>
#include <vector>
using namespace std;

vector<int> quick_sort(vector<int> nums)
{
    if (nums.size() <= 1)
        return nums;
    int mid = nums[0];

    vector<int> left, right;
    for (int i = 1; i < nums.size(); i++)
    {
        if (nums[i] < mid)
            left.push_back(nums[i]);
        else
            right.push_back(nums[i]);
    }
    vector<int> res = quick_sort(left);
    res.push_back(mid);
    vector<int> right_res = quick_sort(right);
    res.insert(res.end(), right_res.begin(), right_res.end());

    return res;
}

int main()
{
    vector<int> a = {3,1,4,1,5,9,2,6};
    vector<int> ans = quick_sort(a);

    for (int x : ans)
        cout << x << " ";
    return 0;
}
```
这个是Haskell的快速排序的代码实现。这个不带指针的版本。

虽然没有快速排序那么高效，但是他的代码实现简单。

好，我们来看一下真正的快速排序的代码实现。

```cpp title="快速排序.cpp"
#include<bits/stdc++.h>
using namespace std;
void quick_sort(int *a, int *b)
{
    if (b - a <= 1) return; 
    int *pivot = a;       
    int *left = a;
    int *right = b - 1;
    int val = *pivot;

    while(left < right)
    {
        while(left < right && *right >= val) right--;
        *left = *right;
        while(left < right && *left < val) left++;
        *right = *left;
    }
    *left = val; 
    quick_sort(a, left);
    quick_sort(left + 1, b);
}

int main()
{
    int arr[] = {3,1,4,1,5,9,2,6};
    int n = sizeof(arr)/sizeof(arr[0]);

    quick_sort(arr, arr + n);

    for(int i = 0; i < n; i++)
    {
        cout << arr[i] << " ";
    }
    return 0;
}
```