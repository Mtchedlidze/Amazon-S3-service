/* eslint-disable import/extensions */
import s3 from './awsconfig.js'
import getParams from './params.js'

export default function storage(req) {
  const params = getParams(req)

  return new Promise((resolve, reject) => {
    s3.upload(params, (error, data) => {
      const response = {}
      if (error) {
        response.error = error
        reject(response)
      }

      response.data = data
      resolve(response)
    })
  })
}
