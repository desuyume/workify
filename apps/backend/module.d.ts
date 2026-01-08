declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string
    CLIENT_URL: string
    BACKEND_PORT: number
    ACCESS_TOKEN_SECRET: string
    REFRESH_TOKEN_SECRET: string
    S3_ENDPOINT: string
    S3_ACCESS_KEY_ID: string
    S3_SECRET_ACCESS_KEY: string
    S3_REGION: string
    S3_BUCKET_NAME: string
  }
}
