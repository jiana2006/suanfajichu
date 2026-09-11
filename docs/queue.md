队列（queue）先进先出的数据结构。队列在尾部添加元素，在头部删除元素。

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
以上的是一个单向的队列，如果要实现双向队列，我们组要用到双向队列deque

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
