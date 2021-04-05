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
    integer1: 30000,
    integer2: '30000',
    integer3: '30000.00',
    float1: 30000.01,
    float2: '30000.01',
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
        "integer1": {
          "type": "integer",
          "description": "30000"
        },
        "integer2": {
          "type": "integer",
          "description": "30000"
        },
        "integer3": {
          "type": "integer",
          "description": "30000.00"
        },
        "float1": {
          "type": "float",
          "description": "30000.01"
        },
        "float2": {
          "type": "float",
          "description": "30000.01"
        }
      },
      "description": "left"
    }
  },
  "description": "my-card"
}
```

## Why

[generate-schema](https://www.npmjs.com/package/generate-schema)

支持类型包括：

- Array
- Object
- Number
- String
- URL
- Image
- Boolean

其他不常用的暂时没有支持（Text RichText Color Enum Date Box）。

## Run tests

```sh
npm test
```

## Publish

```sh
tnpm version major / minor / patch && tnpm publish && gp && gp --tags
```

## Author

👤 **legend80s**

* Github: [@legend80s](https://github.com/legend80s)

> 能省一分钟是一分钟能给别人也省一分是真爱 ❤️

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/legend80s/js2schema/issues).

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
