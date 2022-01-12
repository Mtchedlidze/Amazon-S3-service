/* eslint-disable import/extensions */
import express from 'express'
import bodyParser from 'body-parser'
import swagger from 'swagger-ui-express'
import cors from 'cors'
import upload from './upload.js'
import uploader from './storage.js'
import doc from './swagger.js'

const app = express().use(bodyParser.json())
app.use(cors({ origin: '*' }))
app.use(swagger.serve)
app.get('/', swagger.setup(doc))

app.post('/upload', uploader, async (req, res) => {
  const { error, data } = await upload(req)

  if (error) return res.status(500).send(error)

  res.status(200).send(data)
})
app.listen(process.env.PORT || 3000)
