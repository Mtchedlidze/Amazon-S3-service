import s3 from '../awsconfig.js'

export default async function getStats(file) {
  const response = {}
  try {
    const data = await s3
      .headObject({ Bucket: process.env.BUCKET, Key: file })
      .promise()
    response.data = data
    return response
  } catch (err) {
    response.error = err.message
    response.statusCode = err.statusCode
    return response
  }
}
