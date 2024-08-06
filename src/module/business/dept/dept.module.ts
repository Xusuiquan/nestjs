import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeptEntity } from './entities/dept.entity';
import { DeptController } from './dept.controller';
import { DeptService } from './dept.service';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([DeptEntity])
    ],
    controllers: [DeptController],
    providers: [DeptService],
})
export class DeptModule {}