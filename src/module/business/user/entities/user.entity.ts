import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from "src/module/common/entities/base";

@Entity('user', { comment: '用户表' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn({type: 'int', name: 'user_id', comment: '用户ID'})
    public userId: number;

    @Column({type: 'varchar', name: 'user_name', length: 30, nullable: false, comment: '用户账号'})
    public userName: string;

    @Column({type: 'varchar', length: 200, nullable: false, comment: '用户登陆密码'})
    public password: string;

    // 0女 1男 2未知
    @Column({ type: 'char', name: 'sex', default: '1', length: 1, comment: '性别' })
    public sex: string;
}