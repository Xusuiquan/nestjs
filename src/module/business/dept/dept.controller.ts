import { Body, Controller, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags,  } from "@nestjs/swagger";
import { DeptService } from "./dept.service";
import { CreateDeptDto } from "./dto";

@ApiBearerAuth()
@ApiTags('部门管理')
@Controller('/dept')
export class DeptController {
    constructor(private readonly deptService: DeptService) {}

    @Post()
    @ApiOperation({ summary: '创建部门' })
    create(@Body() createDeptDto: CreateDeptDto) {
        return this.deptService.create(createDeptDto);
    }
}