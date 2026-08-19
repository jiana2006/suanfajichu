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
<div style="text‑align:center; margin:20px 0;">
<video autoplay loop muted playsinline style="width:240px; max‑width:100%; border‑radius:8px;">
  <source src="/assets/shipin/naiwa.mp4" type="video/mp4">
</video>
</div>

include<bits/stdc++.h>

using namespace std;

void dfs(int n,int r){//r表示当前正在放置的奶娃的序号

    if(r>=n)return;

    //奶娃摆好

    dfs(n,r+1);//递归调用，摆放下一个奶娃

    //回溯

