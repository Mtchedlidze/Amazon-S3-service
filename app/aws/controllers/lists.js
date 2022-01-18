import s3 from '../awsconfig.js'

export default async function getList(path) {
  try {
    const data = await s3
      .listObjectsV2({
        Bucket: 'filemanagment2',
        Prefix: path,
      })
      .promise()
    return data.Contents
  } catch (error) {
    return { error }
  }
}
