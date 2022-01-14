/* eslint-disable comma-dangle */
import s3 from '../awsconfig.js'

export default async function deleteObj(file) {
  const response = {}

  try {
    await s3.deleteObject({ Bucket: process.env.BUCKET, Key: file }).promise()
    response.message = 'file deleted'
    return response
  } catch (error) {
    response.error = error
    return response
  }
}
