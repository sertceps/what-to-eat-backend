import { Controller, Get, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetPoiListReqDto } from './dtos/get-poi-list.req.dto';
import { PoiService } from './poi.service';
import { GetPoiListOkResDto, GetPoiListErrorResDto } from './dtos/get-poi-list.res.dto';

@ApiTags('POI')
@Controller('poi')
export class PoiController {
  constructor(private readonly poiService: PoiService) {}

  @ApiOperation({ summary: '获取周边 POI 列表' })
  @ApiOkResponse({ type: GetPoiListOkResDto })
  @ApiBadRequestResponse({ type: GetPoiListErrorResDto })
  @Get('around')
  async getPoiListByRadius(@Query() { location, radius }: GetPoiListReqDto) {
    const { data } = await this.poiService.getPoiListByRadius(location, radius);
    return { data: data?.pois };
  }
}
