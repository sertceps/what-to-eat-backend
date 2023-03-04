import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CommonConfigRegister } from '../config/registers/common.register';
import { PoiRes } from './interfaces/poi.interface';

@Injectable()
export class PoiService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CommonConfigRegister.KEY)
    private commonConfig: ConfigType<typeof CommonConfigRegister>,
  ) {}

  async getPoiListByRadius(location: string, radius = 500, pageNum = 1, pageSize = 10) {
    return firstValueFrom(
      this.httpService
        .get<PoiRes>(this.commonConfig.amapApiUrl, {
          params: {
            location,
            radius,
            page_num: pageNum,
            page_size: pageSize,
            key: this.commonConfig.amapKey,
            types: this.commonConfig.amapPoiType,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw error.cause;
          }),
        ),
    );
  }
}
