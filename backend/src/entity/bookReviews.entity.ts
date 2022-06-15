import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';

@Entity({ name: 'Book_reviews' })
export class BookReviewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  book_title: string;

  @Column()
  book_image: string;

  @Column()
  book_writer: string;

  @Column()
  book_publisher: string;

  @Column({ default: 0 })
  review_rating: number;

  @Column()
  book_recommend: string;

  @Column({ default: 0 })
  review_recommend_count: number;

  @Column({ default: 0 })
  view_track: number;

  @Column({ type: 'text' })
  context: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => UsersEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinTable({
    name: 'Users_And_BookReviews',
    joinColumn: { name: 'book_review_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: UsersEntity[];
}
