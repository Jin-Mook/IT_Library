import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Book_revies' })
export class BookReviesEntity {
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
}
