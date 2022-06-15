import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BooksEntity } from './books.entity';
import { UsersEntity } from './users.entity';

@Entity({ name: 'Book_comments' })
export class BookCommentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  book_id: number;

  @ManyToOne(() => BooksEntity)
  @JoinColumn({ name: 'book_id', referencedColumnName: 'id' })
  books: BooksEntity;

  @Column()
  user_id: number;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  users: UsersEntity;

  @Column({ type: 'text' })
  comment_title: string;

  @Column()
  comment_rating: number;

  @Column({ type: 'text', nullable: true })
  comment_context: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
