import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "@api/auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'jordan',
      password: 'jordan96',
      database: 'empreintt_M2_2022',
      entities: [],
      autoLoadEntities: true,
      synchronize: true
    }),
      AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
