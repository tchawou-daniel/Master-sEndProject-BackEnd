import { AuthModule } from '@api/auth/auth.module';
import { configValidationSchema } from '@api/config.schema';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { UsersWorkForCompaniesModule } from './usersWorkForCompanies/usersWorkForCompanies.module';
import { EmploymentModule } from './employment/employment.module';
import { EmploymentPeriodModule } from './employment-period/employment-period.module';
import { EmploymentDaysModule } from './employment-days/employment-days.module';

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

        return {
          ssh: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
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
        };
      },
    }),
    AuthModule,
    CompanyModule,
    UsersWorkForCompaniesModule,
    EmploymentModule,
    EmploymentPeriodModule,
    EmploymentDaysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
