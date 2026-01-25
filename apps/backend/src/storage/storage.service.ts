import { StorageFileResponse } from '@/common/types/storage'
import {
  DeleteObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3'
import { Injectable } from '@nestjs/common'
import { randomBytes } from 'crypto'
import { extname } from 'path'

@Injectable()
export class StorageService {
  private readonly client: S3Client
  private readonly bucket: string

  constructor() {
    this.client = new S3Client({
      endpoint: process.env.S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
      },
      region: process.env.S3_REGION
    })

    this.bucket = process.env.S3_BUCKET_NAME
  }

  async getAll() {
    const command = new ListObjectsV2Command({
      Bucket: this.bucket
    })

    try {
      return await this.client.send(command)
    } catch (err) {
      console.error('Failed to retrieve file list from S3', err)
      throw err
    }
  }

  async upload(file: Express.Multer.File): Promise<StorageFileResponse> {
    const extension = extname(file.originalname)
    const fileName = randomBytes(16).toString('hex') + extension

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype
    })

    try {
      const commandResponse = await this.client.send(command)
      return {
        fileName,
        ...commandResponse
      }
    } catch (err) {
      console.error('Failed to uploading file to S3', err)
      throw err
    }
  }

  async delete(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key
    })

    try {
      return await this.client.send(command)
    } catch (err) {
      console.error('Failed to delete file from S3', err)
      throw err
    }
  }
}
