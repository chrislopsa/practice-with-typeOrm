import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { User } from '../users/users.entity';

@Entity('post')
export class Post{

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    title: string

    @Column()
    description: string

    @Column({ type: 'datetime', default: ()=> 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    author: User

}