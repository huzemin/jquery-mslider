## 简单的jQuery焦点图插件
---

#### 资源引用说明

要先导入jQuery库

```js
    <link type="text/css" rel="stylesheet" href="/jquery.mslider.css" />
    <script type="text/javascript" src="/jquery.mslider.js"></script>
```
#### HTML结构设置

```html
  <div class="jslider">
    <div class="jsimg">
        <ul>
            <li><img src="{image url}" /></li>
            <li><img src="{image url}" /></li>
            <li><img src="{image url}" /></li>
            ...
        </ul>
    </div>
    <!-- 以下可以省略 -->
    <div class="jsflag">
    </div>
</div>
```

#### js调用

```js
  $(document).ready(function(){
     $('.jslider').mslider({interval:2000});
  })
```
