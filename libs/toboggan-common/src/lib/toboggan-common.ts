export function tobogganCommon(): string {
  return 'toboggan-common';
}

export interface IGroup {
  groupId?: string;
  name: string;
  type?: number;
  description: string;
}

export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  groups: IGroup[];
}
