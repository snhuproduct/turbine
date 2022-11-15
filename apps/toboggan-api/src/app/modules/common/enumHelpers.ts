export const enumToStringArray = (data: object): string[] => {
  const enumKv = Object.entries(data).map(([key, value]) => ({ key, value }));

  const keys: string[] = [];

  enumKv.forEach((kv) => {
    if (typeof kv.value === 'string') {
      keys.push(kv.value);
    }
  });

  return keys;
};

export const enumValidationOptions = (field: string, data: object) => {
  const allowedValues = enumToStringArray(data);

  return {
    message:
      `Only the following values are allowed for '${field}': ${allowedValues.join(
        ', '
      )}`.trimEnd(),
  };
};
