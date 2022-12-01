import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class LearnosityEvaluatedReportEntity {
  @PrimaryColumn({ unique: true })
  sessionId: string;

  @Column()
  assessmentId: string;

  @Column()
  userId: string;

  @Column()
  evaluationOriginId: string;

  //   @Column('time', { name: 'last_modified_time' })
  //   lastModified: Date;
}
