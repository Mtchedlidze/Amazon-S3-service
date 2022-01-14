import s3 from '../awsconfig.js'

export default async function open(file) {
  // return new Promise((resolve, reject) => {
  //   const res = s3
  //     .getObject({
  //       Bucket: 'filemanagment',
  //       Key: file,
  //     })
  //     .createReadStream()
  //     .on('error', (error) => {
  //       const err = {
  //         message: error.message,
  //         status: error.statusCode,
  //       }
  //       reject(err)
  //     })
  //     .once('data', resolve)
  // })

  try {
    const res = await s3
      .getObject({
        Bucket: 'filemanagment',
        Key: file,
      })
      .promise()

    return res.Body.data.createReadStream()
  } catch (error) {
    const err = {
      message: error.message,
      status: error.statusCode,
    }
    return err
  }
}
