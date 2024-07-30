import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, Length } from "class-validator";

export enum StatusEnum {
    STATIC = '0',
    DYNAMIC = '1',
}

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 30)
  userName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  sex?: string;
}
