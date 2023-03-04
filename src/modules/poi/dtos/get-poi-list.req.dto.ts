import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class GetPoiListReqDto {
  @ApiProperty()
  @IsNotEmpty({ message: '位置不能为空' })
  location: string;

  @ApiProperty({ required: false })
  @Max(2000, { message: 'radius 最大值应为 2000' })
  @Min(200, { message: 'radius 最小值应为 200' })
  @IsInt({ message: 'radius 应为整数' })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'radius 应为数字' })
  @Type(() => Number)
  @IsOptional()
  radius?: number;
}
