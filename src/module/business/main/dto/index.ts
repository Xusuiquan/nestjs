import { IsOptional, IsString, Length } from "class-validator";

export class LoginDto {
    @IsString()
    @Length(2, 10)
    username: string; // 用户名

    @IsString()
    @Length(5, 10)
    password: string; // 密码

    @IsOptional()
    @IsString()
    code?: string; // 验证码

    @IsOptional()
    @IsString()
    uuid?: string;
}

export class RegisterDto extends LoginDto {}