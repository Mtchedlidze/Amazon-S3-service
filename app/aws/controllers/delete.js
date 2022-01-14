/* eslint-disable comma-dangle */
import s3 from '../awsconfig.js'
import generateError from './generateError.js'

export default async function deleteObj(file) {
  try {
    await s3.deleteObject({ Bucket: process.env.BUCKET, Key: file }).promise()
    return { message: 'file deleted' }
  } catch (error) {
    return { error: generateError(error) }
  }
}
