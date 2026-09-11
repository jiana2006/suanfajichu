线性表是一种有序的集合，每个元素都有一个唯一的索引。
定义：
sqlist线性表。
c语言写法：
```c linenums="1" title="c语言线性表.c"
#include <stdio.h>
#include <stdlib.h>
int main(){
#define MAXSIZE 1000//自定义最大性表长度
struct sqlist{
    int data[MAXSIZE];
    int length;//统计当前性表的长度
};
struct sqlist L;
L.length;//定义一个空的性表L，长度为0
scanf("%d",&L.length);//输入性表的长度
for(int i=0;i<L.length;i++){
    scanf("%d",&L.data[i]);//输入性表的元素
}
    for(int i=0;i<L.length;i++){
        printf("%d ",L.data[i]);//输出性表的元素
    }
    printf("\n");
    return 0;
}
```

下面写一下c++的线性表
```cpp linenums="1" title="c++线性表.cpp"
#include <bits/stdc++.h>
using namespace std;
int main(){
#define MAXSIZE 1000//自定义最大性表长度
struct sqlist{
    int data[MAXSIZE];
    int length;//统计当前性表的长度
};
sqlist L;
for(int i=0;i<L.length;i++){
    cin>>L.data[i];//输入性表的元素
}
    for(int i=0;i<L.length;i++){
        cout<<L.data[i]<<" ";//输出性表的元素
    }
    cout<<endl;
    return 0;
}
```
可以看到c++再写sqlist的时候是不需要写struct的。而c语言需要写struct。
C 语言里，sqlist只是结构体标签名，不是完整类型名。完整类型是 struct sqlist。
在 C++ 中：sqlist不再仅仅是标签 ，它直接升级成完整的类型名。
那如果我c语言也想省略struct，煮波煮波可以么？

当然可以（超大声）。

这里我们引入typedef。全称type define
```c linenums="1" title="c语言线性表.c"
#include <stdio.h>
#include <stdlib.h>
#define MAXSIZE 1000//自定义最大性表长度
int main(){
typedef struct sqlist{
    int data[MAXSIZE];
    int length;//统计当前性表的长度
} sqlist;
sqlist l;
for(int i=0;i<l.length;i++){
    scanf("%d",&l.data[i]);//输入性表的元素
}
for(int i=0;i<l.length;i++){
    printf("%d ",l.data[i]);//输出性表的元素
}
printf("\n");
return 0;
}
```
用typedef相当于给sqlist取了一个别名sqlist，而struct sqlist是sqlist的完整类型名。

接下来我们学线性表元素的查找

查找分为按位查找和按值查找。

按位查找：

按位查找就是按照元素的下标来查找元素。

如：
```
l.data[7][2][8][11][9]
       0  1  2   3  4
```
现在我想查找第四个元素，就是l.data[3]。
如果想查找第i个元素，就是l.data[i-1]。

按值查找：

按值查找就是按照元素的值来查找元素。

如：
```
l.data[7][2][8][11][9]
       0  1  2   3  4
```
现在我想查找值为11的元素，从头开始查找，直到找到或查找完所有元素。
如果找到，返回元素的下标；如果没有找到，返回-1。

单链表

先解释一下单链表的定义。

单链表是一种有序的集合，每个元素都有一个唯一的索引。
定义：
sqlist线性表。


单链表的创建-尾插法
```cpp linenums="1" title="c++单链表创建-尾插法.cpp"
#include <bits/stdc++.h>
using namespace std;
typedef struct LNode{
    int data;
    struct LNode *next;
} LNode;
int main(){
LNode *L=(LNode*)malloc(sizeof(LNode));
L->next=NULL;
LNode *tail=L;
int n;
cin>>n;
for(int i=0;i<n;i++){
    LNode *s=(LNode*)malloc(sizeof(LNode));
    cin>>s->data;
    s->next=NULL;
    tail->next=s;
    tail=s;
}
for(LNode *p=L->next;p!=NULL;p=p->next){
    cout<<p->data<<" ";
}
return 0;
}
```
单链表-头插法

```cpp linenums="1" title="c++单链表创建-头插法.cpp"
#include<bits/stdc++.h>
using namespace std;

typedef struct LNode{
    int data;
    struct LNode *next;
} LNode;
int main(){
    LNode *L=(LNode*)malloc(sizeof(LNode));
    L->next=NULL;
    LNode *head=L;
    int n;
    cin>>n;
    for(int i=0;i<n;i++){
        LNode *s=(LNode*)malloc(sizeof(LNode));
        cin>>s->data;
        s->next=head->next;
        head->next=s;
    }
    for(LNode *p=L->next;p!=NULL;p=p->next){
        cout<<p->data<<" ";
    }
    return 0;
}
```
两者各有优缺点：

头插法无需额外维护尾指针但构建的结果和输入顺序相反

尾插法需要额外维护尾指针但构建的结果和输入顺序相同

单链表的查找

单链表也是分为按值查找和按位查找。

按值查找O(n)：从第一个节点开始，依次和要找的数进行比较。
直到走到了或者走到NULL。

```
    头结点 指针
L->[      ][]->[   5  ][]->[   3  ][]->[  6   ][]->

[   2  ][]->NULL

```

```
//在单链表L中查找值为e的节点
LNode *Find(LNode *L,int e){
    LNode *p=L->next;//从第一个结点开始查找
    //依次和e进行比较，直到走到了或者走到NULL
    while(p!=NULL){
        if(p->data==e){
            return p;//如果找到，返回该节点
        }
        p=p->next;//否则继续查找下一个节点
    }
    return NULL;//如果没有找到，返回NULL
}
```
按位查找O(n)：

如果给定的位序<0,则直接认定为查找失败。
如果给定的位序大于等于链表的长度，则直接认定为查找失败。

```
LNode *Find(LNode *L,int k){
    if(k<0)return NULL;//如果k小于0，直接返回NULL
    //从头结点开始枚举到第k个节点或者走到NULL
    LNode *p=L;//设头结点为第0个节点
    int i=0;
    while(p!=NULL && i<k){
        p=p->next;
        i++;
    }
    return p;
}
```

单链表的插入O(n)：
链表的插入操作需要找到插入位置的前一个节点，然后将新节点插入到前一个节点的后面。
```
   L-> [ 5 ][]->[ 3 ][]->[ 6 ][]->[ 2 ][]->NULL
头指针L           data
                数据域
```

