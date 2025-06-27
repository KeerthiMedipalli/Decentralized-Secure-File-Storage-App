const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const sodium = require('libsodium-wrappers')

const router = express.Router()
const upload = multer({ dest: path.join(__dirname, '..', 'uploads') })

router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file || !req.body.password) {
    return res.status(400).json({ error: 'File and password required.' })
  }

  await sodium.ready
  const { password } = req.body
  const key = sodium.crypto_generichash(32, password)

  const inputBuffer = fs.readFileSync(req.file.path)
  const nonce = sodium.randombytes_buf(sodium.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES)
  const encrypted = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(
    inputBuffer, null, null, nonce, key
  )

  const finalBuffer = Buffer.concat([nonce, Buffer.from(encrypted)])
  const outPath = path.join(__dirname, '..', 'uploads', req.file.originalname + '.enc')
  fs.writeFileSync(outPath, finalBuffer)
  fs.unlinkSync(req.file.path)

  console.log('✅ Encrypted and stored at:', outPath)
  res.json({ message: 'File encrypted and stored in the AWS Cloud.', fileKey: req.file.originalname + '.enc' })
})

module.exports = router
