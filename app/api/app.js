/* eslint-disable import/extensions */
import express from 'express'
import bodyParser from 'body-parser'
import swagger from 'swagger-ui-express'
import cors from 'cors'
import router from './router/router.js'
import doc from './swagger.js'

const app = express().use(bodyParser.json())
app.use(cors({ origin: '*' }))
app.use(swagger.serve)
app.get('/', swagger.setup(doc))

app.use(router)
app.listen(process.env.PORT || 3000)
