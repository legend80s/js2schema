export interface IJS2schemaOptions {
  title: string;
  shouldConvertNumberString: boolean;
  typeResolvers: ITypeResolvers;
}

/**
 * js 对象或数组转成具备更多信息的 schema
 * @returns json schema
 */
export const js2schema: (jsObject: IJSObject, options: IJS2schemaOptions) => ISchema;

interface IModifySchemaOption {
  jsonSchema: ISchema;
  jsObject: IJSObject;
  typeResolvers: ITypeResolvers;
  shouldConvertNumberString: boolean;
}

export type IJSObject = object | any[];

export type ITypeResolvers = Partial<{
  image: IResolver;
  url: IResolver;
  floatString: IResolver;
  integerString: IResolver;
  float: IResolver;
  integer: IResolver;
  string: IResolver;
  text: IResolver;
}>;

export interface IResolver {
  is: (value: string) => boolean;
  type: (value: string) => string;
}

export interface ISchema {
  [x: string]: any,
  type: 'number' | 'integer' | 'string' | 'boolean' | 'null' | 'array' | 'object';
}
