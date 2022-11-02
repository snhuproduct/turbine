/* eslint-disable @typescript-eslint/no-empty-interface */
export interface IAssessment {
  uuid: string;
  name: string;
  question: string | null;
  answer: string | null;
  context: string;
  status?: AssessmentStatus;
  options: never[] | null;
  question_type: string | null;
  activity_type: string | null;
  use_type: string | null;
  metadata: IAssessmentAlignments | null;
  author: string | null;
  difficulty: number | null;
  alignments: IAssessmentAlignments | null;
  parent_nodes: IAssessmentParentNodes;
  references: IAssessmentReferences;
  child_nodes: IAssessmentAlignments | null;
  assessment_reference: IAssessmentReference | null;
  achievements: string[];
  created_time: string;
  last_modified_time: string;
}

export enum AssessmentStatus {
  ReadyToBeScored = 'ready_to_be_scored',
  NotReadyToBeScored = 'not_ready_to_be_scored',
}

export interface IAssessmentAlignments {}

export interface IAssessmentReference {
  activity_id: string;
  activity_template_id: string;
  source: string;
}

export interface IAssessmentParentNodes {
  learning_experiences: string[];
  learning_objects: string[];
}

export interface IAssessmentReferences {
  competencies: any[];
  skills: any[];
}

export interface IAssessmentFlag {
  flag_status : boolean;
  comments : string;
}