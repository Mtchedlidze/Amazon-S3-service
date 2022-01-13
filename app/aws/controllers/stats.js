import s3 from '../awsconfig.js'

export default function getStats(file, res) {
  s3.headObject({ Bucket: process.env.BUCKET, Key: file })
    .createReadStream()
    .on('error', (err) => res.send(err))
    .pipe(res)
}
