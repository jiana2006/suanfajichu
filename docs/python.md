python我只学了一点，所以我不太懂。
这里只写一些简单的代码。

python的编译器我推荐pycharm和vscode。基础版的python我个人用着比较别扭。

python和c的区别：

c:                        
     
int a;  
                        
scanf("%d",&a);
                           
printf("%d",a);

python:

a=int(input())

print(a)

比如说c的在第一行输入int a,b和在第一行输入int a 第二行输入int b代码是一样的
而python不同
在第一行输入a,b:

a,b=map(int,input().split())

而第一行输入a 第二行输入b代码是：

a=int(input())

b=int(input())

在这里面我先声明一下如果掌握c/c++的高精度实在来不及了，那么python可以作为一个选择去使用。但是很大概率会时间超时（TE）。

问题1：第一行输入两个很大的整数，求二者相加之和。

代码实现：

a,b=map(int(),input().split())

print(a+b)

同理python的减法：

问题2：第一行输入一个很大的整数a；第二行输入同样很大的数b；求a-b。

代码实现：

a=int(input())

b=int(input())

print(a-b)

同理乘法和除法就把“+”变成“*”（“//”）即可。对了值得注意的是python里面的整数除以号不是“/”而是“//”，因为“/”在python里是浮点数除法，而“//”是整数除法。

好的python暂时告一段落