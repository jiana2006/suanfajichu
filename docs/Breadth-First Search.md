<h1 style="\\\*\\\*font-weight:bold; color:#222;\\\*\\\*">广度优先搜索：</h1>

如果说深搜是一条路走到黑，那么广搜就是一层一层地走。

广搜一般用于最少步数，最短距离，最少操作次数等问题。

广搜的是现实需要queue（队列）的。

我们先看一下广搜的实现：

```cpp linenums="1" title="广度优先搜索.cpp"
void bfs(int start,vector<vector<int>> &graph){
    queue<int> q;
    vector<bool>visited(graph.size(),false);
    vector<int>result;
    q.push(start);
    visited[start]=true;
    while(!q.empty()){
        int node=q.front();
        q.pop();
        for(auto neighbor:graph[node]){
            if(!visited[neighbor]){
               q.push(neighbor);
                visited[neighbor]=true;
            }
        }
    }
    for(int node:result){
        cout<<node<<" ";
    }
}
```