export function tobogganCommon(): string {
  return 'toboggan-common';
}

export interface IGroup {
  id: string;
  name: string;
  type?: number;
  description: string | null;
}

export type INewGroup = Omit<IGroup, 'id'>;

export interface IUser {
  userType?: string;
  status?: string;
  id: string;
  userName: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  groups?: IGroup[];
  enabled: boolean;
}

export type INewUser = Omit<IUser, 'id'>;

export type IUpdatedUser = Omit<IUser, 'id' | 'userName'>;

export interface IAddUserToGroup {
  groupId: string;
  email: string;
}

export interface IPermission {
  id: string;
  application: string;
  module: string;
  accessLevel: string;
  userGroups: IGroup[];
}

export type INewPermission = Omit<IPermission, 'id'>;

export enum UserType {
  learner = "learner",
  faculty = "faculty"
}