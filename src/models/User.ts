import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firsName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column()
    email: string

    @Column()
    password: string

    @Column({default: true})
    state: boolean
}