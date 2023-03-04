import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PoiController } from './poi.controller';
import { PoiService } from './poi.service';

@Module({
  imports: [HttpModule],
  controllers: [PoiController],
  providers: [PoiService],
})
export class PoiModule {}
