import { camelCase, snakeCase } from 'lodash';

export function modelToCamelCase(apiModel) {
  if (!apiModel) {
    return;
  }
  if (Array.isArray(apiModel)) {
    return apiModel.map((v) => modelToCamelCase(v));
  } else if (apiModel != null && apiModel.constructor === Object) {
    return Object.keys(apiModel).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: modelToCamelCase(apiModel[key]) ?? apiModel[key], // optional operator for undefined values
      }),
      {}
    );
  }
  return apiModel;
}

export function modelToSnakeCase(apiModel) {
  if (!apiModel) {
    return;
  }
  if (Array.isArray(apiModel)) {
    return apiModel.map((v) => modelToSnakeCase(v));
  } else if (apiModel != null && apiModel.constructor === Object) {
    return Object.keys(apiModel).reduce(
      (result, key) => ({
        ...result,
        [snakeCase(key)]: modelToSnakeCase(apiModel[key]) ?? apiModel[key], // optional operator for undefined values
      }),
      {}
    );
  }
  return apiModel;
}
