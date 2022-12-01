import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class LearnosityAssessmentReportEntity {
  @PrimaryColumn({ unique: true })
  sessionId: string;

  @Column()
  assessmentId: string;

  @Column()
  userId: string;

  @Column()
  isEvaluated: boolean;

  //   @Column('time', { name: 'last_modified_time' })
  //   lastModified: Date;
}
