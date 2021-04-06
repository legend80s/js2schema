interface IJS2schemaOptions {
  title: string;
  shouldConvertNumberString: boolean;
  typeResolvers: ITypeResolvers;
}

/**
 * js 对象或数组转成具备更多信息的 schema
 * @returns json schema
 */
declare const js2schema: (jsObject: IJSObject, options: IJS2schemaOptions) => ISchema;

interface IModifySchemaOption {
  jsonSchema: ISchema;
  jsObject: IJSObject;
  typeResolvers: ITypeResolvers;
  shouldConvertNumberString: boolean;
}

type IJSObject = object | any[];

type ITypeResolvers = Partial<{
  image: IResolver;
  url: IResolver;
  floatString: IResolver;
  integerString: IResolver;
  float: IResolver;
  integer: IResolver;
  string: IResolver;
  text: IResolver;
}>;

interface IResolver {
  is: (value: string) => boolean;
  type: (value: string) => string;
}

interface ISchema {
  [x: string]: any,
  type: 'number' | 'integer' | 'string' | 'boolean' | 'null' | 'array' | 'object';
}
