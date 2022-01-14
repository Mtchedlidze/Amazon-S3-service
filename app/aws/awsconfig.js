import aws from 'aws-sdk'

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
  region: 'eu-central-1',
})

export default s3
