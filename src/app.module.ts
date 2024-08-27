import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './module/business/user/user.module';
import { DeptModule } from './module/business/dept/dept.module';
import { MainModule } from './module/business/main/main.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './module/common/guard/auth.guard';
import { RolesGuard } from './module/common/guard/roles.guard';
import { AuthModule } from './module/business/auth/auth.module';
import configuration from './config/index';

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
      // synchronize: false, // 禁用自动同步
      dropSchema: false, // 禁用自动删除表结构
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
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
