import s3 from '../awsconfig.js'

export default async function getStats(file) {
  const data = await s3
    .headObject({ Bucket: process.env.BUCKET, Key: file })
    .promise()

  return data
}
