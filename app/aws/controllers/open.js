import s3 from '../awsconfig.js'

export default async function open(file) {
  const response = {}
  try {
    const data = s3
      .getObject({
        Bucket: process.env.BUCKET,
        Key: file,
      })
      .createReadStream()
    response.data = data
    return response
  } catch (e) {
    const err = new Error(
      `Could not retrieve file from filestorage: ${e.message}`,
    )
    response.error = err
    response.status = e.statusCode
    return response
  }
}
