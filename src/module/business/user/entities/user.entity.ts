import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from "src/module/common/entities/base";

@Entity('user', { comment: '用户表' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn({type: 'int', name: 'user_id', comment: '用户ID'})
    public userId: number;

    @Column({type: 'varchar', name: 'user_name', length: 30, nullable: false, comment: '用户账号'})
    public userName: number;
}