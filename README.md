# CovComment

![](https://img.shields.io/github/issues/YES-Lee/cov-comment) ![](https://img.shields.io/github/license/YES-Lee/cov-comment) ![](https://img.shields.io/github/stars/YES-Lee/cov-comment) ![](https://img.shields.io/github/v/release/YES-Lee/cov-comment) ![](https://img.shields.io/david/YES-Lee/cov-comment)

一个基于`web components`和`leanCloud引擎`开发的博客评论插件

预览1：[https://johnsonlee.site/post/cov-comment](https://johnsonlee.site/post/cov-comment)

预览2: [https://yes-lee.github.io/cov-comment/](https://yes-lee.github.io/cov-comment/)

## 特性

* 无需登录即可评论
* 集成简单，可集成任何类型网站
* 支持`markdown`
* 使用[gravatar](https://en.gravatar.com/)头像

## 使用

### 引入插件

* 下载[releases](https://github.com/YES-Lee/cov-comment/releases)中的`cov-comment-{version}.min.js`文件

* 在项目中使用`script`标签引入，如：`<script src="path/to/cov-comment-1.0.0.min.js"`

### 注册leancloud

进入[leancloud](https://leancloud.cn/)，注册账户登录后，创建应用，选择开发版。

创建成功之后进入应用设置面板，找到“应用keys”，复制里面的`appId`和`appKey`。

### 添加插件代码

在需要放置评论插件的地方，加入如下代码：

```html
<cov-comment
  appid="leancloud的appId"
  appkey="leancloud的appKey"
  pageSize="10"
  placeholder="来两句吧～"
></cov-comment>
```

## 插件参数

|名称|类型|是否必填|默认值|说明|
|---|---|---|---|---|
|appid|string|是||leancloud的应用appId|
|appKey|string|是||leancloud的应用appKey|
|pageSize|number|否|10|每页评论数量|
|placeholder|string|否|评论一下～|评论框占位符|

## TODO

* [Bug] 评论后评论总数没变
* [Bug] 新增评论后，添加到了children里面

## License

The MIT License (MIT)

Copyright (c) 2020 Johnson
