import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/index';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './module/business/user/user.module';
import { DeptModule } from './module/business/dept/dept.module';
import { MainModule } from './module/business/main/main.module';

// 配置模块
const configModule = ConfigModule.forRoot({
  cache: true,
  isGlobal: true,
  load: [configuration],
})

// 数据库信息模块
const dbModule = TypeOrmModule.forRootAsync({
  imports: [configModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      type: 'mysql',
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      autoLoadEntities: true,
      keepConnectionAlive: true,
      timezone: '+08:00',
      ...configService.get('db.mysql'),
    } as TypeOrmModuleOptions
  }
})

@Module({
  imports: [
    configModule, // 配置模块
    dbModule, // 数据库信息模块
    UserModule,
    DeptModule,
    MainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
