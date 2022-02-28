declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: 'development' | 'production';
      PORT?: string;
      DB_DIALECT: 'mysql' | 'mariadb' | 'postgres';
      DB_CONNECTION_STRING?: string;
      DB_HOSTNAME: string;
      DB_PORT: string;
      DB_USERNAME: string;
      DB_PASSWORD?: string;
      DB_DATABASE: string;
    }
  }
}

export {};
