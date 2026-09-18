<h1>枚举</h1>
枚举又称穷举法

一般枚举就是枚举所有的可能情况，找到符合条件的情况。因此枚举一般容易超时。

如果枚举的可能情况很多，但是符合条件的情况很少，那么枚举就比较有效。

所以枚举就是暴力求解的一种方法。

问题：给你一个整数x，s(x)=sigma(x)/x;其中sigma(x)是x的所有因子的和。
给出两个整数n,m;（n < x < y ) ;求在[n,m]区间内，s(x)的最大值。

这道题如果我们枚举所有的可能情况，就会超时。

（因为我最开始写这道题就是暴力枚举，其实我写的时候知道会TE但是我不会优化，所以就超时了。因为我当只会一个二分但是二分不大行）

我最开始的代码如下：
```cpp linenums="1" title="枚举.cpp"

#include<bits/stdc++.h>
using namespace std;
double hanshu(int x){
    double res = 0.0;
    for(int i=1;i<=x;i++){
        if(x%i==0){
            res += i;
            if(i!=x/i){
                res += x/i;
            }
        }
    }
    return res/x;
}
int main(){
 int n,m;
 cin>>n>>m;
double maxn = 0.0;
    for(int i=n;i<=m;i++){
      double res = hanshu(i);
        maxn = max(maxn,res);    
    printf("%g\n",maxn);
    return 0;
}
```

很明显，枚举所有的可能情况，就会超时。

这时候我们就需要优化了。这道题我们用倍数枚举来优化。

倍数枚举就是枚举所有的倍数，而不是所有的可能情况。

因为倍数的因子数量较少，所以枚举倍数会更快。

举个例子：


        
<h2>补给</h2>
现在有n个补给站需要补给，每个补给站需要补给的钱数是p[i]，并且去到每个补给站需要s[i]的钱。

现在给你一个整数b，表示你最大的总钱数。但是你现在有一张优惠卷可以在里进行某一次补给时，可

以给你打5折。也就是该次总费用变成了p[i]/2+s[i]。补给其他补给站的费用不变。依旧为p[i]+s[i]。问你最多可以补给多少个补给站。

```cpp linenums="1" title="补给.cpp"
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
struct node{
	ll p,s,cost,half;	
};
	
int main(){
	int n;
	ll b;
	cin>>n>>b;
	vector<node>a(n);
	for(int i=0;i<n;i++){
		cin>>a[i].p>>a[i].s;
		a[i].cost=a[i].p+a[i].s;
		a[i].half=(a[i].p/2)+a[i].s;
	}
	sort(a.begin(),a.end(),[](node x,node y){
		return x.cost<y.cost;
	});
	vector<ll>pre(n+1,0);
	for(int i=0;i<n;i++){
		pre[i+1]=pre[i]+a[i].cost;
	}
	int ans=0;
	for(int i=0;i<n;i++){
		for(int k=n;k>=1;k--){
			ll total;
			if(k<=i)
			total=pre[k];
			else
			total=pre[k]-a[i].cost+a[i].half;
			if(total<=b){
			ans=max(ans,k);
			break;	
			}			
		}
	}
	cout<<ans<<endl;
	return 0;
}

```
这里我们解释一下sort对于结构体的排序。

sort(a.begin(),a.end(),比较函数);

因为我们是对整个结构体去排序，所以比较函数要写在sort函数后面。

我们定义了一个结构体node，用来存储每个补给站的信息。

struct node{
    ll p,s,cost,half;	
};
这里面这么多变量，我们需要给计算机说明一下我们是按照谁去进行的排序。

```
return x.cost<y.cost;，所以计算机就会按照cost的大小去排序这里面是按照从小到大排序的。
```
如果是从大到小排序，那么就写成：
```
return x.cost>y.cost;
```
这个写法只适用于c++11及以上版本。

之前的写法是：
```
bool cmp(node x,node y){
	return x.cost<y.cost;
}
sort(a.begin(),a.end(),cmp);
```
