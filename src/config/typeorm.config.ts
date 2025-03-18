import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {

    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'kishore@217',
    database: 'userDetails',
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: true,
}