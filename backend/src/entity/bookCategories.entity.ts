import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Book_categories' })
export class BookCategoriesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;
}
