提醒：以下内容由AI生成，仅供参考。

# 🖥️ 后端开发指南

!!! abstract "前端是面子，后端是里子"
    如果把网站比作一家高档餐厅，前端就是菜单、装修和服务员；而**后端**就是后厨、仓库和厨师长。
    它负责处理核心业务逻辑、管理庞大的数据库、维护服务器稳定。用户看不见它，但它决定了网站能扛住多少人同时访问、数据会不会泄露。

---
##


你之前说前端是“死”，后端是“卷”，这话其实只说对了一半。

后端确实是大部分计算机类学生的主要出路，导致竞争极其激烈（卷）。但同时，**后端的岗位需求和天花板也是远高于前端的**。
为什么？因为一家公司可以没有好看的前端，但绝对不能没有能处理核心数据和安全的后端。



后端语言有很多（Go、C++、Python等），但国内**Java**绝对是霸主地位。对于新手，这是最稳的路线：

graph LR
    A[Java SE 基础] --> B[Java Web]
    B --> C[Spring 框架]
    C --> D[SSM / Spring Boot]
    D --> E[微服务架构]

#
---
## 🗝️ 面向对象编程

##我们学一下基础的面向对象编程，这里我们以C++为例。

类这些基础的我就不过多介绍了，他和结构体比较类似，只是类可以有方法，而结构体只能有属性。

<h2>内联函数</h2>
内联函数是一种特殊的函数，它的定义在函数调用的附近，编译器会自动将函数的代码插入到调用点，而不是调用函数。

我们使用inline关键字来定义内联函数。也称为内嵌函数。
引入内联函数是为了消除函数调用时的系统开销，提高程序的执行效率。

格式如下：
```
inline 返回值类型 函数名(参数列表){
    函数体;
}
```
比如下面的例子：

```cpp title="内联函数"
#include <iostream>
using namespace std;
inline int max(int a, int b){
    return a>b?a:b;
}
int main(){
    cout << max(1,2) << endl;
    return 0;
}
```

<h2>重载函数</h2>
重载函数是指在同一个作用域中，函数名相同，但参数列表不同的多个函数。编译器会根据函数调用时传入的参数类型和数量来决定调用哪个函数。

重载函数据有：
1.相同的函数名
2.不同的参数列表或者数据类型对应的顺序。

如：
```
int sum(int a, int b)//2个参数
int sum(int a, int b, int c)//3个参数
```
如：
```
float cube(float i)
int cube(int i)
```
如：
```
double sum(int a, double b)
double sum(double a, int b)
```
<b>注意：</b>

（1）若两个函数除了返回类型不同，其他都相同，那么非法。

如：
```
float cube(float i)
double cube(float i)//非法
```

(2)重载与带缺值的函数一起使用时，有可能会导致二义性。
如：
```
int sum(int a)
int sum(int a = 0, int b = 0, int c = 0)
```


下面我们学习：异常处理机制。

(1)检查异常（使用try语句块）

(2)抛出异常（使用throw语句）

(3)捕捉异常（使用catch语句）

一般格式如下：
```
throw 表达式;

try{
    可能会抛出异常的代码;
}catch(异常类型 异常对象){
    处理异常的代码;
}
```

下面我们学习：具有默认参数的构造函数。

如果构造函数的参数值通常是不变的，只有在特殊情况下才需要改变，那么就可以使用默认参数。

<h2>类的继承机制</h2>

继承就是在已有的类的或称为基类的基础上创建新类，这个类就是派生类。

c++中有单继承、多继承、多态性等机制。

<h3>单继承</h3>
单继承：由一个基类派生出一个派生类。
```
        基类
        |  |
        |  |
        派 派
        生 生
        类 类
        1  2
```

```
父类：基类（person）
子类：派生类（student）
```
人类里面包含学生类。


<h3>多继承</h3>

多继承：由两个或者多个基类派生出一个派生类。

```
        基类1  基类2  基类~
            派生类
```

如：
```
学生类    员工类
    在职学生类
```
在职学生类：既是在校学生，又是单位员工，所以它同时继承学生类和员工类。

类的单继承声明格式：

```
class 派生类名：继承方式 基类名{
    派生类成员声明
};
```

下面我们实战一下：


<h3>实战题：在职学生信息管理</h3>
<p>
题目要求<br>
定义基类 Person：<br>

保护成员：name（姓名）、age（年龄）<br>

构造函数带默认参数：姓名默认 "未知"，年龄默认 18<br>

成员函数 showPerson() 输出姓名和年龄<br>

定义 Student 类，单继承 Person：<br>

私有成员：stuNo（学号）、major（专业）<br>

构造函数带默认参数

成员函数 showStudent() 输出个人信息、学号、专业<br>

定义 Employee 类：<br>

保护成员：empNo（工号）、dept（部门）<br>

构造函数带默认参数

成员函数 showEmployee() 输出工号和部门<br>

定义 WorkingStudent 类，多继承 Student 和 Employee：<br>

私有成员：company（工作单位）<br>

构造函数带默认参数

成员函数 showAll() 输出全部信息<br>

在 main() 中：<br>

创建一个全部使用默认参数的对象，输出信息<br>

创建一个使用实际参数的对象，输出信息</p>

```cpp title="在职学生信息管理"
#include<bits/stdc++.h>
using namespace std;
class person{
	protected:
		string name;
		int age;
	public:
		person (string n = "未知" , int a = 18) : name(n) ,
		 age (a){ } 
		 void showperson() const{
		 cout << "姓名:" << name << "年龄:" << age << endl; 
		 }
};
class student : public person{
	private:
		string stuno;
		string major;
	public :
		student(string n = "未知",int a = 18, string s = "000" , 
		string m = "未定")
		:person(n,a),stuno(s),major(m){}
	void showstudent() const{
		showperson();
		cout << "学号:"  << stuno << ",专业:" << major << endl;
	}
};
class employee{
	protected:
		string empno;
		string dept;
	public:
		employee(string e = "E000" , string d = ""):empno(e),dept(d){
		}
		void showemployee() const{
			cout << "工号:" << empno << "部门:" << dept << endl;
		}
};
class workingstudent : public student , public employee{
	private:
		string company;
	public:
		workingstudent(string n = "未定" , int a = 18,
		string s = "000" , string m = "未定",
		string e = "E000", string d = "未定",
		string c = "未定"):student(n,a,s,m),employee(e,d),
		company(c){
		}
		void showall() const 
		{
			cout << "====== 在职学生信息 ======" << endl;
			showstudent();
			showemployee();
			cout << "工作单位" << company << endl; 
		}
};
int main(){
	workingstudent ws1;
	ws1.showall();
	cout << endl;
	workingstudent ws2("钾钠", 19 , "2025" , "计算机科学与技术",
	"E1001" , "研发部", "某公司"); 
	ws2.showall();
	return 0;
}
```
写了很久也是敲出来了。

