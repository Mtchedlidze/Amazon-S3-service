/* eslint-disable import/extensions */
import s3 from '../awsconfig.js'
import getParams from '../params.js'

export default async function storage(req) {
  const params = getParams(req)
  try {
    const data = await s3
      .upload({
        Key: params.Key,
        Body: params.Body,
        Bucket: params.Bucket,
      })
      .promise()

    return { data }
  } catch (err) {
    return { err }
  }
}
