import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookReviewsEntity } from './bookReviews.entity';
import { UsersEntity } from './users.entity';

@Entity({ name: 'Review_comments' })
export class ReviewCommentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  book_review_id: number;

  @ManyToOne(() => BookReviewsEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'book_review_id', referencedColumnName: 'id' })
  bookReviews: BookReviewsEntity;

  @Column()
  user_id: number;

  @ManyToOne(() => UsersEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  users: UsersEntity;

  @Column()
  parent_comment_id: number;

  @ManyToOne(() => ReviewCommentsEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_comment_id', referencedColumnName: 'id' })
  parentComments: ReviewCommentsEntity;

  @Column({ type: 'text' })
  comment: string;

  @Column({ default: 0 })
  depth: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
