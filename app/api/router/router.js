import express from 'express'
import open from '../../aws/controllers/open.js'
import storage from '../../aws/controllers/storage.js'
import uploader from '../../uploader/uploader.js'
import deleteObj from '../../aws/controllers/delete.js'
import getStats from '../../aws/controllers/stats.js'
import getList from '../../aws/controllers/lists.js'

const router = express.Router()

router.get('/open', async (req, res) => {
  const { file } = req.query
  const data = open(file)

  data.on('error', (err) => res.status(err.statusCode).send(err)).pipe(res)
})

router.get('/list', async (req, res) => {
  try {
    const response = await getList(req.query.path)
    res.send(response)
  } catch (err) {
    return res.status(500).send(err)
  }
})
router.get('/stats', async (req, res) => {
  const { file } = req.query
  try {
    const data = await getStats(file)
    return res.status(200).send(data)
  } catch (error) {
    res.status(error.statusCode).send(error)
  }
})

router.post('/create', uploader, async (req, res) => {
  const { error, data } = await storage(req)

  if (error) return res.status(500).send(error)

  res.status(200).send(data)
})

router.delete('/delete', async (req, res) => {
  const { file } = req.query

  const { error, message } = deleteObj(file)

  if (error) {
    return res.status(error.status).send(error)
  }

  res.status(204).send(message)
})

export default router
