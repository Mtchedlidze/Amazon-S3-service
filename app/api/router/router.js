import express from 'express'
import open from '../../aws/controllers/open.js'
import storage from '../../aws/controllers/storage.js'
import uploader from '../../uploader/uploader.js'
import deleteObj from '../../aws/controllers/delete.js'

const router = express.Router()

router.get('/open', (req, res) => {
  const { file } = req.query
  open(file, res)
})

router.post('/upload', uploader, async (req, res) => {
  const { error, data } = await storage(req)

  if (error) return res.status(500).send(error)

  res.status(200).send(data)
})

router.delete('/delete', async (req, res) => {
  const { file } = req.query

  const { error, message } = deleteObj(file)

  if (error) {
    return res.status(error.statusCode).send(error.message)
  }

  res.status(200).send(message)
})

export default router
