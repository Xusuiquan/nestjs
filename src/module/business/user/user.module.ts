import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ]
})
export class UserModule {}