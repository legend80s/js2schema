const get = require('lodash.get');
const merge = require('lodash.merge');

const traverse = require('json-schema-traverse');
const { isImageURL, isURL, isFloatStr, isIntegerStr, isFloat } = require('./is-type');

/**
 * @type {IModifySchemaOption['typeResolvers']}
 */
const defaultTypeResolvers = {
  image: {
    is: isImageURL,
    type: () => 'string',
  },

  url: {
    is: isURL,
    type: () => 'string',
  },

  floatString: {
    is: isFloatStr,
    type: () => 'number',
  },

  integerString: {
    is: isIntegerStr,
    type: () => 'integer',
  },

  // float: {
  //   type: () => 'number',
  // },

  // integer: {
  //   type: () => 'integer',
  // },

  string: {
    is: (value) => typeof value === 'string',
    type: () => 'string',
  },

  text: {
    is: (value) => typeof value === 'string',
    type: () => 'string',
  },
}

/**
 * @note will modify the input param jsonSchema
 * @param {IModifySchemaOption} options
 */
function modifySchema({ jsonSchema, jsObject, typeResolvers, shouldConvertNumberString }) {
  const resolvers = merge({}, defaultTypeResolvers, typeResolvers);

  // traverse(jsonSchema, { cb: (...args) => flesh.bind(null, jsObject, resolvers, shouldConvertNumberString, ...args) });
  traverse(jsonSchema, { cb: flesh.bind(null, jsObject, resolvers, shouldConvertNumberString) });

  return jsonSchema;
}

/**
 * Modify json schema to add more details such as descriptions and try the bast as I can to specify the type 😅.
 *
 * @param {object | any[]} jsObject
 * @param {IModifySchemaOption['typeResolvers']} typeResolvers
 * @param {IModifySchemaOption['shouldConvertNumberString']} shouldConvertNumberString
 *
 * @param {ISchema} schema
 * @param {string} jsonPointer
 * @param {ISchema} rootSchema
 * @param {string} parentJSONPointer
 * @param {string} parentKeyword
 * @param {ISchema} parentSchema
 * @param {string} property
 */
function flesh(jsObject, typeResolvers, shouldConvertNumberString, schema, jsonPointer, rootSchema, parentJSONPointer, parentKeyword, parentSchema, property) {

  // {
  //   jsonPointer: '/properties/left/properties/desc',
  //   property: 'desc',
  //   schema: { type: 'string' }
  // }

  if (jsonPointer === '') {
    schema.description = schema.description || schema.title;

    return;
  }

  const path = jsonPointer
    .replace('/properties/', '')
    .split('/properties/')
    .reduce((acc, key) => {
      // site/items => [site, 0]
      return acc.concat(key.split('/items').map(k => k === '' ? '0' : k));
    }, []);
  ;

  const value = get(jsObject, path);

  // if (jsonPointer.endsWith('tags') || jsonPointer.endsWith('items')) {
    // console.log('----------------------------------------');
    // console.log({ jsonPointer, property, schema, jsObject, path, value });
  // }

  if (typeof value === 'undefined') {
    schema.description = schema.description || schema.title || key;

    return;
  }

  // jsonPointer = '/properties/site/items' then path = "site/items"
  if (typeof value === 'object') {
    // console.log('path:', path);

    const key = jsonPointer.split('/').pop();

    // console.log('in value:', value);

    schema.description = schema.description || schema.title || (
      Array.isArray(value) && typeof value[0] !== 'object' ? value.join(' | ') : key
    );

    return;
  }

  // console.log('path:', path);

  // console.log('out value:', value);

  schema.description = schema.description || String(value);

  const allValues = getValues(jsObject, path);

  // console.log('allValues:', allValues);

  // https://github.com/nijikokun/generate-schema/issues/39#issuecomment-812971463
  if (allValues.every(Number.isInteger)) {
    const resolver = typeResolvers.integer;

    schema.type = resolver && (resolver.is ? resolver.is(value) : true) && resolver.type(value) || 'integer';

    return;
  }

  if (allValues.some(isFloat)) {
    const resolver = typeResolvers.float;

    schema.type = resolver && (resolver.is ? resolver.is(value) : true) && resolver.type(value) || 'number';

    return;
  }

  if (allValues.every(typeResolvers.image.is)) {
    schema.type = typeResolvers.image.type(value);
  } else if (allValues.some(typeResolvers.url.is)) {
    schema.type = typeResolvers.url.type(value);
  } else if (shouldConvertNumberString) {
    if (typeof value === 'string') {
      if (allValues.some(typeResolvers.floatString.is)) {
        schema.type = typeResolvers.floatString.type(value);
      } else if (allValues.every(typeResolvers.integerString.is)) {
        schema.type = typeResolvers.integerString.type(value);
      } else if (allValues.some(typeResolvers.text.is)) {
        schema.type = typeResolvers.text.type(value);
      } else {
        schema.type = typeResolvers.string.type(value);
      }
    }
  }
}

function isUndefined(value) {
  return typeof value === 'undefined';
}

/**
 * @param {object} jsObj
 * @param {(string | number)[]} jsonPath
 * jsObject: [ { id: 2 }, { id: 3.1 } ],
 * jsonPath: [0, 'id'] when jsonPointer: '/items/properties/id',
 *           [ '0', 'dimensions', 'width' ],
 * @returns {Array<string | number>} [2, 3.1]
 */
function getValues(jsObj, jsonPath) {
  const value = get(jsObj, jsonPath);

  if (jsonPath.length < 2) {
    return arrayify(value);
  }

  // is Array
  // [ '0', 'dimensions', 'width' ]
  // [ '0', 'dimensions', '0', 'width' ]
  if (jsonPath[0] == 0) {
    return jsObj.map(obj => get(obj, jsonPath.slice(1)));
  }

  return arrayify(value);
}

function arrayify(value) {
  return Array.isArray(value) ? value : [value];
}

exports.defaultResolvers = defaultTypeResolvers;
exports.modifySchema = modifySchema;
