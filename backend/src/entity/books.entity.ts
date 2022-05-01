import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Books' })
export class BooksEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  book_title: string;

  @Column()
  book_image: string;

  @Column({ nullable: true })
  book_writer: string;

  @Column({ nullable: true })
  book_publisher: string;

  @Column({ type: 'date', nullable: true })
  book_publish_date: Date;

  @Column()
  book_category: number;

  @Column({ type: 'text', nullable: true })
  book_info: string;

  @Column({ type: 'float', default: 0 })
  book_rating: number;

  @Column({ default: 0 })
  book_like_count: number;

  @Column({ default: 0 })
  comments_count: number;
}
