import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Chat_rooms' })
export class ChatRoomsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: true })
  public: boolean;

  @Column({ nullable: true })
  password: string;

  @Column()
  chat_title: string;

  @Column()
  chat_topic: string;

  @Column()
  total_person: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
