import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateDeptDto } from "./dto";
import { ResultData } from "src/module/common/utils/result";
import { DeptEntity } from "./entities/dept.entity";

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(DeptEntity)
    private readonly deptRepo: Repository<DeptEntity>,
  ) {}

  async create(createDeptDto: CreateDeptDto) {
    const res = await this.deptRepo.save(createDeptDto);
    return ResultData.ok();
  }
}
