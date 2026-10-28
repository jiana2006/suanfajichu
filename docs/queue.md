<h1>队列</h1>
<h2>单调队列</h2>
<p>队列（queue）先进先出的数据结构。队列在尾部添加元素，在头部删除元素。

我们先来了解一下队列的基本操作：<br>
push():在队列尾部插入元素<br>
pop():从队列头部删除元素<br>
front():队头元素<br>
back():队尾元素<br>
empty():检查队列是否为空<br>
size():队列大小<br>
clear():清空队列<br>
</p>

创建队列：
```
queue<int>q;
```
 入队：
使用push()函数将元素添加到队列尾部
```
 q.push(1);
```
出队：
使用pop()函数从队列头部删除元素
```
q.pop();
```
访问队列头部元素：
使用front()函数访问队列头部元素
```
int frontElement =q.front();
cout<<frontElement<<endl;
或者
cout<<q.front()<<endl;
```
访问队尾元素：
使用back()函数访问队列尾部元素
```
int backElement =q.back();
cout<<backElement<<endl;
或者
cout<<q.back()<<endl;
```
检查队列是否为空：
使用empty()函数检查队列是否为空
```
if(q.empty()){
    cout<<"队列为空"<<endl;
}
或者
int size =q.size();
```
queue和stack一样都不允许遍历

但是同理都是可以手写遍历的
```
int q[N];
int qh,qt;//qh队头，qt队尾
qh=1,qt=0;//[qh,qt]为有效区间
q[qt++]=x;//入队
qh++;//出队
qt-qh+1;//队列大小
```
<h2>双向队列</h2>
以上的是一个单向的队列，如果要实现双向队列，我们就要用到双向队列deque
它在队头和队尾都可以插入和删除元素。还支持随机访问队列中的元素。

deque是double-ended queue的缩写，即双端队列。也是queue的升级版

创建双向队列：
```
deque<int>dq;
```
入队（在队头插入x）：
```
dq.push_front(x);
```
入队（在队尾插入x）：
```
dq.push_back(x);
```
出队（在队头删除x）：
```
dq.pop_front();
```
出队（在队尾删除x）：
```
dq.pop_back();
```
获取队头元素：
```
dq.front();
```
获取队尾元素：
```
dq.back();
```
获取队列大小：
```
dq.size();
```
获取队列是否为空：
```
dq.empty();
```
弹出队头元素：
```
dq.pop_front();
```
弹出队尾元素：
```
dq.pop_back();
```
deque的遍历：
```
1.用迭代器遍历deque
for(auto it=dq.begin();it!=dq.end();it++){
    cout<<*it<<endl;
}
2.用for循环遍历deque
for(int i=0;i<dq.size();i++){
    cout<<dq[i]<<endl;
}
```

<h2>优先队列</h2>
优先队列（priority queue）是一种特殊的队列，它的元素按照优先级进行排序。优先级最高的元素先出队。
对头的元素都是当前队列中优先级最高的元素。<br>

stl中的priority_queue默认是大根堆。（即优先级最高的元素先出队。
<b>优先队列仅维护堆顶元素，其他元素的优先级都小于堆顶元素。</b>
我们依旧是先学习他的基本操作：
```
pq.push(x); // 入队
pq.pop(); // 出队
pq.top(); // 访问队头元素
pq.size(); // 获取队列大小
pq.empty(); // 检查队列是否为空
pq.clear(); // 清空队列
```

下面我们重点介绍一下小根堆。
```
greater<int> pq;
priority_queue<int,vector<int>,greater<int>> pq;//小根堆
```

下面我们写一题经典的队列题
<h2>约瑟夫问题</h2>
<p>n个人围成一圈，从第m个人开始，每次报到m的倍数的人出列，最后留下的人就是约瑟夫问题的解。	</p>

```cpp title="约瑟夫问题"
#include <bits/stdc++.h>
using namespace std;

int main() {
	ios::sync_with_stdio(0);
	cin.tie(0);
	int n , m; 
	cin >> n >> m;
	queue<int> q;
	for (int i = 1 ;i <= n ;i++)
	q.push(i);
	while (q.size()>1){
		for (int i = 1 ; i < m ;i++){
			q.push(q.front());
			q.pop();
		}
		q.pop();
	}
	cout<<q.front();
	return 0;	
} 
```
我来解释一下，我们每次都将不是m的元素先复制到队尾，然后出队，等到到了m元素时，就出队。完成一次外部循环和一整个内部循环，后内循环结束，将为m的元素出队。

<h2>有限的内存</h2>
现在有n个内存相同的文件需要下载到电脑上，电脑的内存只有m，如果后遇到相的文件电脑里有，就直接跳过。当内存满了的时候，就从内存中删除最早下载的文件。问需要进行多少次下载才能完成所有操作。

输入:
```
3 7

1 2 1 5 4 4 1
```
输出:
```
5
```

<div style="text-align:center;">
<img src="../assets/gif/蓝色大肥鱼3.jpg" style="width:280px; max-width:100%;" alt="蓝色大肥鱼3表情包"></div>

```cpp title="有限的内存"
#include <bits/stdc++.h>
using namespace std;

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	int m , n ;
	cin >> m >> n ;
	queue<int>q;
	bool vis[1005] = {false};
	int re = 0;
	for (int i = 0 ;i < n ;i++){
		int c;
		cin >> c;
		if(vis[c])continue;		
		re ++;
		if(q.size() == m){
			vis[q.front()]=false;
			q.pop();
		}
		vis[c] = true;
		q.push(c);
	}
	cout << re ;
	return 0;
} 
```
这个我们可以模拟他的过程嘛，最开始我们肯定是需要判断是否有相同的文件，如果有，就直接跳过。如果没有，就将文件入队，于是我们想着给入队的文件标记为已访问。如果有与已访问的文件相同，就直接跳过。没有我们就让他入队。然后给他打上标记，当内存也就是队满了的时候我们需要将标记去掉（不然后面有与之前入过队相同的元素时他是被标记的，但是电脑里没有这个文件就会漏掉这个文件）。

##收手吧钾钠
 钾钠最近沉迷于抽奖无法自拔，现在有一个长度为n的数组a，数组的每个元素表示一个抽奖的结果。钾钠会选择开始的时候先抽k个，此后每次再抽一个，钾钠想统计每次k个抽奖的结果中，最小和最大的结果。请帮助钾钠实现这个功能。

```text
窗口位置	   			最小值	最大值
[4 −2 2] 0 −5 1 8 3		−2		4
4 [−2 2 0] −5 1 8 3		−2		2
4 −2 [2 0 −5] 1 8 3		−5		2
4 −2 2 [0 −5 1] 8 3		−5		1
4 −2 2 0 [−5 1 8] 3		−5		8
4 −2 2 0 −5 [1 8 3]		 1		8
```

这道题我本来是直接用暴力窗口写的但是时间复杂度太高了，有部分样例超时了。
```cpp title="收手吧钾钠(暴力窗口)"
#include<bits/stdc++.h>
using namespace std;

int main(){
    ios::sync_with_stdio(0);
    cin.tie(0);

    int n, k;
    cin >> n >> k;

    vector<int> a(n);
    for(int i = 0; i < n; i++) cin >> a[i];

    int m = n - k + 1;         
    vector<int> mn(m), mx(m);

    for(int i = 0; i < m; i++){
        int minn = INT_MAX;
        int maxn = INT_MIN;
        for(int j = i; j < i + k; j++){
            minn = min(minn, a[j]);
            maxn = max(maxn, a[j]);
        }
        mn[i] = minn;
        mx[i] = maxn;
    }

    for(int i = 0; i < m; i++) cout << mn[i] << " \n"[i == m-1];
    for(int i = 0; i < m; i++) cout << mx[i] << " \n"[i == m-1];

    return 0;
}
```

```cpp title="收手吧钾钠(队列)"
#include<bits/stdc++.h>
using namespace std;

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	int n , k ;
	cin >> n >> k;
	vector<int>a(n,0);
	
	for (int i = 0 ; i < n ;i++){
		cin >> a[i];	
	}
	deque<int> q;
	for (int i = 0 ; i <  n;i++){
		while(!q.empty() && q.front()<=i - k){
			q.pop_front();
		}
		while(!q.empty() && a[q.back()]>=a[i]){
			q.pop_back();
		}
		q.push_back(i);
		if (i>=k-1){
			cout<< a[q.front()];
			if (i!=n - 1)cout<< " ";
		}
	}
	cout <<endl;
	q.clear();
	for (int i = 0 ; i < n ;i++){
		while (!q.empty() && a[q.back()] <= a[i]){
			q.pop_back();
		}
		q.push_back(i);
		if (i >= k - 1){
			cout << a[q.front()];
			if (i!=n-1)cout<<" ";
		}
	}
	return 0;
}
```
下面我们练习一下deque

还是之前那道题：
<h2>有限的内存</h2>
现在有n个内存相同的文件需要下载到电脑上，电脑的内存只有m，如果后遇到相的文件电脑里有，就直接跳过。当内存满了的时候，就从内存中删除最早下载的文件。问需要进行多少次下载才能完成所有操作。

我们现在换一种写法，用deque来实现。
```cpp title="有限的内存(deque)"
#include<bits/stdc++.h>
using namespace std;
bool vis[1005];
int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	int m , n ;
	cin >> m >> n ;
	deque<int> dq;
	int ans = 0 ;
	for (int i = 0 ; i < n ; i++){
		int a;
		cin >> a;
		if (vis[a])continue;
		ans++;
		if ((int)dq.size() == m)
		{
			vis[dq.front()] = false ;
			dq.pop_front();
		}
		dq.push_back(a);
		vis[a] = true;
	}
	cout << ans ;
	return 0;
}
```

下面我们写一下优先队列的题：
<h2>合并咕嘎</h2>
有n只臭企鹅，每只臭企鹅的重量不同。每次可以合并两只臭企鹅，合并为一个得到的臭企鹅的重量为这两只臭企鹅的重量。每次消耗的体力为这两只臭企鹅的重量的和。求合并成最后一只臭企鹅的最小总体力。
输入样例：
```
3
1 2 9
```
输出 ：
```
15
```
<div style="text-align:center;">
<img src="../assets/gif/臭企鹅.jpg" style="width:280px; max-width:100%;" alt="臭企鹅表情包"></div>

```cpp title="合并咕嘎(优先队列)"
#include <bits/stdc++.h>
using namespace std;

int main(){
    int n; cin >> n;
    priority_queue<int, vector<int>, greater<int>> pq;  // 小根堆
    for(int i = 0; i < n; i++){
        int x; cin >> x;
        pq.push(x);
    }

    long long ans = 0;
    while(pq.size() > 1){
        int a = pq.top(); pq.pop();   // 最小
        int b = pq.top(); pq.pop();   // 次小
        ans += a + b;
        pq.push(a + b);               // 合并结果放回去
    }
    cout << ans << '\n';
}
```