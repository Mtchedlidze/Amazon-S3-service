import { v4 } from 'uuid'

export default function getParams(req) {
  const [data] = req.files
  const file = data.originalname.split('.')
  const fileType = file[file.length - 1]
  const { path } = req.query
  const params = {
    Bucket: process.env.BUCKET,
    Key: `${path}/${v4()}.${fileType}`,
    Body: data.buffer,
  }
  return params
}
