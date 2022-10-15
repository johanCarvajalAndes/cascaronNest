import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { JoiValidationSchema } from './config/joi.validation';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: JoiValidationSchema, //puede ser este sola o los dos
    }),
    TypeOrmModule.forRoot({
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
  ],
})
export class AppModule {}
