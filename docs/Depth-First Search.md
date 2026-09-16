DFS(深度优先搜索)
dfs模板：
int res=0; cnt=0;
void dfs(){
    //结束条件

    //dfs()

    //把状态恢复到原来的状态
}
来一道题：奶娃的笑会传染，奶娃会大笑与其处在同一行或者同一列以及同一对角线上的奶娃。
现在有n个奶娃，要求把这n个奶娃放置在n*n的网格中，每个奶娃只能放在一个网格中，不能放在同一个网格中并且奶娃不能大笑。
求有多少种放置方法。1<=n<=9
<div style="text-align:center; margin:20px 0;">
  <video autoplay loop muted playsinline style="width:320px; max-width:100%; border-radius:8px;">
    <!-- 去掉开头的斜杠，改成相对路径 -->
    <source src="../assets/shipin/naiwa.mp4" type="video/mp4">
  </video>
</div>

```
#include<bits/stdc++.h>

using namespace std;

void dfs(int n,int r){//r表示当前正在放置的奶娃的序号

    if(r>=n)return;

    //奶娃摆好

    dfs(n,r+1);//递归调用，摆放下一个奶娃

    //回溯
}
```


深度优先搜索就是：“一条路走到黑，走不通再回头”。

从起始点出发，沿着某条路径一直往深处走，直到走不动了，就回溯到上一个分叉点，换一条路继续走，直到所有能到达的节点都被访问过。

下面我们看一下他的基础模板：

```cpp linenums="1" title="dfs.cpp"
void dfs(int node,vector<vector<int>>&graph,vector<bool>&visited){//node表示当前正在访问的节点
  cout<<node<<" ";//访问当前节点
  visited[node]=true;//标记当前节点已访问
  for(auto neighbor:graph[node]){//遍历当前节点的所有相邻节点
    if(visited[neighbor])continue;//如果相邻节点被访问过，跳过。
      dfs(neighbor,graph,visited);//递归调用dfs函数，访问这个相邻节点
  }
    
}
```
由于树是无环图，所以我们在dfs函数中不需要回溯。

我们优化一下

```cpp linenums="1" title="dfs.cpp"
void dfs_tree(int node,int parent,vector<vector<int>>&graph){
  cout<<node<<" ";
  for(auto neighbor:graph[node]){
    if(neighbor==parent)continue;
    dfs_tree(neighbor,node,graph);
  }
}
```
我们来看一道题：

<h1 style="\\\*\\\*font-weight:bold; color:#222;\\\*\\\*">单词搜索：</h1>

给你两个数m，n，表示网格的行数和列数。给你一个单词word，表示要搜索的单词。如果word在网格中，返回true，否则返回false。

单词必须按照字母排序，通过相邻的单元格内的字母构成。其中“相邻”单元格是水平相邻或垂直相邻的单元格。
同一单元格内的字母不允许重复使用。

```cpp linenums="1" title="单词搜索.cpp"
#include<bits/stdc++.h>
using namespace std;

int dx[4]={0,0,1,-1};
int dy[4]={1,-1,0,0};
int m,n;
string word;
bool dfs(int x,int y,int index,vector<vector<char>>&board,vector<vector<bool>>&visited){
  if(board[x][y]!=word[index])return false;
  if(index==word.size()-1)return true;
  visited[x][y]=true;
  for(int i=0;i<4;i++){
    int nx=x+dx[i];
    int ny=y+dy[i];
    if(nx<0||nx>=m||ny<0||ny>=n||visited[nx][ny])continue;
    if(dfs(nx,ny,index+1,board,visited))return true;
  }
  visited[x][y]=false;
  return false;
}
int main(){
  cin>>m>>n;
  vector<vector<char>>board(m,vector<char>(n));
  for(int i=0;i<m;i++){
    for(int j=0;j<n;j++){
      cin>>board[i][j];
    }
  }
  cin>>word;
  vector<vector<bool>>visited(m,vector<bool>(n));
  bool found=false;
  for(int i=0;i<m;i++){
    for(int j=0;j<n;j++){
      if(dfs(i,j,0,board,visited)){
        found=true;
        break;
      }
    }
    if(found)break;
  }
  if(found)cout<<"true"<<endl;
  else cout<<"false"<<endl;
  return 0;
}
```