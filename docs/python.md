python我只学了一点，所以我不太懂。
这里只写一些简单的代码。
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

