import { CanActivate, ExecutionContext, Injectable,  } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const req = ctx.switchToHttp().getRequest();

        const role = this.reflector.getAllAndOverride('role', [ctx.getClass(), ctx.getHandler()])

        if (role) {
            return this.hasRole(role, req.user.roles);
        }

        return true;
    }

    /**
     * 检查用户是否属于某个角色
     * @param role 
     * @param roles 
     * @returns 
     */
    hasRole(role: string, roles: string[]) {
        return roles.includes(role);
    }
}