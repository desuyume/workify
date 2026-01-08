import type { PutObjectCommandOutput } from '@aws-sdk/client-s3'

export interface StorageFileResponse extends PutObjectCommandOutput {
  fileName: string
}
