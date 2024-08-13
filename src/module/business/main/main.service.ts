import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { LoginDto, RegisterDto } from "./dto";

@Injectable()
export class MainService {
    constructor(
        private readonly userService: UserService,
    ) {}

    async login(user: LoginDto) {
        return await this.userService.login(user);
    }

    async register(user: RegisterDto) {
        return await this.userService.register(user);
    }
}