const GenerateSchema = require('generate-schema')
const { modifySchema } = require('./modify-schema');

/**
 * Convert json or js object or array to json schema.
 * @param {IJSObject} jsObject
 * @param {{ title: string; shouldConvertNumberString: boolean; typeResolvers: ITypeResolvers }} options
 * @returns {string} morpho schema @see https://yuque.antfin-inc.com/morpho/schema/syntax-intro
 */
exports.js2schema = (
  jsObject,
  { title = '', shouldConvertNumberString = true, typeResolvers = {} } = {}
) => {
  const jsonSchema = GenerateSchema.json(title, jsObject);

  // console.log('jsObject:', jsObject);
  // console.log('jsonSchema before:', JSON.stringify(jsonSchema, null, 2));

  // modify to add description and specify the type from jsObject
  const detailedSchema = modifySchema({ jsonSchema, jsObject, typeResolvers, shouldConvertNumberString });
  // console.log('jsonSchema after:', JSON.stringify(jsonSchema, null, 2));

  return detailedSchema;
}
