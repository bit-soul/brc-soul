import { Pool } from 'pg';

declare global {
  namespace NodeJS {
    interface Global {
      env: string;
      config: any;
      agent: any;
    }
  }
}

export {};
