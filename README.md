<h1 align="center">Welcome to js2schema 👋</h1>
<p>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Convert JavaScript Object or Array to JSON Schema while **keeping the description and infer the type** from the pattern of the value AS BEST AS I CAN..
>

## Use

```javascript
const obj = {
  left: {
    desc: 'description of left part',
    amount: '30000',
  },

  middle: {
    title: 'the title of the middle part',

    nested: {
      showBtn: true,
    },
  },
};

const schema = js2schema(obj, 'my-card');
```

output schema：

```javascript
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "my-card",
  "type": "object",
  "properties": {
    "left": {
      "type": "object",
      "properties": {
        "desc": {
          "type": "string",
          "description": "description of left part"
        },
        "amount": {
          "type": "number",
          "description": "30000.00"
        }
      },
      "description": "left"
    },
    "middle": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "description": "the title of the middle part"
        },
        "nested": {
          "type": "object",
          "properties": {
            "showBtn": {
              "type": "boolean",
              "description": "true"
            }
          },
          "description": "middle/nested"
        }
      },
      "description": "middle"
    }
  },
  "description": "my-card"
}
```

## Why

> 请问现在有工具能根据返回值自动生成sd schema 吗？
>
> 输入
>
> ```js
> {
>   site: [ { name: 'alipay', logo: 'https://img.alicdn.com/tfs/TB1qEwuzrj1gK0jSZFOXXc7GpXa-32-32.ico' } ]
> }
> ```
>
> 输出
>
> ```js
> Object(对象) {
>     site(网站): Array {
>        name(标题): String
>        logo(图片): Image
>     }
> }
> ```

最近在手写sd schema，发现要是有个反解的工具就好了，开发者只要基于其修改就好了，比如想给我们的资金增长平台（即搭投平台）增加一个小工具，复制 json 或 js 自动生成sd schema。

由此就产生了这么个小工具。但是sd仅暴露了 `json2schema` 方法（json schema to sd schema），需要先转成 json schema 甚是麻烦，而且因为 json schema 会丢失很多有用信息，比如描述和类型，只有 string 类型能保留，不能区分 Image、URL、Number。

故『Modify json schema to add more details such as descriptions and **try the best as I can** to specify the type 😅.』

支持类型包括：

- Array
- Object
- Number
- String
- URL
- Image
- Boolean

其他不常用的暂时没有支持（Text RichText Color Enum Date Box）。

### 日常省一分钟系列

该工具生成的 schema 基本和手写的 90% 以上相似，对于复杂的 schema 结构节省新手的时间可以从十分钟级别降低到分钟级别。

## Run tests

```sh
npm test
```

## Publish

```sh
tnpm version major / minor / patch && tnpm publish && gp && gp --tags
```

## Author

👤 **chuanzong.lcz**

* Github: [@legend80s](https://github.com/legend80s)

> 能省一分钟是一分钟能给别人也省一分是真爱 ❤️

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://code.alipay.com/mengzou/js2schema/issues).

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
