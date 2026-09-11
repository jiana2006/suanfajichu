堆又称优先队列（priority queue）

他仅仅维护最大和最小元素，可以在叫较小的时间复杂度内获取某个元素集合的最大值和最小值
```
           O(topl)堆顶  pop()删除堆顶元素 push()插入元素
        O     O
    O              O
O                     O
```
一般默认为大根堆（元素最大的在堆顶）
```
priority_queue<int>pq;
```
最小堆（元素最小的在堆顶）
```
priority_queue<int,vector<int>,greater<int>>pq;
```
自定义比较函数：

方法一：全局函数，传入函数指针用decltype转换
```
bool cmp(const int&u,const int&v){
    return u<v;
}//大根堆
priority_queue<int,vector<int>,decltype(cmp)>pq(cmp);

```
方法二：匿名函数cmp变量存储，传入变量
```
auto cmp=[](const int &u,const int &v){
    return u<v;
}//大根堆
priority_queue<int,vector<int>,decltype(cmp)>pq(cmp);
```
方法三：struct重载()运算符
```
struct cmp{
    bool operator()(const int&u,const int&v){
        return u<v;//大根堆
    }
};
priority_queue<int,vector<int>,cmp>pq;
```
取出堆顶元素：
```
pq.top();
cout<<pq.top()<<endl;
```
入堆，时间复杂度：O(logn)
```
pq.push(x);
```
出堆，时间复杂度：O(logn)
```
pq.pop();
```
获取堆内元素个数：
```
pq.size();
```
优先堆为树形结构，不支持遍历（除非逐个出堆）

