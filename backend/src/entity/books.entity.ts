import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookCategoriesEntity } from './bookCategories.entity';
import { UsersEntity } from './users.entity';

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

  @ManyToOne(() => BookCategoriesEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'book_category', referencedColumnName: 'id' })
  bookCategories: BookCategoriesEntity;

  @Column({ type: 'text', nullable: true })
  book_info: string;

  @Column({ type: 'float', default: 0 })
  book_rating: number;

  @Column({ default: 0 })
  book_like_count: number;

  @Column({ default: 0 })
  comments_count: number;

  @ManyToMany(() => UsersEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinTable({
    name: 'Users_And_Books',
    joinColumn: { name: 'book_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: UsersEntity[];
}
