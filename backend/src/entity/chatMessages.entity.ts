import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatRoomsEntity } from './chatRooms.entity';
import { UsersEntity } from './users.entity';

@Entity({ name: 'Chat_messages' })
export class ChatMessagesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false })
  image: boolean;

  @Column()
  chat_room_id: number;

  @ManyToOne(() => ChatRoomsEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'chat_room_id', referencedColumnName: 'id' })
  chatRooms: ChatRoomsEntity;

  @Column()
  user_id: number;

  @ManyToOne(() => UsersEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  users: UsersEntity;

  @Column({ type: 'text' })
  message: string;

  @CreateDateColumn()
  created_at: Date;
}
