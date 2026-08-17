枚举又称穷举法
一般枚举就是枚举所有的可能情况，找到符合条件的情况。因此枚举一般容易超时。
如果枚举的可能情况很多，但是符合条件的情况很少，那么枚举就比较有效。
所以枚举就是暴力求解的一种方法。

问题：给你一个整数x，s(x)=sigma(x)/x;其中sigma(x)是x的所有因子的和。
给出两个整数n,m;（n < x < y ) ;求在[n,m]区间内，s(x)的最大值。

这道题如果我们枚举所有的可能情况，就会超时。

（因为我最开始写这道题就是暴力枚举，其实我写的时候知道会TE但是我不会优化，所以就超时了。因为我当只会一个二分但是二分不大行）

我最开始的代码如下：

include<bits/stdc++.h>

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

很明显，枚举所有的可能情况，就会超时。
