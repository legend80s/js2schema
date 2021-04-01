const GenerateSchema = require('generate-schema')
const traverse = require('json-schema-traverse');
const get = require('lodash.get');

/**
 * @param {object | any[]} jsObject
 * @param {string} [title] the whole schema title
 * @returns {string} standard json schema
 */
exports.js2schema = (jsObject, title = '', typeFormatters) => {
  const jsonSchema = GenerateSchema.json(title, jsObject);

  // modify to add description and infer the type from jsObject
  traverse(jsonSchema, { cb: (...args) => cb(jsObject, ...args) });

  return jsonSchema;
}

/**
 * Modify json schema to add more details such as descriptions and try the bast as I can to specify the type 😅.
 *
 * @param {object | any[]} jsObject
 * @param {ISchema} schema
 * @param {string} jsonPointer
 * @param {ISchema} rootSchema
 * @param {string} parentJSONPointer
 * @param {string} parentKeyword
 * @param {ISchema} parentSchema
 * @param {string} property
 */
function cb(jsObject, typeFormatters, schema, jsonPointer, rootSchema, parentJSONPointer, parentKeyword, parentSchema, property) {
  if (jsonPointer === '') {
    schema.description = schema.title;
  } else {
    const path = jsonPointer
      .replace('/properties/', '')
      .split('/properties/')
      .reduce((acc, key) => {
        // site/items => [site, 0]
        return acc.concat(key.split('/items').map(k => k === '' ? '0' : k));
      }, []);
    ;

    const value = get(jsObject, path);

    if (typeof value === 'object') {
      schema.description = path.join('/');
    } else {
      schema.description = String(value);

      const { number } = typeFormatters;

      if (isNumberStr(value)) {
        schema.type = 'Number';
      }
    }
  }
}

/**
 *
 * @param {string | number} str
 * @returns {boolean}
 */
function isNumberStr(str) {
  return str && typeof str == 'string' && Number.isFinite(Number(str));
}
