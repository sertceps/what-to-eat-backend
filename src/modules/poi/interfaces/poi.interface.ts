export interface Poi {
  /** 地址 */
  address: string;
  /** 距离 */
  distance: string;
  pcode: string;
  adcode: string;
  pname: string;
  cityname: string;
  type: string;
  typecode: string;
  adname: string;
  citycode: string;
  /** 名称 */
  name: string;
  /** 定位 */
  location: string;
  id: string;
}

type Info = 'OK' | 'INVALID_PARAMS';

export interface PoiRes {
  status: '0' | '1';
  info: Info;
  infocode: string;
  count?: string;
  pois?: Poi[];
}
