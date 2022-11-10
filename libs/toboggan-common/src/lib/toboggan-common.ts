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
  userType?: string | null;
  status?: string;
  userId: string;
  userName: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
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
  learner = 'learner',
  faculty = 'faculty',
}
export interface ILearner {
  uuid: string;
  first_name: string;
  middle_name?: string;
  last_name?: string;
  suffix?: string;
  prefix?: string;
  preferred_name?: string;
  preferred_first_name?: string;
  preferred_middle_name?: string;
  preferred_last_name?: string;
  preferred_name_type?: string;
  preferred_pronoun?: string;
  student_identifier?: string;
  student_identification_system?: string;
  personal_information_verification?: string;
  personal_information_type?: string;
  address_type?: string;
  street_number_and_name?: string;
  apartment_room_or_suite_number?: string;
  city?: string;
  state_abbreviation?: string;
  postal_code?: string;
  country_name?: string;
  country_code?: string;
  latitude?: string;
  longitude?: string;
  country_ansi_code?: number;
  address_do_not_publish_indicator?: string;
  telephone_number_type?: string;
  primary_telephone_number_indicator?: string;
  telephone_number?: string;
  phone_number?: string;
  telephone_do_not_publish_indicator?: string;
  telephone_number_listed_status?: string;
  email_address_type?: string;
  email_address: string;
  email_do_not_publish_indicator?: string;
  backup_email_address?: string;
  birth_date?: string;
  gender?: string;
  country_of_birth_code?: string;
  ethnicity?: string;
  employer_id?: string;
  employer?: string;
  employer_email?: string;
  organisation_email_id: string;
  affiliation?: string;
  is_archived: boolean;
  created_time: string;
  last_modified_time: string;
}

export interface ILearnerProfile {
  learner_id: string;
  learning_goals: string[];
  learning_constraints: any;
  learning_preferences: any;
  patterns_of_participation: any;
  employment_history: any;
  education_history: any;
  account_settings: any;
  communication_preferences: any;
  enrollment_information: any;
  attestation_object: any;
  learning_pathways: [];
  learning_experiences: [];
  uuid: string;
  is_archived: boolean;
  created_time: string;
  last_modified_time: string;
}

export type ILearnerInput = Omit<
  ILearner,
  | 'uuid'
  | 'phone_number'
  | 'backup_email_address'
  | 'is_archived'
  | 'created_time'
  | 'last_modified_time'
>;
