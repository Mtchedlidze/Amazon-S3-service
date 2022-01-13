/* eslint-disable comma-dangle */
import s3 from '../awsconfig.js'

export default function deleteObj(file) {
  const response = {}

  s3.deleteObject({ Bucket: process.env.BUCKET, Key: file }).on(
    'error',
    (err) => {
      response.error = new Error(err)
    }
  )
  response.message = 'file deleted'

  return response
}
