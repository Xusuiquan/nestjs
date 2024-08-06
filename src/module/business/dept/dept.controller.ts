import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { DeptService } from "./dept.service";
import { CreateDeptDto } from "./dto";

@ApiTags('部门管理')
@Controller('/dept')
export class DeptController {
    constructor(private readonly deptService: DeptService) {}

    @ApiOperation({ summary: '部门管理-创建' })
    @Post()
    create(@Body() createDeptDto: CreateDeptDto) {
        return this.deptService.create(createDeptDto);
    }
}