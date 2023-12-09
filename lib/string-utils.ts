const MAX_TEXT_LENGTH = 175;

export const toKebabCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

export const truncateText = (value: string) => {
  if (value.length <= MAX_TEXT_LENGTH) {
    return value;
  }

  return `${value.substring(0, MAX_TEXT_LENGTH)}...`;
};
