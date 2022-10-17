import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { JoiValidationSchema } from './config/joi.validation';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: JoiValidationSchema, //puede ser este sola o los dos
    }),
    TypeOrmModule.forRoot({
      ssl: process.env.NODE_ENV === 'prod',
      extra: {
        ssl:
          process.env.STAGE === 'prod' ? { rejectUnauthorized: false } : null,
      },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true, //falso en produccion
    }),
    CommonModule,
    ThrottlerModule.forRoot({
      ttl: +process.env.TTL,
      limit: +process.env.LIMIT_ENDPOINT,
    }),
  ],
})
export class AppModule {}
