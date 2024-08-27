import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginDto, RegisterDto } from "./dto";
import { MainService } from "./main.service";

@ApiTags('根目录')
@Controller('/')
export class MainController {
    constructor(
        private readonly mainService: MainService,
    ) {}

    @ApiOperation({ summary: '登录' })
    @Post('/login')
    login(@Body() user: LoginDto) {
        return this.mainService.login(user);
    }

    @ApiOperation({ summary: '注册' })
    @Post('/register')
    register(@Body() user: RegisterDto) {
        return this.mainService.register(user);
    }

}