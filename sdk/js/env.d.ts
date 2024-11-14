import { Pool } from 'pg';

declare global {
  namespace NodeJS {
    interface Global {
      env: string;
      dbPool: Pool;
      config: any;
      agent: any;
    }
  }
}

export {};
