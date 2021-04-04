const js2schemaLib = require('./lib/js2schema');
const modifySchemaLib = require('./lib/modify-schema');
const isTypeLib = require('./lib/is-type');

exports.js2schema = js2schemaLib.js2schema;

exports.defaultResolvers = modifySchemaLib.defaultResolvers;
exports.modifySchema = modifySchemaLib.modifySchema;

exports.isIntegerStr = isTypeLib.isIntegerStr;
exports.isFloatStr = isTypeLib.isFloatStr;
exports.isImageURL = isTypeLib.isImageURL;
exports.isURL = isTypeLib.isURL;
