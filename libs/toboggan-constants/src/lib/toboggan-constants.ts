export function tobogganConstants(): string {
  return 'toboggan-constants';
}

export enum FormError {
  isRequired = ' is required',
  empty = 'This field can’t be empty',
  lettersAndNumbers = 'Use only letters and numbers',
  characters = 'Don’t use these characters: ',
  maxLength = 'You are exceeding the limit',
}