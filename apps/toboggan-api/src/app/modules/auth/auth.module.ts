import { CacheModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { HTTPHeaderStrategy } from './http-header-strategy.service';

@Module({
  imports: [HttpModule, PassportModule, CacheModule.register()],
  providers: [HTTPHeaderStrategy],
})
export class AuthModule {}
