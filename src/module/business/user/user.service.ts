import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto";
import { ResultData } from "src/module/common/utils/result";
import { JwtService } from "@nestjs/jwt";
import { LoginDto, RegisterDto } from "../main/dto";
import * as bcrypt from 'bcrypt';
import { GenerateUUID, GetNowDate } from "src/module/common/utils";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const res = await this.userRepo.save({ ...createUserDto });
    return ResultData.ok();
  }

  /**
   * 从数据声明生成令牌
   * @param playload 数据声明
   * @returns 令牌
   */
  createToken(playload: {uuid: string, userId: number}): string {
    const accessToken = this.jwtService.sign(playload);
    return accessToken;
  }

  /**
   * 从令牌中获取数据声明
   * @param token 令牌
   * @returns 数据说明
   */
  parseToken(token: string) {
    try {
        if (!token) return null;
        const payload = this.jwtService.verify(token.replace('Bearer ', ''));
        return payload;
    } catch (error) {
        return null;
    }
  }

  /**
   * 用户登陆
   */
  async login(user: LoginDto) {
    // 验证码逻辑暂时跳过

    const data = await this.userRepo.findOne({
        where: { userName: user.username },
        select: ['userId', 'password']
    })

    if (!(data && user.password === data.password)) {
    // if (!(data && bcrypt.compareSync(user.password, data.password))) {
        return ResultData.fail(500, '账号或密码错误')
    }

    // const userData = await this.getUserInfo(data.userId); // 获取用户详情数据
    const uuid = GenerateUUID();
    const token = this.createToken({ uuid, userId: data.userId})
    return ResultData.ok({ token }, '登陆成功');
  }

  async getUserInfo(userId: number) {
    const data = await this.userRepo.findOne({
        where: { userId: userId },
    })
    return data;
  }

  /**
   * 用户注册
   * @param user 
   */
  async register(user: RegisterDto) {
    const loginDate = GetNowDate();
    const checkUserNameUnique = await this.userRepo.findOne({
      where: {
        userName: user.username,
      },
      select: ['userName']
    })
    if (checkUserNameUnique) {
      return ResultData.fail(500, `保存用户'${user.username}'失败，注册账号已存在`);
    }
    const data = {
      ...user,
      userName: user.username,
      nickName: user.username,
      loginDate,
    }
    await this.userRepo.save(data)
    return ResultData.ok();
  }
}
