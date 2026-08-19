高精度算法是用于解决c/c++语言中的一些问题的算法，例如大整数乘法、大整数除法等。
因为c/c++语言中没有大整数类型，所以需要自己实现大整数的乘法、除法等操作。
高精度算法的实现通常需要使用字符串来表示大整数，然后对字符串进行操作。
字符串的乘法、除法等操作需要手动实现，比较复杂。
这里如果你会python语言，你可以用python实现高精度算法。
c/c++对于数的类型有严格限制。long long 最大也只支持19位数字（1e18）。
而python对于数的类型没有限制，可以表示任意大的整数。
所以，在python中实现高精度算法相对简单。python只受制于内存大小，理论上可以表示任意大的整数。但是有时候考虑到时间复杂度，需要手动实现一些操作，例如字符串的乘法、除法等操作。
但是竞赛还是比较推荐c++的。
1.高精度加法（大数相加）
我个人认为这是最基础的一题了。
题意：给两个大整数，要求它们的和。（a,b）但是a,b比较大。
代码实现：

include<bits/stdc++.h>

using namespace std;

int main(){

    string a,b;

    cin>>a>>b;

    int n=a.size(),m=b.size();

    int carry=0;

   vector<int> res;

    while(n||m||carry){

        int sum=carry;

        if(n>=0)sum+=a[n--]-'0';

        if(m>=0)sum+=b[m--]-'0';

        carry=sum/10;

        res.push_back(sum%10);

    }

    reverse(res.begin(),res.end());

    for(int i:res){

        cout<<i;

    }

    return 0;

}

//这里说明一下reverse函数：
//reverse函数用于反转字符串或容器中的元素。
//reverse函数的语法：
//reverse(begin,end);
//其中，begin是字符串或容器的起始迭代器，end是字符串或容器的结束迭代器。
//reverse函数的返回值是void，即没有返回值。
//reverse函数的复杂度是O(n)，其中n是字符串或容器的元素数量。
//reverse函数的使用方法：
//reverse(begin,end);
//其中，begin是字符串或容器的起始迭代器，end是字符串或容器的结束迭代器。
//reverse函数的示例：
//string s="hello";
//reverse(s.begin(),s.end());
//cout<<s<<endl;
//输出："olleh"
接下来是高精度减法（大数相减）
代码实现：


include<bits/stdc++.h>

using namespace std;

int main(){

    string a,b;

    cin>>a>>b;

    int n=a.size(),m=b.size();

    int borrow=0;

    vector<int> res;

    while(n>0||m>0){

        int x = a[--n]-'0' - borrow;

        if(m>0) x -= b[--m]-'0';

        if(x<0){

            x += 10;

            borrow =1;

        }else{

            borrow=0;

        }

        res.push_back(x);

    }


    while(res.size()>1 && res.back()==0) res.pop_back();

    reverse(res.begin(),res.end());

    for(auto v:res) cout<<v;

    return 0;

}

接下来是高精度乘法（大数相乘）
代码实现：
include<bits/stdc++.h>

using namespace std;

