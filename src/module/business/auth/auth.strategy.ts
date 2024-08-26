import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
    /**
     * 客户端的请求必须使用 Authorization 作为请求头，前缀必须为 Bearer
     * 在解码授权令牌时，使用密钥 secretkey, 解析为 payload
     */
    constructor(
        private readonly config: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('jwt.secretkey'),
        })
    }

    /**
     * 解密后的 payload 作为参数传递给 validate 方法
     */
    async validate(payload: any) {
        // redis...
        return { userId: payload.sub, username: payload.username };
    }
}

