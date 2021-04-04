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
    const actual = js2schema(input, { title: 'configurations' });
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

  it('Should convert number string by default', () => {
    const input = {
      left: {
        desc: 'description of left part',
        number1: '30000.00',
        number2: 30000.01,
        integer1: '25',
        integer2: 25,
        integer3: 30000.00,
      },
    };

    const actual = js2schema(input, { title: 'my-card' });
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
            "number1": {
              "type": "number",
              "description": "30000.00"
            },
            "number2": {
              "type": "number",
              "description": "30000.01"
            },
            "integer1": {
              "type": "integer",
              "description": "25"
            },
            "integer2": {
              "type": "integer",
              "description": "25"
            },
            "integer3": {
              "type": "integer",
              "description": "30000"
            }
          },
          "description": "left"
        }
      },
      "description": "my-card"
    };

    // console.log('actual:', JSON.stringify(actual, null, 2));

    expect(actual).toEqual(expected);
  });

  it('Should not convert number string when disabled by configuration', () => {
    const input = {
      left: {
        desc: 'description of left part',
        number1: '30000.00',
        number2: 30000.00,
        integer1: '25',
        integer2: 25,
      },
    };

    const actual = js2schema(input, { title: 'my-card', shouldConvertNumberString: false });
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
            "number1": {
              "type": "string",
              "description": "30000.00"
            },
            "number2": {
              "type": "integer",
              "description": "30000"
            },
            "integer1": {
              "type": "string",
              "description": "25"
            },
            "integer2": {
              "type": "integer",
              "description": "25"
            }
          },
          "description": "left"
        }
      },
      "description": "my-card"
    };

    // console.log('actual:', JSON.stringify(actual, null, 2));

    expect(actual).toEqual(expected);
  });

  it('Should generate json schema against a nested one', () => {
    const input = {
      "middle": {
        "title": "the title of the middle part",

        nested: {
          showBtn: true,
        }
      },
    };

    const actual = js2schema(input, { title: 'my-card' });
    // console.log('actual:', actual);
    const expected = {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "title": "my-card",
      "type": "object",
      "properties": {
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
