const express = require('express')
const fs = require('fs')
const path = require('path')
const sodium = require('libsodium-wrappers')

const router = express.Router()

router.post('/', async (req, res) => {
  const { fileKey, password } = req.body

  if (!fileKey || !password) {
    return res.status(400).json({ error: 'File name and password are required.' })
  }

  const filePath = path.join(__dirname, '..', 'uploads', fileKey)
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found.' })
  }

  try {
    await sodium.ready
    const key = sodium.crypto_generichash(32, password)

    const data = fs.readFileSync(filePath)
    const nonce = data.slice(0, sodium.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES)
    const encrypted = data.slice(sodium.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES)

    const decrypted = sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(
      null, encrypted, null, nonce, key
    )

    // ✅ Custom success message (for logging or header)


    res.setHeader('Content-Disposition', `attachment; filename="${fileKey.replace('.enc', '')}"`)

    res.send(Buffer.from(decrypted))
  } catch (err) {
    console.error('❌ Decryption failed:', err)
    res.status(500).json({ error: 'Decryption failed. Check your password or file.' })
  }
})

module.exports = router
