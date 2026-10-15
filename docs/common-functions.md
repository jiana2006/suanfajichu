<h1>常用函数：</h1>

<p>其实我本来是想写在stl容器那里面的，但是考虑到这个函数的常用性，所以我决定重新弄了一个专门的页面来存放这些函数。</p>

<h2>sort：</h2>

<p>这个就不过多介绍了我之前在排序中已经介绍了。<br></p>
<h2>reverse：</h2>
<p>这个也比较常见，用于反转一个容器中的元素。</p>

<p>例子：</p>
```
string s = "hello";
reverse(s.begin(), s.end()); // 变成 "olleh"
```
<br>
<h2>unique：</h2>
<p>这个函数用于删除一个容器中重复的元素。</p>

<p>例子：</p><br>
```
vector<int> v = {1,2,2,3,4,4,5};
v.erase(unique(v.begin(), v.end()), v.end()); // 变成 {1,2,3,4,5}
```
<br>
<h2>lower_bound,upper_bound：</h2>

<p>这两个函数用于查找一个容器中第一个大于等于某个值的元素和第一个大于某个值的元素。
是的他们都是找大于某个数</p>


<p>例子：</p>
```
vector<int> v = {1,2,3,4,5,6,7,8,9};
int l = *lower_bound(v.begin(), v.end(), 5); // 5
int u = *upper_bound(v.begin(), v.end(), 5); // 6
```
<h2>max_element(),min_element()</h2>
<p>这两个函数用于查找一个容器中最大值和最小值的迭代器。</p>
<br>
<p>因为这两个函数返回的是迭代器，所以我们需要用*来解引用。</p>

<p>例子：</p><br>
```
vector<int> v = {1,2,3,4,5,6,7,8,9};
int max = *max_element(v.begin(), v.end()); // 9
int min = *min_element(v.begin(), v.end()); // 1
```
<h2>_builtin_popcount()</h2>
<p>这个函数用于统计一个二进制数中1的个数。</p>

<p>例子：</p>
```
int n = 5; // 101
int popcount = __builtin_popcount(n); // 2
```
<h2>accumulate：</h2>
<p>这个函数用于计算一个容器中所有元素的和。</p>
<br>
<p>例子：</p>
```
vector<int> v = {1,2,3,4,5};
int sum = accumulate(v.begin(), v.end(), 0); // 15
```
<br>
<h2>nth_element：</h2>
<p>这个函数用于将一个容器中的元素按升序排序，但是只排序到第n个元素。</p>

<p>例子：</p>
```
vector<int> v = {1,2,3,4,5};
nth_element(v.begin(), v.begin()+2, v.end()); // 变成 {1,2,3,4,5}
```
<br>
<h2>iota：</h2>
<p>这个函数用于将一个容器中的元素按顺序赋值。</p>

<p>例子：</p>
```
vector<int> v = {5,4,3,2,1};
iota(v.begin(), v.end(), 1); // 变成 {1,2,3,4,5}
```
<br>
<h2>prev_permutation：</h2>
<p>这个函数用于生成一个容器中所有可能的排列。也就是我们常说的全排列。</p>

<p>例子：</p>
```
vector<int> v = {1,2,3,4,5};
while(prev_permutation(v.begin(), v.end())){
    cout<<v[0]<<endl;
}
```

<h2>next_permutation：</h2>
<p>这个函数用于生成一个容器中所有可能的排列。也就是我们常说的全排列。</p>
没错他和prev_permutation是相反的。一个是生成上一个排列，一个是生成下一个排列。
<p>例子：</p>
比如说123<br>
用next_permutation生成下一个排列是132->213->231->312->321<br>
而用prev_permutation生成上一个排列是321->231->213->132->123<br>
<h2>stio()/stoll()：</h2>
<p>这两个函数用于将一个字符串转换为一个整数。</p>
<p>例子：</p>   
```
string s = "123";
int n = stoi(s); // 123
```
<h2>to_string()：</h2>
<p>这个函数用于将一个整数转换为一个字符串。</p>
<p>例子：</p>
```
int n = 123;
string s = to_string(n); // "123"
```
<h2>substr()：</h2>
<p>这个函数用于截取子字符串。</p>
<p>例子：</p>
```
string s = "hello";
string sub = s.substr(1,3); // "ell"
```
<h2>gcd(),lcm()：</h2>
<p>这两个函数用于计算两个整数的最大公约数和最小公倍数。</p>
<p>例子：</p>
```
int a = 12;
int b = 16;
int g = __gcd(a,b); // 4
int l = a*b/g; // 48
```
我们来写一道全排列的题目：
<h2>全排列：</h2>
输入一个整数n，输出1到n的全排列。<br>
题目保证0<n<=10。

这个时候我们可以用next_permutation函数来实现。
```cpp linenums="1" title="全排列.cpp"
#include<bits/stdc++.h>
using namespace std;

int main(){
    int n;
    cin >> n;
    vector<int> v(n);
    iota(v.begin(), v.end(), 1);
    do {
        for(int i = 0; i < n; i++){
            cout << v[i];
        }
        cout << endl;
    } while(next_permutation(v.begin(), v.end()));
    
    return 0;
}
```