export function tobogganCommon(): string {
  return 'toboggan-common';
}

export interface IGroup {
  groupName: string;
  type: number;
}

export interface IUser {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  groups?: IGroup[];
}
