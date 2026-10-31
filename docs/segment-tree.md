<h1>线段树</h1>
后面我会补上线段树的概念；

现在我们先写一题：

<h2>野生狗奶</h2>
现实生活中肯定是不会有野生狗奶的，毕竟没有加入表。
现在有n个数，一个代表时间的开始，一个代表时间的结束。代表牛奶的生产时间和过期时间。
你现在需要求出至少有一瓶牛奶不过期的最大时间段，以及中间没有牛奶的最大时间段。
<div style="text-align:center;">
<img src="../assets/gif/野生狗奶.jpg" style="width:280px; max-width:100%;" alt="野生狗奶"></div>

```cpp title="野生狗奶"
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);
    int n;
    cin >> n;
    struct time {
        int begin;
        int end;
    };
    vector<time> v(n);
    for (int i = 0; i < n; i++) {
        cin >> v[i].begin >> v[i].end;
    }

    sort(v.begin(), v.end(), [](const time &a, const time &b) {
        return a.begin < b.begin;
    });

    int st   = v[0].begin;   
    int en   = v[0].end;     
    int ne   = 0;           
    int next = 0;           
    int re1  = 0;     
    int re2  = 0;        

    for (int i = 1; i < n; i++) {
        ne   = v[i].begin;
        next = v[i].end;

        if (ne <= en) {
            en = max(en, next);
        } else {

            re1 = max(re1, en - st);   
            re2 = max(re2, ne - en);   
            st = ne;                  
            en = next;
        }
    }

    re1 = max(re1, en - st);

    cout << re1 << " " << re2 << "\n";
    return 0;
}
```