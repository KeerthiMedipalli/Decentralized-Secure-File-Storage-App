const nacl = require('tweetnacl');
const { shake256 } = require('js-sha3');

const encryptFile = (buffer, password) => {
    const key = Buffer.from(shake256.arrayBuffer(password, 32));
    const nonce = nacl.randomBytes(24);
    const encrypted = nacl.secretbox(new Uint8Array(buffer), nonce, key);
    return { cipher: Buffer.from(encrypted), nonce: Buffer.from(nonce) };
};

module.exports = { encryptFile };
