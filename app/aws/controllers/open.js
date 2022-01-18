/* eslint-disable comma-dangle */
import s3 from '../awsconfig.js'

export default function open(file) {
  return s3
    .getObject({ Bucket: 'filemanagment2', Key: file })
    .createReadStream()
}
