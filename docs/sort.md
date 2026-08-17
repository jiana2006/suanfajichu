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

其实cin.tie(0)和cout.tie(0)作用一样，写一个即可。

include<bits/stdc++.h>

using namespace std;

int main(){

    ios::sync_with_stdio(0);

    cin.tie(0);

    cout.tie(0);

    int n;

    cin>>n;

    vector<int> a(n);

    for(int i=0;i<n;i++){

        cin>>a[i];

    }
    sort(a.begin(),a.end());

    for(int i=0;i<n;i++){

        cout<<a[i]<<endl;

    }

    return 0;

}

这里sort默认是升序排序的。即从小到大排序。
如果要降序排序，需要在sort函数里面添加一个参数，即greater<int>()。  
也就是sort(a.begin(),a.end(),greater<int>());
这行代码的含义是：对a的元素进行降序排序。即从大到小排序。

如果要对a的元素进行升序排序，需要在sort函数里面添加一个参数，即less<int>()。  
也就是sort(a.begin(),a.end(),less<int>());
这行代码的含义是：对a的元素进行升序排序。