import express from 'express'
import open from '../../aws/controllers/open.js'
import storage from '../../aws/controllers/storage.js'
import uploader from '../../uploader/uploader.js'
import deleteObj from '../../aws/controllers/delete.js'
import getStats from '../../aws/controllers/stats.js'

const router = express.Router()

router.get('/open', async (req, res) => {
  const { file } = req.query
  const { data, error, status } = await open(file)
  if (error) {
    return res.status(status).send(error)
  }
  data.pipe(res)
})
router.get('/stats', async (req, res) => {
  const { file } = req.query
  const { data, statusCode, error } = await getStats(file)

  if (error) {
    return res.status(statusCode).send(error)
  }
  res.send(data)
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
    return res.status(500).send(error)
  }

  res.status(200).send(message)
})

export default router
