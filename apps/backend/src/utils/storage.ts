export const getFileName = (fileUrl: string): string => {
  const isWithoutSubdomain = fileUrl.startsWith(
    `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET_NAME}`
  )
  return fileUrl
    .split('/')
    .slice(isWithoutSubdomain ? 4 : 3)
    .join('/')
}

export const getFileUrl = (fileName: string): string => {
  const S3_PATH = process.env.S3_SUBDOMAIN
    ? `${process.env.S3_SUBDOMAIN}`
    : `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET_NAME}`

  return `${S3_PATH}/${fileName}`
}
