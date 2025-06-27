const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const uploadRoute = require('./routes/upload')
const downloadRoute = require('./routes/download')

app.use('/upload', uploadRoute)
app.use('/download', downloadRoute)

app.listen(5000, '0.0.0.0', () => {
  console.log('✅ Server running on port 5000')
})
