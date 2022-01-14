import s3 from '../awsconfig.js'
import generateError from './generateError.js'

export default async function getStats(file) {
  try {
    const data = await s3
      .headObject({ Bucket: process.env.BUCKET, Key: file })
      .promise()
    return { data }
  } catch (err) {
    return { error: generateError(err) }
  }
}
