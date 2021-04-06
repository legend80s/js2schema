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
          "description": "site",
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
            "description": "items"
          }
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
              "type": "integer",
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
              "description": "nested"
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

  it('array of objects', () => {
    const input = [
      {
        "link": "wechat://",
        "seed": "wechat://",
        "image": "https://t.alipayobjects.com/images/rmsweb/T1xwNjXctcXXXXXXXX.jpeg_640xQ75"
      }
    ];
    const actual = js2schema(input, { title: 'Banner，填单个图片时不轮播' });
    const expected = {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "title": "Banner，填单个图片时不轮播 Set",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "link": {
            "type": "string",
            "description": "wechat://"
          },
          "seed": {
            "type": "string",
            "description": "wechat://"
          },
          "image": {
            "type": "string",
            "description": "https://t.alipayobjects.com/images/rmsweb/T1xwNjXctcXXXXXXXX.jpeg_640xQ75"
          }
        },
        "title": "Banner，填单个图片时不轮播",
        "description": "Banner，填单个图片时不轮播"
      },
      "description": "Banner，填单个图片时不轮播 Set"
    };

    expect(actual).toEqual(expected);
  });

  it('Should add all the strings in array as the description', () => {
    const products = [
      {
        tags: ["cold", "ice"],
      }
    ];
    const actual = js2schema(products, { title: 'Product' });

    const expected = {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "title": "Product Set",
      "description": "Product Set",
      "type": "array",
      "items": {
        "type": "object",
        "title": "Product",
        "description": "Product",
        "properties": {
          "tags": {
            "type": "array",
            "description": "cold | ice",
            "items": {
              "type": "string",
              "description": "cold"
            }
          }
        }
      }
    };

    expect(actual).toEqual(expected);
  });

  it('Should support integer type in example of `generate-schema`', () => {
    const input = [
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
    ];
    const actual = js2schema(input, { title: 'Product' });
    const expected = {
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
            "type": "integer",
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
            "description": "cold | ice",
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
    };

    expect(actual).toEqual(expected);
  });

  it('Should type be integer when all of the values are integer number', () => {
    const input = [
      {
        "id": 2,
      },
      {
        "id": 3,
      },
      {
        "id": 3.00,
      },
    ];

    const actual = js2schema(input, { title: 'Product' });
    const expected = {
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
            "type": "integer",
            "description": "2",
          },
        },
        "required": [
          "id",
        ]
      }
    };

    expect(actual).toEqual(expected);
  });

  it('Should type be integer when all of the values are integer string', () => {
    const input = [
      {
        "id": '4',
      },
      {
        "id": '4.00',
      },
    ];

    const actual = js2schema(input, { title: 'Product' });
    const expected = {
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
            "type": "integer",
            "description": "4",
          },
        },
        "required": [
          "id",
        ]
      }
    };

    expect(actual).toEqual(expected);
  });

  it('Should type be number when any of the values is float number', () => {
    const input = [
      {
        "id": 2,
      },
      {
        "id": 3.1,
      },
    ];

    const actual = js2schema(input, { title: 'Product' });
    const expected = {
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
            "type": "number",
            "description": "2",
          },
        },
        "required": [
          "id",
        ]
      }
    };

    expect(actual).toEqual(expected);
  });

  it('Should type be number when any of the values is float string', () => {
    const input = [
      {
        "id": '2',
      },
      {
        "id": '3.1',
      },
    ];

    const actual = js2schema(input, { title: 'Product' });
    const expected = {
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
            "type": "number",
            "description": "2",
          },
        },
        "required": [
          "id",
        ]
      }
    };

    expect(actual).toEqual(expected);
  });

  it('Should work when "/" in key', () => {
    const input = {
      site: [
        {
          name: 'alipay',
          'name/1': 'https://img.alicdn.com/tfs/TB1qEwuzrj1gK0jSZFOXXc7GpXa-32-32.ico',
          'name//1': 'https://img.alicdn.com/tfs/TB1qEwuzrj1gK0jSZFOXXc7GpXa-32-32.ico',
          'name~1': 'https://img.alicdn.com/tfs/TB1qEwuzrj1gK0jSZFOXXc7GpXa-32-32.ico',
        }
      ]
    };
    const actual = js2schema(input, { title: '对象' });

    // console.log('actual:', JSON.stringify(actual, null, 2));
    const expected = {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "title": "对象",
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
              "name/1": {
                "type": "string",
                "description": "name~11"
              },
              "name//1": {
                "type": "string",
                "description": "name~1~11"
              },
              "name~1": {
                "type": "string",
                "description": "name~01"
              }
            },
            "description": "items"
          },
          "description": "site"
        }
      },
      "description": "对象"
    };

    expect(actual).toEqual(expected);
  });
});
