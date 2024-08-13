import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoginDto, RegisterDto } from "./dto";
import { MainService } from "./main.service";

@ApiTags('根目录')
@Controller('/')
export class MainController {
    constructor(
        private readonly mainService: MainService,
    ) {}

    @Post('/login')
    login(@Body() user: LoginDto) {
        return this.mainService.login(user);
    }

    @Post('/register')
    register(@Body() user: RegisterDto) {
        return this.mainService.register(user);
    }

}