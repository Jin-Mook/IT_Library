import { ChatRoomsEntity } from './chatRooms.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BooksEntity } from './books.entity';
import { BookReviewsEntity } from './bookReviews.entity';

@Entity({ name: 'Users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ default: 'local' })
  social: string;

  @Column({ type: 'boolean', default: false })
  email_check: boolean;

  @ManyToMany(() => BooksEntity)
  books: BooksEntity[];

  @ManyToMany(() => ChatRoomsEntity)
  chatRooms: ChatRoomsEntity[];

  @ManyToMany(() => BookReviewsEntity)
  bookReviews: BookReviewsEntity[];
}
