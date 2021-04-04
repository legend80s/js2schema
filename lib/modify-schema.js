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
  // console.log('----------------------------------------');
  // console.log({ jsonPointer, property, schema });
  // {
  //   jsonPointer: '/properties/left/properties/desc',
  //   property: 'desc',
  //   schema: { type: 'string' }
  // }

  if (jsonPointer === '') {
    schema.description = schema.title;

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

  // console.log('path:', path);
  // console.log('jsObject:', jsObject);
  // console.log('value:', value);

  // typeof value === 'undefined' when
  // jsonPointer = '/properties/site/items' then path = "site/items"
  if (typeof value === 'object') {
    schema.description = path.join('/');

    return;
  }

  schema.description = String(value);

  // https://github.com/nijikokun/generate-schema/issues/39#issuecomment-812971463
  if (Number.isInteger(value)) {
    const resolver = typeResolvers.integer;

    schema.type = resolver && (resolver.is ? resolver.is(value) : true) && resolver.type(value) || 'integer';

    return;
  }

  if (isFloat(value)) {
    const resolver = typeResolvers.float;

    schema.type = resolver && (resolver.is ? resolver.is(value) : true) && resolver.type(value) || 'number';

    return;
  }

  if (typeResolvers.image.is(value)) {
    schema.type = typeResolvers.image.type(value);
  } else if (typeResolvers.url.is(value)) {
    schema.type = typeResolvers.url.type(value);
  } else if (shouldConvertNumberString && typeof value === 'string') {
    if (typeResolvers.floatString.is(value)) {
      schema.type = typeResolvers.floatString.type(value);
    } else if (typeResolvers.integerString.is(value)) {
      schema.type = typeResolvers.integerString.type(value);
    }
  }
}


exports.defaultResolvers = defaultTypeResolvers;
exports.modifySchema = modifySchema;
