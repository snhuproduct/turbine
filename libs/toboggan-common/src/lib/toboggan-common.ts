export function tobogganCommon(): string {
  return 'toboggan-common';
}

export interface Group {
  groupname: string;
  type: number;
}

export interface User {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    groups: Group[];
  }