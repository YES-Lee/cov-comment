
(function () {
  window.__doc__ = unescape('%23%20CovComment%0A%0A%21%5B%5D%28https%3A//img.shields.io/github/issues/YES-Lee/cov-comment%29%20%21%5B%5D%28https%3A//img.shields.io/github/license/YES-Lee/cov-comment%29%20%21%5B%5D%28https%3A//img.shields.io/github/stars/YES-Lee/cov-comment%29%20%21%5B%5D%28https%3A//img.shields.io/github/v/release/YES-Lee/cov-comment%29%20%21%5B%5D%28https%3A//img.shields.io/david/YES-Lee/cov-comment%29%0A%0A%u4E00%u4E2A%u57FA%u4E8E%60web%20components%60%u548C%60leanCloud%u5F15%u64CE%60%u5F00%u53D1%u7684%u535A%u5BA2%u8BC4%u8BBA%u63D2%u4EF6%0A%0A%u9884%u89C81%uFF1A%5Bhttps%3A//johnsonlee.site/post/cov-comment%5D%28https%3A//johnsonlee.site/post/cov-comment%29%0A%0A%u9884%u89C82%3A%20%5Bhttps%3A//yes-lee.github.io/cov-comment/%5D%28https%3A//yes-lee.github.io/cov-comment/%29%0A%0A%23%23%20%u7279%u6027%0A%0A*%20%u65E0%u9700%u767B%u5F55%u5373%u53EF%u8BC4%u8BBA%0A*%20%u96C6%u6210%u7B80%u5355%uFF0C%u53EF%u96C6%u6210%u4EFB%u4F55%u7C7B%u578B%u7F51%u7AD9%0A*%20%u652F%u6301%60markdown%60%0A*%20%u4F7F%u7528%5Bgravatar%5D%28https%3A//en.gravatar.com/%29%u5934%u50CF%0A%0A%23%23%20%u4F7F%u7528%0A%0A%23%23%23%20%u5F15%u5165%u63D2%u4EF6%0A%0A*%20%u4E0B%u8F7D%5Breleases%5D%28https%3A//github.com/YES-Lee/cov-comment/releases%29%u4E2D%u7684%60cov-comment-%7Bversion%7D.min.js%60%u6587%u4EF6%0A%0A*%20%u5728%u9879%u76EE%u4E2D%u4F7F%u7528%60script%60%u6807%u7B7E%u5F15%u5165%uFF0C%u5982%uFF1A%60%3Cscript%20src%3D%22path/to/cov-comment-1.0.0.min.js%22%60%0A%0A%23%23%23%20%u6CE8%u518Cleancloud%0A%0A%u8FDB%u5165%5Bleancloud%5D%28https%3A//leancloud.cn/%29%uFF0C%u6CE8%u518C%u8D26%u6237%u767B%u5F55%u540E%uFF0C%u521B%u5EFA%u5E94%u7528%uFF0C%u9009%u62E9%u5F00%u53D1%u7248%u3002%0A%0A%u521B%u5EFA%u6210%u529F%u4E4B%u540E%u8FDB%u5165%u5E94%u7528%u8BBE%u7F6E%u9762%u677F%uFF0C%u627E%u5230%u201C%u5E94%u7528keys%u201D%uFF0C%u590D%u5236%u91CC%u9762%u7684%60appId%60%u548C%60appKey%60%u3002%0A%0A%23%23%23%20%u6DFB%u52A0%u63D2%u4EF6%u4EE3%u7801%0A%0A%u5728%u9700%u8981%u653E%u7F6E%u8BC4%u8BBA%u63D2%u4EF6%u7684%u5730%u65B9%uFF0C%u52A0%u5165%u5982%u4E0B%u4EE3%u7801%uFF1A%0A%0A%60%60%60html%0A%3Ccov-comment%0A%20%20appid%3D%22leancloud%u7684appId%22%0A%20%20appkey%3D%22leancloud%u7684appKey%22%0A%20%20pageSize%3D%2210%22%0A%20%20placeholder%3D%22%u6765%u4E24%u53E5%u5427%uFF5E%22%0A%3E%3C/cov-comment%3E%0A%60%60%60%0A%0A%23%23%20%u63D2%u4EF6%u53C2%u6570%0A%0A%7C%u540D%u79F0%7C%u7C7B%u578B%7C%u662F%u5426%u5FC5%u586B%7C%u9ED8%u8BA4%u503C%7C%u8BF4%u660E%7C%0A%7C---%7C---%7C---%7C---%7C---%7C%0A%7Cappid%7Cstring%7C%u662F%7C%7Cleancloud%u7684%u5E94%u7528appId%7C%0A%7CappKey%7Cstring%7C%u662F%7C%7Cleancloud%u7684%u5E94%u7528appKey%7C%0A%7CpageSize%7Cnumber%7C%u5426%7C10%7C%u6BCF%u9875%u8BC4%u8BBA%u6570%u91CF%7C%0A%7Cplaceholder%7Cstring%7C%u5426%7C%u8BC4%u8BBA%u4E00%u4E0B%uFF5E%7C%u8BC4%u8BBA%u6846%u5360%u4F4D%u7B26%7C%0A%0A%23%23%20TODO%0A%0A*%20%5BBug%5D%20%u8BC4%u8BBA%u540E%u8BC4%u8BBA%u603B%u6570%u6CA1%u53D8%0A*%20%5BBug%5D%20%u65B0%u589E%u8BC4%u8BBA%u540E%uFF0C%u6DFB%u52A0%u5230%u4E86children%u91CC%u9762%0A%0A%23%23%20License%0A%0AThe%20MIT%20License%20%28MIT%29%0A%0ACopyright%20%28c%29%202020%20Johnson%0A')
})()
