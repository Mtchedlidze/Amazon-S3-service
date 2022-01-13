import s3 from '../awsconfig.js'

export default function open(file, res) {
  s3.getObject({ Bucket: 'filemanagment', Key: file })
    .createReadStream()
    .on('error', (err) => {
      res.send(err)
    })
    .pipe(res)
}
