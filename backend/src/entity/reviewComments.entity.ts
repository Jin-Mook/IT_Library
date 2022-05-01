import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Review_comments' })
export class ReviewCommentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  book_review_id: number;

  @Column()
  user_id: number;

  @Column()
  parent_comment_id: number;

  @Column({ type: 'text' })
  comment: string;

  @Column({ default: 0 })
  depth: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
