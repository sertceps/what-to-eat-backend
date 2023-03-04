import { ApiProperty } from '@nestjs/swagger';

class PoiDto {
  /** 地址 */
  @ApiProperty({ description: '地址' })
  address: string;
  @ApiProperty({ description: '距离' })
  distance: string;
  @ApiProperty({ description: '名称' })
  name: string;
  @ApiProperty({ description: '定位' })
  location: string;
  pcode: string;
  adcode: string;
  pname: string;
  cityname: string;
  type: string;
  typecode: string;
  adname: string;
  citycode: string;
  id: string;
}

export class GetPoiListOkResDto {
  @ApiProperty({ type: [PoiDto] })
  data: PoiDto[];
}
export class GetPoiListErrorResDto {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  error: string;
}
