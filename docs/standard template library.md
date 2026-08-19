stl标准模板库
stl容器应该是c++11或以上版本的。
容器一听名字就知道是做什么的。（储存数据）
容器的复杂度是O(n)，其中n是容器的元素数量。
其中我个人最常用的容器是vector。
vector容器是一个动态数组，可以自动调整大小。
相较于auto &[101]，vector容器最大的好处是很节省空间的。

vector<数据类型>+容器名字（大小）

比如：vector<int>res(n);就是定义了一个大小为n的vector容器，每个元素都是int类型。

如果是二维数组呢？

比如：vector<vector<int>>res(n,vector<int>(m));

vector<vector<数据类型>>容器名字（行数，vector<数据类型>(列数)>）

初始化二维数组

vector<vector<int>>res(n,vector<int>(m,0));

这里我们使用一下vector；
现在给你a*b的矩阵，要求你输出它的乘法结果。

```cpp linenums="1" title="IO加速示例.cpp"

int a,b;
cin>>a>>b;
vector<vector<int>>res(a,vector<int>(b,0));

for(int i=0;i<a;i++){

    for(int j=0;j<b;j++){

        cin>>res[i][j];

    }

}

long long sum=1;

    for(int i=0;i<a;i++){

        for(int j=0;j<b;j++){

            sum*=res[i][j];

        }

    }

    cout<<sum<<endl;

```


下面介绍一下set容器。

set容器是一个有序的集合，不能重复重复。
如果重复了呢？
set<int>res(n);
x.insert(1);
x.insert(2);
x.insert(1);//set容器不能重复重复。所以这里插入的1会被忽略。
x.insert(3)
set默认是升序的。set<int,less<int>>升序（从小到大）因为是默认的，因此less<int>可以不写；
如果想要降序，set<int,greater<int>>降序（从大到小）
set容器的复杂度是O(logn)，其中n是集合的元素数量。
set是集合容器，底层是红黑树。不支持像数组那样的写法。
此外set也不能随机访问。
这里我们使用一下set容器；
```cpp linenums="1" title="IO加速示例.cpp"
set<int>res;

for(int i=0;i<n;i++){

    int x;

    cin>>x;

    res.insert(x);

}

    for(int i:res){

        cout<<i<<endl;
        
    }

```
//set<int>res(n)是错误的。

//因为set容器不能重复重复，所以这里不能用n初始化。

//set没有vector那种(n,val)构造元素，只能insert插入，元素自动去重。

下面我们介绍一下map容器。

map容器是一个有序的映射表，可以自动调整大小。是的map也是有序的。其底层是红黑树。
同样map容器默认也是升序的。如果想要降序，map<int,int,greater<int>>降序（从大到小）
map容器的复杂度是O(logn)，其中n是映射表的元素数量。
map容器的使用方法：
map<键类型，值类型>容器名字;

map的顺序是按键的顺序。也就是按第一个参数排序。
```cpp linenums="1" title="IO加速示例.cpp"
map<int,int>res;
map<string,int>res2;
map<char,int>res3;
```
同理，map容器的用法和vector容器类似。
我们在这里表示map容器的用法。
给你n个学生，每个学生有一个姓名和一个学号。
要求你输出每个学生的姓名。
```cpp linenums="1" title="IO加速示例.cpp"
map<string,int>res;
int n;
cin>>n;
for(int i=0;i<n;i++){
    string name;
    int id;
    cin>>name>>id;
    res[name]=id;
}
for(auto i:res){
    cout<<i.first<<endl;
}
```
这里和结构体有点像。不过不同的是map有序且唯一。
我们试着输入一些样例。
比如：Tom 1001; BOb 1002 ; john 1003 ;
最终输出：Bob john Tom
因为map他是按按键的顺序排序的。

下面我们介绍一下pair容器。


下面我们介绍一下unordered_map容器。
这个属于哈希容器。后面我们会详细介绍哈希表。
现在我们先了解一下这个unordered_map容器。
