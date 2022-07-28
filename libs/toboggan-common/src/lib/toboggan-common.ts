export function tobogganCommon(): string {
  return 'toboggan-common';
}

export interface IGroup {
  id: string;
  groupName: string;
  type: number;
}

export type INewGroup = Omit<IGroup, 'id'>;

export interface IUser {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  groups: IGroup[];
  enabled: boolean;
}

export type INewUser = Omit<IUser, 'id'>;
