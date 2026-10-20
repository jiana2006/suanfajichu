<h1>Java</h1>

Java的宗旨就是“一次编写，到处运行”。也就是(Write Once, Run Anywhere)。

我们学习Java的原因是，Java是一种跨平台的编程语言，可以在不同的操作系统上运行。

java既是是一种解释语言，也是是一种编译语言。

我们来写一个简单的Java程序。和其它语言的入门一样，我们先写一个简单的Hello World程序。

```java linenums="1" title="Hello World.java"
public class Main{
    public static void main(String[]args){
        System.out.println("Hello World!");
    }
}
```
和c/c++一样Java也是要先写一个main函数框架。

下面我们学习一下注释：

```java linenums="1" title="注释.java"
// 这是一个注释
/* 这是一个注释 */
```
注释的作用是解释代码的含义，方便其他开发人员理解和维护代码。

其实和c/c++的注释是一模一样。

但是Java的注释有一个特殊的注释，就是类注释。

类注释的作用是解释类的含义，方便其他开发人员理解和维护代码。

```java linenums="1" title="类注释.java"
/**
 * 这是一个类注释
 */
```
持续更新ing


<h1>输出两数的和</h1>
本题保证数的和不会超过int的范围。

```java linenums="1" title="输出两数的和.java"
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(a+b);
    }
}
```

<h2>这里我们介绍一下各个部分的作用：</h2>
<b>1.</b><p>import java.util.Scanner;</p>
<p><b>作用： 导入工具箱。</b></p>
<p>解释： Java 自带了很多功能，但为了节省资源，默认不是全都加载的。Scanner 是 Java 提供的一个用来读取用户输入的工具（相当于一个扫码枪）。import 就是告诉 Java：“我要用这个工具箱了，帮我提前拿过来。”</p>
<b>2.</b><p>public class Main {……}</p>
<p><b>作用： 定义一个类。</b></p>

<b>3.</b><p>public static void main(String[] args) {……}</p>
作用： 程序的入口（大门）。

解释： 无论你的 Java 程序有多长，计算机只认这一个入口。运行程序时，就是从这一行开始往下执行的。

拆解这几个词：

public：公开的。

static：静态的。意思是这个东西不需要实例化就能直接用。

void：表示这个方法执行完之后，不返回任何结果（空）。

main：固定名字，计算机只找名叫 main 的方法。

String[] args：用来接收命令行参数的（在刷题时基本用不到，但必须写上）。

<b>4.</b><p>Scanner sc = new Scanner(System.in);</p>
作用： 制造一个“扫码枪”，并对准键盘。

解释：

Scanner：就是第 1 行导入的那个工具类型。

sc：是你给这个扫码枪起的名字（你可以叫它 in、read 等等，叫 sc 是程序员习惯的缩写）。

new：在 Java 里，造一个新对象要加 new。

System.in：代表标准输入（也就是你的键盘/控制台的输入流）。

<b>5.</b><p>int a = sc.nextInt();</p>
作用： 敲一下键盘，读入一个整数，存到变量 a 里。

解释：

int：表示整数类型（存不了小数）。

a：变量名，相当于一个贴了标签的小盒子。

sc.nextInt()：调用扫码枪 sc 的 nextInt() 功能。它会等待你输入，直到你敲了空格或回车，它把刚输入的数字抓出来，放到 a 这个盒子里。

<h2>对齐输出</h2>

输入两个数，要求输出这两个数中间间隔8个空格。
```java linenums="1" title="对齐输出.java"
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.printf("%8d %8d",a,b);
    }
}
```
是的和c语言的对齐输出是一模一样的。

<h2>输出结果和余数</h2>

```java linenums="1" title="输出结果和余数.java"
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(a/b+" "+a%b);
    }
}
```

我们来总结一下
```
1. System.out.println() —— 最常用的输出
特点： 括号里是什么，它就原样输出什么，并且输出完会自动换行（ln = line）。

拼字符串： 用 + 号把变量和文字连起来。

什么时候用： 90% 的普通题目，比如 System.out.println(a + b); 或 System.out.println("Hello");

注意： 它不认 %d、%f 这种占位符，你写了它也会当成普通字符原样印出来（就像你上一条代码那样）。

2. System.out.printf() —— 格式化输出（Format）
特点： 可以像 C 语言一样，用 % 占位符来严格控制输出格式。它不会自动换行（想换行必须自己在末尾加 \n）。

什么时候用： 题目有特殊要求的时候。

要求保留 9 位小数：printf("%.9f", c);

要求每个数字占 8 个字符右对齐：printf("%8d", a);

要求输出带前导零（如 001）：printf("%03d", a);

3. System.out.print() —— 纯打印
特点： 和 println 几乎一样，唯一的区别是输出完不换行。

什么时候用： 需要把多个东西拼在同一行的时候。比如打印九九乘法表，一行要打印好几个式子，就用 print。
```