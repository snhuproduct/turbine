export function tobogganCommon(): string {
  return 'toboggan-common';
}

export interface IGroup {
  groupName: string;
  type: number;
}

export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  groups: IGroup[];
}
