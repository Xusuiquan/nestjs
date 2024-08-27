import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('用户管理')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: '创建用户' })
    @Post()
    create(@Body() createDto: CreateUserDto) {
        return this.userService.create(createDto);
    }
}