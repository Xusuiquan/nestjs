import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, Length } from "class-validator";

export enum StatusEnum {
    STATIC = '0',
    DYNAMIC = '1',
}

export class CreateUserDto {
  @ApiProperty({ required: true, description: '用户名' })
  @IsString()
  @Length(0, 30)
  userName: string;

  @ApiProperty({ required: false, description: '性别', example: '1' })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  sex?: string;
}
