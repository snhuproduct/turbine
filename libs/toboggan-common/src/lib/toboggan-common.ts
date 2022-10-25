export function tobogganCommon(): string {
  return 'toboggan-common';
}

export interface IGroup {
  id: string;
  name: string;
  type?: number;
  description: string | null;
  uuid?: string;
}

export type INewGroup = Omit<IGroup, 'id'>;

export interface IUser {
  id: string;
  user_id?: string;
  userName: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  groups?: IGroup[];
  user_groups?: IGroup[];
  enabled: boolean;
  last_name?: string | null;
  first_name?: string | null;
  user_type?: string | null;
  status?: string | null;
}
export enum IUserType {
  learner = "learner",
  faculty = "faculty"
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
