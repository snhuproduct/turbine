//! These types follow the Learnosity SDK documentation: https://github.com/Learnosity/learnosity-sdk-nodejs/blob/master/REFERENCE.md#init-arguments

export interface ILearnosityInitConfig {
  [key: string]: unknown;
}

export enum LearnosityInitStates {
  Initial = 'initial',
  Resume = 'resume',
  Review = 'review',
}

export enum LearnosityRenderingType {
  Inline = 'inline',
  Assess = 'assess',
}

export enum LearnosityStudentResponseStorageType {
  LocalPractice = 'local_practice',
  SubmitPractice = 'submit_practice',
  feedback = 'feedback',
}

export enum LearnosityAvailableAPIs {
  Assess = 'assess',
  Author = 'author',
  Data = 'data',
  Events = 'events',
  Items = 'items',
  Questions = 'questions',
  Reports = 'reports',
}

//ref: https://reference.learnosity.com/reports-api/reporttypes
// as of now only added type for rubric reference
export enum LearnosityReportTypes {
  SessionDetailByItem = 'session-detail-by-item',
}

export enum LearnosityDataActions {
  Get = 'get',
  Set = 'set',
  Update = 'update',
  Delete = 'delete',
}

// ref: https://reference.learnosity.com/items-api/initialization#type
export enum LearnositySubmissionTypes {
  localPractice = 'local_practice',
  submitPractice = 'submit_practice',
  feedback = 'feedback',
}

export interface ILearnositySecurityCredentials {
  consumer_key: string;
  domain: string;
  user_id?: string;
  timestamp?: string; // optional, SDK will generate this for you
}

interface IBaseLearnosityRequestPayload {
  user_id: string;
  access_api: LearnosityAvailableAPIs;
  data_action?: LearnosityDataActions;
  session_id: string; // uniquely identifies this specific assessment attempt for save/resume, data retrieval and reporting purposes. Here, we're using the Uuid helper to auto-generate a unique session id.
  activity_id: string; // a string you define, used solely for analytics to allow you run reporting and compare results of users submitting the same assessment.
  name: string; // human-friendly display name to be shown in reporting, via Reports API and Data API.
  state?: LearnosityInitStates; // - Optional. Can be set to initial, resume or review. initial is the default.
  config?: ILearnosityInitConfig; // Optional. A set of config values that can override the Activity configuration. For a full list of overridable configuration options, visit the Activities developer docs.
  rendering_type?: LearnosityRenderingType; // selects a rendering mode, assess mode is a "standalone" mode (loading a complete assessment player for navigation, as opposed to inline for embedding without).
}
export interface ILearnosityActivityRequestPayload
  extends IBaseLearnosityRequestPayload {
  activity_template_id: string; // reference of the Activity to retrieve from the Item bank. The Activity defines which Items will be served in this assessment.
  type: LearnosityStudentResponseStorageType; // selects the context for the student response storage. submit_practice mode means the student responses will be stored in the Learnosity cloud, allowing for grading and review.
}

export interface ILearnosityFeedbackRequestPayload
  extends IBaseLearnosityRequestPayload {
  type: LearnositySubmissionTypes;
  items: ILearnosityItemReference[];
}

export interface ILearnosityActivityWithFeedBackRequestPayload
  extends ILearnosityActivityRequestPayload {
  assess_inline: boolean;
}

export interface ILearnosityQuestion extends IBaseLearnosityRequestPayload {
  response_id: string;
  type: string;
  stimulus: string;
  stimulus_list: string[];
  possible_responses: string[];
  validation: {
    score: number;
    value: string[];
  };
}

export interface ILearnosityQuestionRequestPayload
  extends IBaseLearnosityRequestPayload {
  type: LearnosityStudentResponseStorageType;
  state: LearnosityInitStates;
  questions: ILearnosityQuestion[];
}

export interface ILearnosityDataRequestPayload
  extends IBaseLearnosityRequestPayload {
  references: string[];
}

export type LearnosityRequestTypes =
  | ILearnosityDataRequestPayload
  | ILearnosityQuestionRequestPayload
  | ILearnosityActivityRequestPayload
  | ILearnosityActivityWithFeedBackRequestPayload;

export interface ILearnosityAssesseeRequestPayload {
  activity_id: string;
  user_id: string;
  session_id: string;
  domain: string;
}

export interface ILearnosityResponse {
  request: ILearnosityResponseRequest;
}

export interface ILearnosityResponseRequest {
  security: ILearnosityRequestResponseSecurity;
  request: Record<string, unknown>;
}

export interface ILearnosityRequestResponseSecurity {
  consumer_key: string;
  domain: string;
  user_id: string;
  timestamp: string;
  signature: string;
}

export interface ILearnosityItemReference {
  id: string;
  reference: string;
}

export interface ILearnerFeedbackBodyRequest {
  itemReferences: ILearnosityItemReference[];
  userId: string;
}
