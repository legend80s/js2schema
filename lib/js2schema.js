const { json } = require('generate-schema')
const { modifySchema } = require('./modify-schema');

/**
 * Convert json or js object or array to json schema.
 * @param {IJSObject} jsObject
 * @param {IJS2schemaOptions} options
 * @returns {ISchema} json schema
 */
exports.js2schema = (
  jsObject,
  { title = '', shouldConvertNumberString = true, typeResolvers = {} } = {}
) => {
  const jsonSchema = json(title, jsObject);

  // console.log('jsObject:', jsObject);
  // console.log('jsonSchema before:', JSON.stringify(jsonSchema, null, 2));

  // modify to add description and specify the type from jsObject
  const detailedSchema = modifySchema({ jsonSchema, jsObject, typeResolvers, shouldConvertNumberString });
  // console.log('jsonSchema after:', JSON.stringify(jsonSchema, null, 2));

  return detailedSchema;
}
