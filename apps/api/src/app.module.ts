import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "@api/auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: '',
      host: '',
      port: ,
      username: '',
      password: '',
      database: '',
      entities: [],
      autoLoadEntities: true,
      synchronize: true
    }),
      AuthModule,
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
