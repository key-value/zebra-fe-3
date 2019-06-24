import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlatModule } from './plat/plat.module';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot(),PlatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
