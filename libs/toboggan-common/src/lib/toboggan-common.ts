export function tobogganCommon(): string {
  return 'toboggan-common';
}

export interface IGroup {
  name: string;
  description: string | null;
  uuid: string;
  members: string[];
  permissions: string[];
}

export interface IAssessment {
  id: string;
  timeLeft: string;
  learner: string;
  result: string | null;
  resultComment: string | null;
  competency: string;
  type: string;
  attempts: number;
  currentAttempt: number;
  instructor: string;
  similarity: number;
  similarityUrl: string;
  evaluated: boolean;
  flagged: boolean;
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
