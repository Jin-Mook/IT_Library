import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Book_comments' })
export class BookCommentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  book_id: number;

  @Column()
  user_id: number;

  @Column({ type: 'text' })
  comment_title: number;

  @Column()
  comment_rating: number;

  @Column({ type: 'datetime' })
  comment_date: Date;

  @Column({ type: 'text', nullable: true })
  comment_context: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
