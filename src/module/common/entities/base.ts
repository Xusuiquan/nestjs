import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export abstract class BaseEntity {
    @ApiProperty({type: String, description: '创建者'})
    @Column({type: 'varchar', name: 'create_by', length: 64, default: '', comment: '创建者'})
    public createBy: string;

    @ApiProperty({type: String, description: '创建时间'})
    @Column({type: 'varchar', name: 'create_time', length: 64, default: null, comment: '创建时间'})
    public createTime: string;

    @ApiProperty({type: String, description: '更新者'})
    @Column({type: 'varchar', name: 'update_by', length: 64, default: '', comment: '更新者'})
    public updateBy: string;

    @ApiProperty({type: String, description: '更新时间'})
    @Column({type: 'varchar', name: 'update_time', length: 64, default: null, comment: '更新时间'})
    public updateTime: string;

    @ApiProperty({ type: String, description: '备注' })
    @Column({ type: 'varchar', name: 'remark', length: 500, default: null, comment: '备注' })
    public remark: string;
}