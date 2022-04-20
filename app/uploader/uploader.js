import multer from 'multer'

const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, '')
  },
})
const uploader = multer({ storage }).any()

export default uploader
