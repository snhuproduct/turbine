import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ActivityMappingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  sessionId: string;

  @Column()
  assessmentId: string;
}
