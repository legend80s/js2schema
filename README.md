<h1 align="center">Welcome to js2schema 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/git-commit-msg-linter" target="_blank">
    <img alt="linter by git commit msg linter" src="https://img.shields.io/badge/lint-git%20commit%20msg%20linter-blue" />
  </a>
</p>

> Convert JavaScript Object or Array to JSON Schema while **keeping the description and inferring the type** from the pattern of the value AS BEST AS I CAN.

Based on [generate-schema#json](https://www.npmjs.com/package/generate-schema#example-1) but more powerful as js2schema will do it's best to **keep the description and infer the type** from the pattern of the **values** and is able to build your own JSON schema using `typeResolvers`.

- [Differences or Features](#differences-or-features)
- [Usage](#usage)
- [Example](#example)
  - [1. Added Description and smart integer type. 😘](#1-added-description-and-smart-integer-type-)
  - [2. Auto convert integer / float string to `integer` / `number` type 🍿](#2-auto-convert-integer--float-string-to-integer--number-type-)
  - [3. js2mySchema 🦄](#3-js2myschema-)
- [Run tests](#run-tests)
- [Publish](#publish)
- [Author](#author)
- [🤝 Contributing](#-contributing)
- [Show your support](#show-your-support)

## Differences or Features

1. **Add meaningful description** for every key as it can make the schema genereated form UI more readable. Readability aways counts.
2. **`integer` type supported** when **all** the values are integers. more at [Enhacements For JSON Schema - issue#39](https://github.com/nijikokun/generate-schema/issues/39). More precise type means stronger system.
3. Type will be resolved to `number` when **any** of the values is float.
4. **Auto convert integer / float string** to `integer` / `number` type and it can be turned off as your wish.
5. Last but not least. The powerful feature is you can **modify the type to whatever you want**, so you can build you own JavaScript type DSL. Jump to the exiciting [example](#3-js2myschema-) 😀.

*Many thanks to generate-schema.*

## Usage

```js
const { js2schema } = require('js2schema')
```

## Example

### 1. Added Description and smart integer type. 😘

Take the example from [GenerateSchema#json](https://www.npmjs.com/package/generate-schema#example-1):

```js
// Capture Schema Output
var schema = js2schema([
    {
        "id": 2,
        "name": "An ice sculpture",
        "price": 12.50,
        "tags": ["cold", "ice"],
        "dimensions": {
            "length": 7.0,
            "width": 12.0,
            "height": 9.5
        },
        "warehouseLocation": {
            "latitude": -78.75,
            "longitude": 20.4
        }
    },
    {
        "id": 3,
        "name": "A blue mouse",
        "price": 25.50,
        "dimensions": {
            "length": 3.1,
            "width": 1.0,
            "height": 1.0
        },
        "warehouseLocation": {
            "latitude": 54.4,
            "longitude": -32.7
        }
    }
], { title: 'Product' })
```

Outputs:

```js
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Product Set",
  "description": "Product Set",
  "type": "array",
  "items": {
    "description": "Product",
    "title": "Product",
    "type": "object",
    "properties": {
      "id": {
        "type": "integer", // id is expected to be "integer" but "number" in the example of generate-schema
        "description": "2",
      },
      "name": {
        "type": "string",
        "description": "An ice sculpture"
      },
      "price": {
        "type": "number",
        "description": "12.5"
      },
      "tags": {
        "description": "cold | ice", // meaningful description is added
        "type": "array",
        "items": {
          "description": "cold",
          "type": "string"
        }
      },
      "dimensions": {
        "type": "object",
        "description": "dimensions",
        "properties": {
          "length": {
            "type": "number",
            "description": "7"
          },
          "width": {
            "type": "integer",
            "description": "12"
          },
          "height": {
            "type": "number",
            "description": "9.5"
          }
        }
      },
      "warehouseLocation": {
        "type": "object",
        "description": "warehouseLocation",
        "properties": {
          "latitude": {
            "type": "number",
            "description": "-78.75"
          },
          "longitude": {
            "type": "number",
            "description": "20.4"
          }
        }
      }
    },
    "required": [
      "id",
      "name",
      "price",
      "dimensions",
      "warehouseLocation"
    ]
  }
}
```

There are two differences:

1. Descriptions are added for every key and we try to make it meaningful as possible.
2. `id` is always an `integer` and it's type is resolved to `integer` as we expected. Hooray 🎉.

### 2. Auto convert integer / float string to `integer` / `number` type 🍿

```javascript
const obj = {
  integer1: 30000,
  integer2: '30000',
  integer3: '30000.00',
  float1: 30000.01,
  float2: '30000.01',
};

const schema = js2schema(obj, { title: 'my-card' });
```

output schema:

```javascript
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "my-card",
  "description": "my-card",
  "type": "object",
  "properties": {
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
      "type": "number",
      "description": "30000.01"
    },
    "float2": {
      "type": "number",
      "description": "30000.01"
    }
  }
}
```

And it can be turned off as your wish.

```js
const schema = js2schema(input, { title: 'my-card', shouldConvertNumberString: false });
```

output schema:

```js
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "my-card",
  "description": "my-card",
  "type": "object",
  "properties": {
    "integer1": {
      "type": "integer",
      "description": "30000"
    },
    "integer2": {
      "type": "string",
      "description": "30000"
    },
    "integer3": {
      "type": "string",
      "description": "30000.00"
    },
    "float1": {
      "type": "number",
      "description": "30000.01"
    },
    "float2": {
      "type": "string",
      "description": "30000.01"
    }
  }
}
```

Only `integer1` is `integer` and `float1`  is `number`, the rest are resolved to `string` as it is.

### 3. js2mySchema 🦄

The powerful feature is you can modify the type to whatever you want using the `typeResolvers`, so you can build you own JavaScript type DSL ✍️.

```js
// my-json-schema.js

const { js2schema, defaultResolvers } = require('..');

/** @type {ITypeResolvers}  */
const typeResolvers = {
  image: {
    is: url => defaultResolvers.image.is(url) || isImageURL(url),
    type: () => 'Image',
  },
  url: {
    is: url => defaultResolvers.url.is(url) || isWechatURL(url),
    type: () => 'URL',
  },
  floatString: {
    type: () => 'Number',
  },
  integerString: {
    type: () => 'Number',
  },
  float: {
    type: () => 'Number',
  },
  integer: {
    type: () => 'Number',
  }
}

/**
 * @param {string} url
 * @returns {boolean}
 */
function isImageURL(src) {
  // Say we take https://inews.gtimg.com/newsapp_ls/0/13362798150_640330/0 as image url
  return src
    && typeof src === 'string'
    && ['https://inews.gtimg.com/'].some(prefix => src.startsWith(prefix))
  ;
}

/**
 * @param {string} url
 * @returns {boolean}
 */
function isWechatURL(url) {
  return url
    && typeof url === 'string'
    && ['wechat://'].some(prefix => url.startsWith(prefix))
  ;
}

/**
 * Convert json or js object or array to my json schema.
 * @param {object | any[]} jsObject
 * @param {string} [title] the schema title
 * @returns {string} json schema
 */
exports.js2mySchema = (jsObject, title = '') => {
  const mySchema = js2schema(jsObject, { title, typeResolvers });

  return mySchema;
}

```

Use `js2mySchema`:

```js
const { js2mySchema } = require('./my-json-schema');

const input = {
  url1: 'wechat://pay',
  url2: 'https://stackoverflow.com/',
  i1: '1',
  i2: 1,
  f1: 1.1,
  f2: '1.1',
  s1: '1.1a',
  image1: 'https://json-schema.org/understanding-json-schema/_static/logo.ico',
  image2: 'https://inews.gtimg.com/newsapp_ls/0/13362798150_640330/0',
};

const actual = js2mySchema(input);
const expected = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "",
  "type": "object",
  "properties": {
    "url1": {
      "type": "URL",
      "description": "wechat://pay"
    },
    "url2": {
      "type": "URL",
      "description": "https://stackoverflow.com/"
    },
    "i1": {
      "type": "Number",
      "description": "1"
    },
    "i2": {
      "type": "Number",
      "description": "1"
    },
    "f1": {
      "type": "Number",
      "description": "1.1"
    },
    "f2": {
      "type": "Number",
      "description": "1.1"
    },
    "s1": {
      "type": "string",
      "description": "1.1a"
    },
    "image1": {
      "type": "Image",
      "description": "https://json-schema.org/understanding-json-schema/_static/logo.ico"
    },
    "image2": {
      "type": "Image",
      "description": "https://inews.gtimg.com/newsapp_ls/0/13362798150_640330/0"
    }
  },
  "description": ""
};

```

As we can see, we have built our own type DSL JSON schema.

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
