# 🔐 Decentralized Secure File Storage App

A simple yet powerful web application for **secure file upload and download** using **XChaCha20 encryption** and **blockchain-inspired principles**. Files are encrypted in-browser with a user-provided password and stored securely on the backend.

---

## 🌐 Live Demo

> 🚀 Deployed on an EC2 instance: `http://<your-ec2-ip>:5000`

---

## 📦 Features

- 🔒 End-to-end encryption with **XChaCha20 + SHAKE**
- 🗂 Upload and download any file securely
- ⚡ Fast encryption in-browser using `libsodium`
- 📂 Files stored locally or can be integrated with **Amazon S3**
- 💻 Clean and responsive React UI with real-time feedback
- ✅ CORS-enabled backend for frontend compatibility
- 🌐 Hosted on AWS EC2 (can also integrate IPFS/S3 for decentralized cloud storage)

---

## 🧠 Architecture Overview

```

Frontend (React) ---> Backend (Node.js + Express) ---> Local Storage or AWS S3
\|                                 |
Libsodium Encryption           Optional: S3/Blockchain integration

````

---

## 🔧 Technologies Used

### 🖥 Frontend
- React.js
- Axios
- Styled with inline styles and smooth light theme

### 🔙 Backend
- Node.js
- Express.js
- Multer (file handling)
- Libsodium-wrappers (XChaCha20 encryption)
- (Optional) AWS SDK for S3 integration

---

## 🚀 Setup Instructions

### 1️⃣ Backend Setup

```bash
git clone https://github.com/KeerthiMedipalli/Decentralized-Secure-File-Storage-App.git
cd Decentralized-Secure-File-Storage-App/backend
npm install
node index.js
````

Create a `.env` file (if using S3):

```
AWS_ACCESS_KEY=YOUR_AWS_KEY
AWS_SECRET_KEY=YOUR_SECRET
AWS_REGION=us-east-1
S3_BUCKET=your-bucket-name
```

### 2️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

> The app runs on `http://localhost:3000` by default.

---

## 📷 UI Screenshots

| Upload Page                                                               | Download Page                                                              |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| ![Upload](https://via.placeholder.com/400x250?text=Upload+Encrypted+File) | ![Download](https://via.placeholder.com/400x250?text=Decrypt+and+Download) |

---

## ✅ How It Works

1. **User selects a file and enters a password**
2. File is encrypted on the backend using `XChaCha20-Poly1305`
3. Encrypted file is stored (either locally or on S3)
4. For download, user provides the encrypted filename and password
5. Backend decrypts it and sends the original file for download

---

## 🔐 Encryption Logic

```js
const key = sodium.crypto_generichash(32, password)
const nonce = sodium.randombytes_buf(sodium.crypto_aead_xchacha20poly1305_ietf_NPUBBYTES)
const encrypted = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(data, null, null, nonce, key)
```

---

## 🧪 Optional Enhancements

* ✅ Integrate IPFS or blockchain file hash storage
* ✅ Email or OTP verification
* ✅ File expiry timestamps
* ✅ Trivy + SonarQube for CI security scanning
* ✅ CloudWatch metrics for S3 ops (if using AWS)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss your ideas.

---

## 📄 License

This project is licensed under the MIT License. See `LICENSE` for more info.

---

## 🙌 Acknowledgements

* [Libsodium](https://libsodium.gitbook.io/)
* [AWS Free Tier](https://aws.amazon.com/free/)
* [React](https://reactjs.org/)

```

