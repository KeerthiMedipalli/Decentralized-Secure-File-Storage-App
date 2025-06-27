import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [file, setFile] = useState(null)
  const [password, setPassword] = useState('')
  const [uploadMessage, setUploadMessage] = useState('')
  const [fileKey, setFileKey] = useState('')
  const [downloadPassword, setDownloadPassword] = useState('')
  const [downloadMessage, setDownloadMessage] = useState('')

  const BACKEND_URL = 'http://44.215.5.219:5000'

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

  const containerStyle = {
    maxWidth: 600,
    margin: '50px auto',
    padding: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '20px',
    boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
    color: '#fff',
    fontFamily: 'Segoe UI, sans-serif',
    backdropFilter: 'blur(6px)'
  }

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: 15,
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none'
  }

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#00ffff',
    color: '#000',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }

  const backgroundStyle = {
    backgroundImage: `url("https://www.transparenttextures.com/patterns/cubes.png")`,
    backgroundSize: 'cover',
    backgroundColor: '#0c0c0c',
    minHeight: '100vh',
    paddingTop: '30px'
  }

  return (
    <div style={backgroundStyle}>
      <div style={containerStyle}>
        <h2 style={{ textAlign: 'center', color: '#00ffff', animation: 'pulse 2s infinite' }}>
          🔐 Secure Decentralized Storage
        </h2>

        <h3>📤 Upload</h3>
        <input type="file" style={inputStyle} onChange={e => setFile(e.target.files[0])} />
        <input type="password" style={inputStyle} placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
        <button style={buttonStyle} onMouseOver={e => e.target.style.backgroundColor = '#00ccff'} onMouseOut={e => e.target.style.backgroundColor = '#00ffff'} onClick={handleUpload}>Encrypt & Upload</button>
        <p style={{ color: uploadMessage.startsWith('✅') ? 'lightgreen' : 'red' }}>{uploadMessage}</p>

        <hr style={{ border: '1px solid #444' }} />

        <h3>📥 Download</h3>
        <input type="text" style={inputStyle} placeholder="Enter uploaded file name (e.g., invoice.pdf.enc)" value={fileKey} onChange={e => setFileKey(e.target.value)} />
        <input type="password" style={inputStyle} placeholder="Enter password" value={downloadPassword} onChange={e => setDownloadPassword(e.target.value)} />
        <button style={buttonStyle} onMouseOver={e => e.target.style.backgroundColor = '#00ccff'} onMouseOut={e => e.target.style.backgroundColor = '#00ffff'} onClick={handleDownload}>Decrypt & Download</button>
        <p style={{ color: downloadMessage.startsWith('✅') ? 'lightgreen' : 'red' }}>{downloadMessage}</p>
      </div>

      {/* Simple animation */}
      <style>{`
        @keyframes pulse {
          0% { text-shadow: 0 0 5px #00ffff; }
          50% { text-shadow: 0 0 20px #00ffff; }
          100% { text-shadow: 0 0 5px #00ffff; }
        }
      `}</style>
    </div>
  )
}

export default App
