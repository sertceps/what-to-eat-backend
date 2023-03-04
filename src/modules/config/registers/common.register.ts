import { registerAs } from '@nestjs/config';

export const CommonConfigRegister = registerAs('common', () => ({
  port: parseInt(process.env.PORT),
  amapKey: process.env.AMAP_KEY,
  amapApiUrl: process.env.AMAP_API_URL,
  amapPoiType: process.env.AMAP_POI_TYPE,
}));
