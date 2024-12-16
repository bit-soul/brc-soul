import { Pool } from 'pg';

declare global {
  namespace NodeJS {
    interface Global {
      brcsoul_sdk_env: string;
      brcsoul_sdk_config: any;
      brcsoul_sdk_agent: any;
    }
  }
}

export {};
