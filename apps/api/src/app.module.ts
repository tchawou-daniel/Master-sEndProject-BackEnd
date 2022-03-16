import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "@api/auth/auth.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {configValidationSchema} from "@api/config.schema";

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: [`.env.stage.${process.env.STAGE}`],
        validationSchema: configValidationSchema,
      }),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
              const isProduction = configService.get('STAGE') === 'prod';

              return  {
                  ssh: isProduction,
                  extra: {
                      ssl: isProduction ? {rejectUnauthorized: false}: null,
                  },
                  entities: [],
                  autoLoadEntities: true,
                  synchronize: true,
                  type: 'postgres',
                  host: configService.get('DB_HOST'),
                  port: configService.get('DB_PORT'),
                  username: configService.get('DB_USERNAME'),
                  password: configService.get('DB_PASSWORD'),
                  database: configService.get('DB_DATABASE'),
              }
          }
      }),
      AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
