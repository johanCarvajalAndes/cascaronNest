import { TypeOrmModule } from '@nestjs/typeorm';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [], //adicionar por comas las entities que se utilicen en las pruebas
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([]), //adicionar por comas las entities que se utilicen en las pruebas
];
