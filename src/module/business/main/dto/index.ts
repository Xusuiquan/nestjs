import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";

export class LoginDto {
    @ApiProperty({ required: true, description: '用户名' })
    @IsString()
    @Length(2, 10)
    username: string; // 用户名

    @ApiProperty({ required: true, description: '密码' })
    @IsString()
    @Length(5, 10)
    password: string; // 密码

    @ApiProperty({ required: false, description: '验证码' })
    @IsOptional()
    @IsString()
    code?: string; // 验证码

    @IsOptional()
    @IsString()
    uuid?: string;
}

export class RegisterDto extends LoginDto {}