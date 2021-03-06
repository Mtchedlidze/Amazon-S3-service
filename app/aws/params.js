import { v4 } from 'uuid'

export default function getParams(req) {
  const [data] = req.files
  const file = data.originalname.split('.')
  const fileType = file[file.length - 1]
  const { path } = req.query
  const params = {
    Bucket: 'filemanagment2',
    Key: path ? `${path}/${v4()}.${fileType}` : `${v4()}.${fileType}`,
    Body: data.buffer,
  }
  return params
}
