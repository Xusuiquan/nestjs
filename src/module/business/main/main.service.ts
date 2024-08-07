import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto";

@Injectable()
export class MainService {
    constructor(
        private readonly userService: UserService,
    ) {}

    async login(user: LoginDto) {
        const loginRes = await this.userService.login(user);
        return loginRes;
    }
}