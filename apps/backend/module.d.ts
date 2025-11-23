declare namespace NodeJS {
  export interface ProcessEnv {
    CLIENT_URL: string;
    BACKEND_PORT: number;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    UPLOAD_LOCATION: string;
  }
}
