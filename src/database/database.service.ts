/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';

@Injectable()
class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const adapter = new PrismaMariaDb({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      connectionLimit: 5,
    });

    super({ adapter });
  }

  async onModuleDestroy() {
    await this.$disconnect();

    console.log('😒🤞 Database connection closed.');
  }

  async onModuleInit() {
    await this.$connect();

    console.log('🔥✌️ Database connection established successfully.');
  }

  async enableShutdownHooks() {
    await this.$disconnect();
  }
}

export default DatabaseService;
