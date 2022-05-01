import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Chat_messages' })
export class ChatMessagesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false })
  image: boolean;

  @Column()
  chat_room_id: number;

  @Column()
  user_id: number;

  @Column({ type: 'text' })
  message: string;

  @CreateDateColumn()
  created_at: Date;
}
