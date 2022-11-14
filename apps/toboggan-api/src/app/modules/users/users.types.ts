export enum UserType {
  Learner = 'learner',
  Faculty = 'faculty',
  Other = 'other',
}

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
}
export interface ICreateUser {
  first_name: string;
  last_name: string;
  email: string;
  user_type: UserType;
  user_type_ref?: string;
  user_groups?: string[];
  status?: UserStatus;
  is_registered?: boolean;
  failed_login_attempts_count?: number;
  access_api_docs?: boolean;
}
