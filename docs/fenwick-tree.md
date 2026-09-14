<h1 style="\\\*\\\*font-weight:bold; color:#222;\\\*\\\*">树状数组</h1>

树状数组表面带着树但是和数据结构里面的树是不同的。

树状数组在处理数组数据时，效率是很高的。O(logn)

之所以叫他为树状数组，是因为他处理数据的方式类似于树状结构。

这里我来演示一下：

数组nums长度为16,nums={8,6,1,4,5,5,1,1,3,2,1,4,9,0,7,4};
我们想给定两个数a,b求a到b下标的和。如果我们使用前缀和去求，需要O(n)的时间复杂度。

这里我们就会想到如果将数组的数量减少一半循环遍历就少了一半效率是不是就提高了；
没错树状数组就利用了这个思想。
```
                      61

           31                     30

     19          12          10         20

 14     5    10      2     5      5     9     11  

8  6   1  4  5  5   1  1  3  2   1  4  9  0  7  4

```
我们这样一层一层的两两合并，就得到了树状数组。
比如说我们想求1-15的和
就只需要求31+10+9+7即可从原来的求15次循环减少到4次。

但是这还是有些复杂，我们观察到在这个树状数组图中，存在很多的数据我们求了但是我们不需要。
比如说下面第二行的5，
在我们计算前两个数的和时，我们用不到。
在计算前三个数的和时，我们用不到。
而在计算前四个前五个数的和时，我们用上面的19更合适。
因此这个数字没必要去使用。
像这样的数字还有很多所有层的第偶数个数字都是没用的，即使去掉也不影响计算。

去掉后：
```
             61

         31   

     19              10          

  14     10       5       9

8   1   5   1   3   1   9   7
```
观察剩下的数据，我们可以发现，剩下的数据整好有16个和原来的nums的长度是一样的
我们将这些数弄到一个新数组中。
nums2={8,14,1,19,5,10,1,31,3,5,1,10,9,9,7,61};
<div style="text-align:center;">
<img src="../assets/gif/树状数组.jpg" style="width:280px; max-width:100%;" alt="树状数组"></div>
数组中的每一个元素，都对应下面每一个区间。而下面的每一个区间表示的是原数组的某个区间和。
求和时，我们只需要找到对应的区间，然后将这些区间相加即可。
修改某个数据时，我们也只需要向上找到包含他的区间进行修改即可。

```
void add(int p,int x){
    while(p<n){
        a[p]+=x;
        p+=lowbit(p);
    }
}
ll count(int p){
    ll res=0;
    while(p>0){
        res+=a[p];
        p-=lowbit(p);
    }
    return res;
}
```

接下来我们了解一下lowBit函数。

lowBit函数会求出一个二进制数字的最低位代表的数字。（取出一个二进制数字的最低位的1）

比如说1000110

lowBit函数会求出最低位的1，就是2。

比如说6

6的二进制表示为110

lowBit函数会求出最低位的1，就是2。

观察树状数组我们知道第一行数据，他们的区间长度为1。他们的序号对应的lowbit值就是1。

第二行数据，他们的区间长度为2。他们的序号对应的lowbit值就是2。

第三行数据，他们的区间长度为4。他们的序号对应的lowbit值就是4。

第四行数据，他们的区间长度为8。他们的序号对应的lowbit值就是8。

比如10对应数组的第12个元素。

12的二进制表示为1100

lowbit(12)就是4。

b[12]存放的是原来nums数组里，以12结尾，一共4个元素的和。

也就是nums[12]+nums[11]+nums[10]+nums[9]。

长度4=lowbit(12)

即序号为i的序列正好长度就是lowbit(i)，且这个序列的元素都是以i结尾的。

比如说我们要计算前14个元素的和。

14-lowbit(14)=12

只需要计算前12个元素的和加上b[14]即可。
```
ll count(int p){
    if(p==0){
        return 0;
    }
    return count(p-lowbit(p))+a[p];
}
```
如果一个序列b[i]，他的正上方的序列正好就是b[i+lowbit(i)]

所以当我们修改某个位置的值的时候只需要不断加上lowbit(i)就可以找到上方的所有序列，进行修改即可。
修改某个位置的值的函数：
```
void add(int p,int x){
    while(p<n){
        a[p]+=x;
        p+=lowbit(p);
    }
}
```
完整代码：
```
inline int lowbit(int x){
    return x&(-x);
}
void add(int p,int x){
    while(p<n){
        a[p]+=x;
        p+=lowbit(p);
    }
}
ll count(int p){
    ll res=0;
    while(p>0){
        res+=a[p];
        p-=lowbit(p);
    }
    return res;
}
```
<h1 style="\\\*\\\*font-weight:bold; color:#222;\\\*\\\*">树状数组1：</h1>


已知一个数列，你需要进行下面两种操作：

1.将某一个数加上x；

2.求出某区间每一个数的和。

输入格式：

第一行包含两个正整数n和m。
n表示数列的长度，m表示操作的次数。
m行，每行包含一个操作。

第二行包含n个正整数，表示数列的元素。
其中第i个元素表示数列的第i项的初始值。
接下来m行每行包含3个整数，表示一个操作。
具体如下：

1 x k 含义：将第x个数加上k。
2 x y 含义：输出区间[x,y]的和。

输出格式：

每个操作的输出占一行。

这个题他的要求是O(nlogn)
我们如果想用前缀和求区间和，我们需要O(n^2)的时间复杂度。

因为我们要写双重循环嘛。

所以这个题我们需要用树状数组。

```cpp linenums="1" title="树状数组1.cpp"
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
int main(){
	int n,m;
	cin>>n>>m;
	vector<int>nums(n+1);
	for(int i=1;i<=n;i++){
		int a;
		cin>>a;
		for(int x=i;x<=n;x=x+(x&-x))
		nums[x]+=a;
	}
	while(m--){
		int b,x,y;
		cin>>b>>x>>y;
		if(b==1){
			for(int k=x;k<=n;k=k+(k&-k)){
				nums[k]+=y;
			}
		}else{
			ll res=0;
			for(int k=y;k;k=k-(k&-k))
			res+=nums[k];
			for(int k=x-1;k;k=k-(k&-k))
			res-=nums[k];
			cout<<res<<endl;
			}
		}

	return 0;
}
    
```
这里面的x+=x&-x，是树状数组的更新操作。它相当于lowbit(x)。
这里面的tree数组是求区间和的。

好的本喵来讲解一下：
```
  for(int i=1;i<=n;i++){
		int a;
		cin>>a;
		for(int x=i;x<=n;x=x+(x&-x))
		nums[x]+=a;
	}
```
这个就是利用了lowbit，这个过程就是函数两个两个相加向上更新nums数组。
我们比如说一组数为：
```
5  4  2  6  3  1

```

当x=1时：
```
lowbit(1)=1。->nums[1]+=5;
后面x=x+lowbit(1)=2。
x=2;

lowbit(2)=2。->nums[2]+=5;

后面x=x+lowbit(2)=4。
x=4;

lowbit(4)=4。->nums[4]+=5;
后面x=x+lowbit(4)=8。
x=8;

lowbit(8)=8>n

结束了5这一个数的上传。
```

x=2的时候：
```
lowbit(2)=2。->nums[2]+=4;
后面x=x+lowbit(2)=4。
x=4;
lowbit(4)=4。->nums[4]+=4;
后面x=x+lowbit(4)=8。
x=8;
lowbit(8)=8>n
结束了4这一个数的上传。
```
x=3的时候：
```
lowbit(3)=1。->nums[3]+=2;
后面x=x+lowbit(3)=4。
x=4;
lowbit(4)=4。->nums[4]+=2;
后面x=x+lowbit(4)=8。
x=8;
lowbit(8)=8>n
结束了2这一个数的上传。
```
后面的：
```
for(int k=y;k;k=k-(k&-k))
			res+=nums[k];
			for(int k=x-1;k;k=k-(k&-k))
			res-=nums[k];
			cout<<res<<endl;
```
这个就是利用了前缀和的知识去求区间和。
在写x=x+(x&-x)的时候，要注意一定要带括号，因为有优先级的问题。+号的优先级比&高。


<h1 style="\\\*\\\*font-weight:bold; color:#222;\\\*\\\*">逆序对</h1>

逆序对的定义和线性代数里面的定义一样：一个数如果比他后面的数小，就叫逆序对。

比如说2 1 3

2前面无为0； 

1前面2比1大为1

3前面无为0

逆序对为0+1+0=1；

现在给一个数n后面n个数，求这n个数的逆序对。

在此之前我们了解一下
lower_bound()

这个是c++标准库<algorithm>里面的二分查找函数。
找第一个大于等于目标值的元素的位置。

前提：
数组必须先sort排序，不然lower_bound()函数会报错。

lower_bound(起始迭代器,结束迭代器,目标值)
返回：第一个大于等于目标值的元素的位置。
用-b.begin()就能算出他的下标

```cpp title="逆序对.cpp"
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	ll n;
	cin>>n;
	vector<int>a(n);
	vector<int>b(n);
	vector<int>nums(n+1);
	ll sum=0;
	for(int i=0;i<n;i++){
		cin>>a[i];
		b[i]=a[i];
	}
	sort(b.begin(),b.end());
	auto last=unique(b.begin(),b.end());
	b.erase(last,b.end());
	ll ans=0;
	for(int i=n-1;i>=0;i--){
		int shu=lower_bound(b.begin(),b.end(),a[i])-b.begin()+1;
		int sum=0;
	for(int k=shu-1;k>0;k-=(k&-k))
	sum+=nums[k];
	ans+=sum;
	for(int k=shu;k<=n;k+=(k&-k))
	nums[k]+=1;
}
cout<<ans<<'\n';
return 0;	
} 
```
解答环节：










<h1 style="\\\*\\\*font-weight:bold; color:#222;\\\*\\\*">树状数组的操作：</h1>

编写程序，实现树状数组的操作。

输入格式：

输入首先给出一个正整数n,随后一行给出n个绝对值不超过10^5的整数。

输出格式：

第一行按存储顺序输出树状数组中的元素；第二行按存储顺序输出前缀和数组中的元素。

输入样例：
15
15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
输出样例：
15 29 13 54 11 21 9 92 7 13 5 22 3 5 1 
15 29 42 54 65 75 84 92 99 105 110 114 117 119 120 

