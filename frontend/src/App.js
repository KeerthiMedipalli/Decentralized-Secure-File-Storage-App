import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [file, setFile] = useState(null)
  const [password, setPassword] = useState('')
  const [uploadMessage, setUploadMessage] = useState('')
  const [fileKey, setFileKey] = useState('')
  const [downloadPassword, setDownloadPassword] = useState('')
  const [downloadMessage, setDownloadMessage] = useState('')

  const BACKEND_URL = 'http://52.5.177.21:5000'

  const handleUpload = async () => {
    if (!file || !password) return alert('Select a file and enter password.')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('password', password)

    try {
      const res = await axios.post(`${BACKEND_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setUploadMessage('✅ ' + res.data.message)
      setFileKey(file.name + '.enc')
    } catch (err) {
      setUploadMessage('❌ Upload failed: ' + (err.response?.data?.error || err.message))
    }
  }

  const handleDownload = async () => {
    if (!fileKey || !downloadPassword) return alert('Enter file name and password.')

    try {
      const res = await axios.post(`${BACKEND_URL}/download`, {
        fileKey,
        password: downloadPassword
      }, { responseType: 'blob' })

      const blob = new Blob([res.data])
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileKey.replace('.enc', '')
      a.click()

      setDownloadMessage('✅ File is downloaded from the decentralized storage through the blockchain.')
    } catch (err) {
      setDownloadMessage('❌ Download failed: ' + (err.response?.data?.error || err.message))
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 30 }}>
      <h2>🔐 Secure Decentralized Storage</h2>

      <h3>📤 Upload</h3>
      <input type="file" onChange={e => setFile(e.target.files[0])} /><br /><br />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleUpload}>Encrypt & Upload</button>
      <p style={{ color: uploadMessage.startsWith('✅') ? 'green' : 'red' }}>{uploadMessage}</p>

      <hr />

      <h3>📥 Download</h3>
      <input
        type="text"
        placeholder="Enter uploaded file name (e.g., invoice.pdf.enc)"
        value={fileKey}
        onChange={e => setFileKey(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Enter password"
        value={downloadPassword}
        onChange={e => setDownloadPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleDownload}>Decrypt & Download</button>
      <p style={{ color: downloadMessage.startsWith('✅') ? 'green' : 'red' }}>{downloadMessage}</p>
    </div>
  )
}

export default App
