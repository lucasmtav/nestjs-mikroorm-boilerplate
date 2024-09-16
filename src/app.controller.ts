import { MikroORM } from '@mikro-orm/core';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './modules/auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private orm: MikroORM,
  ) {}

  @Public()
  @Get('healthcheck')
  async getHealthCheck(): Promise<any> {
    const isConnected = await this.orm.isConnected();
    const check = await this.orm.checkConnection();
    return Object.assign({}, { isConnected, check });
  }
}
