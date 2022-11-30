export function tobogganCommon(): string {
  return 'toboggan-common';
}

export interface IGroup {
  id: string;
  name: string;
  type?: number;
  description: string | null;
  uuid?: string;
  members?: string[];
}

export interface IAssessment {
  id: string;
  time_left: string;
  learner: string;
  competency: string;
  type: string;
  attempt: string;
  instructor: string;
  similarity: string;
}

export type INewGroup = Omit<IGroup, 'id'>;

export interface IUser {
  userType?: string | null;
  status?: string;
  userId: string;
  userName: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  groups?: IGroup[];
  userGroups?: IGroup[];
  enabled: boolean;
}

export type INewUser = Omit<IUser, 'userId'>;

export type IUpdatedUser = Omit<IUser, 'userId' | 'userName'>;

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
  Learner = 'learner',
  Faculty = 'faculty',
  Other = 'other',
}
