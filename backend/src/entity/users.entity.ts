import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
