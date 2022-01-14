/* eslint-disable comma-dangle */
import s3 from '../awsconfig.js'

export default async function open(file) {
  return new Promise((resolve, reject) => {
    s3.getObject({ Bucket: 'filemanagment', Key: file }, (error, data) => {
      if (error) {
        reject(error)
      }
      resolve(data)
    }).createReadStream()
  })
}
