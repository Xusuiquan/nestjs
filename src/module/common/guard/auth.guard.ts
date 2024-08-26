import { ExecutionContext, ForbiddenException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Observable } from "rxjs";
import { UserService } from "src/module/business/user/user.service";
import { pathToRegexp } from "path-to-regexp";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    private globalWhiteList = []; // 白名单
    constructor(
        @Inject(UserService)
        private readonly userService: UserService,
        private readonly config: ConfigService, 
    ) {
        super();
        this.globalWhiteList = this.config.get('perm.router.whiteList') || [];
    }

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const isInWhiteList = this.checkWhitetList(ctx);
        if (isInWhiteList) return true;

        const req = ctx.switchToHttp().getRequest();
        const accessToken = req.get('Authorization');
        if (!accessToken) throw new ForbiddenException('请重新登录');
        const atUserId = this.userService.parseToken(accessToken);
        if (!atUserId) throw new UnauthorizedException('当前登录已过期，请重新登录');

        if (!accessToken.startsWith('Bearer ')) {
            throw new InternalServerErrorException('无效的token');
        }

        return await this.activate(ctx);
    }

    async activate(ctx: ExecutionContext): Promise<boolean> {
        return super.canActivate(ctx) as Promise<boolean>;
    }

    /**
     * 检查接口是否在白名单内
     * @param ctx 
     */
    checkWhitetList(ctx: ExecutionContext): boolean {
        const req = ctx.switchToHttp().getRequest();
        const data = this.globalWhiteList.find(route => {
            if (req.method.toUpperCase() === route.method.toUpperCase()) {
                return !!pathToRegexp(route.path).exec(req.url);
            }
            return false;
        })
        return !!data;
    }
}