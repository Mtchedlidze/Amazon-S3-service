/* eslint-disable comma-dangle */
import s3 from '../awsconfig.js'

export default function open(file) {
  return s3.getObject({ Bucket: 'filemanagment', Key: file }).createReadStream()
}
