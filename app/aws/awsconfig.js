import S3 from 'aws-sdk/clients/s3.js'

const { AWS_ID: id, AWS_SECRET: secret, AWS_REGION: region } = process.env

const s3 = new S3({
  region,
  accessKeyId: id,
  secretAccessKey: secret,
})

export default s3
