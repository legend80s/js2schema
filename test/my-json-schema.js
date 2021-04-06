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
  },
  string: {
    type: () => 'String',
  },
  text: {
    type: (value) => value.length >= 80 ? 'Text' : 'String',
  },
}

/**
 * @param {string} url
 * @returns {boolean}
 */
function isImageURL(src) {
  // https://inews.gtimg.com/newsapp_ls/0/13362798150_640330/0
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
 * Convert json or js object or array to json schema.
 * @param {object | any[]} jsObject
 * @param {string} [title] the schema title
 * @returns {ISchema} json schema
 */
exports.js2mySchema = (jsObject, title = '') => {
  const mySchema = js2schema(jsObject, { title, typeResolvers });

  return mySchema;
}
