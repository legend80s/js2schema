const { js2schema } = require('..');

describe('js2schema', () => {
  it('example in README', () => {
    const input = {
      site: [
        {
          name: 'alipay',
          logo: 'https://img.alicdn.com/tfs/TB1qEwuzrj1gK0jSZFOXXc7GpXa-32-32.ico'
        }
      ]
    };
    const actual = js2schema(input, 'configurations');
    const expected = {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "title": "configurations",
      "type": "object",
      "properties": {
        "site": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string",
                "description": "alipay"
              },
              "logo": {
                "type": "string",
                "description": "https://img.alicdn.com/tfs/TB1qEwuzrj1gK0jSZFOXXc7GpXa-32-32.ico"
              }
            },
            "description": "site/0"
          },
          "description": "site"
        }
      },
      "description": "configurations"
    };

    // console.log('actual:', JSON.stringify(actual, null, 2));

    expect(actual).toEqual(expected);
  });

  it('string, number, boolean and nested', () => {
    const input = {
      "left": {
        "desc": "description of left part",
        "amount": "30000.00",
        "age": "25",
      },
      "middle": {
        "title": "the title of the middle part",

        nested: {
          showBtn: true,
        }
      },
    };

    const actual = js2schema(input, 'my-card');
    const expected = {
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
            },
            "age": {
              "type": "integer",
              "description": "25"
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
    };

    // console.log('actual:', JSON.stringify(actual, null, 2));

    expect(actual).toEqual(expected);
  });
});
