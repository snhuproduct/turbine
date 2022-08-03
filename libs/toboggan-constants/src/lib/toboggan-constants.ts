export function tobogganConstants(): string {
  return 'toboggan-constants';
}


export class FormError {
  public static isRequired = ' is required';
  public static empty = 'This field can’t be empty';
  public static lettersAndNumbers = 'Use only letters and numbers';
  public static characters = 'Don’t use these characters: ';
}