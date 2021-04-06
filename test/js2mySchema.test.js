const { js2schema } = require('..');
const { js2mySchema } = require('./my-json-schema');

describe('js2mySchema', () => {
  it('Should modify types using my typeResolvers', () => {
    const input = {
      url1: 'wechat://pay',
      url2: 'https://stackoverflow.com/',
      i1: '1',
      i2: 1,
      f1: 1.1,
      f2: '1.1',
      s1: 'HelloWorld',
      t1: 'HelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorld',
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
          "type": "String",
          "description": "HelloWorld"
        },
        "t1": {
          "type": "Text",
          "description": "HelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorld"
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

    expect(actual).toEqual(expected);
  });

  it('Should modify types by default', () => {
    const input = {
      url1: 'wechat://pay',
      url2: 'https://stackoverflow.com/',
      i1: '1',
      i2: 1,
      f1: 1.1,
      f2: '1.1',
      s1: 'HelloWorld',
      t1: 'HelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorld',
      image1: 'https://json-schema.org/understanding-json-schema/_static/logo.ico',
      image2: 'https://inews.gtimg.com/newsapp_ls/0/13362798150_640330/0',
    };
    const actual = js2schema(input);
    const expected = {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "title": "",
      "type": "object",
      "properties": {
        "url1": {
          "type": "string",
          "description": "wechat://pay"
        },
        "url2": {
          "type": "string",
          "description": "https://stackoverflow.com/"
        },
        "i1": {
          "type": "integer",
          "description": "1"
        },
        "i2": {
          "type": "integer",
          "description": "1"
        },
        "f1": {
          "type": "number",
          "description": "1.1"
        },
        "f2": {
          "type": "number",
          "description": "1.1"
        },
        "s1": {
          "type": "string",
          "description": "HelloWorld"
        },
        "t1": {
          "type": "string",
          "description": "HelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorldHelloWorld"
        },
        "image1": {
          "type": "string",
          "description": "https://json-schema.org/understanding-json-schema/_static/logo.ico"
        },
        "image2": {
          "type": "string",
          "description": "https://inews.gtimg.com/newsapp_ls/0/13362798150_640330/0"
        }
      },
      "description": ""
    };

    expect(actual).toEqual(expected);
  });
});
