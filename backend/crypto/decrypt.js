const nacl = require('tweetnacl');
const { shake256 } = require('js-sha3');

const decryptFile = (encryptedData, password) => {
    const key = Buffer.from(shake256.arrayBuffer(password, 32));
    const nonce = encryptedData.slice(0, 24); // first 24 bytes = nonce
    const cipher = encryptedData.slice(24); // rest = ciphertext

    const decrypted = nacl.secretbox.open(new Uint8Array(cipher), new Uint8Array(nonce), key);

    if (!decrypted) {
        throw new Error('Decryption failed. Wrong password or corrupted data.');
    }

    return Buffer.from(decrypted);
};

module.exports = { decryptFile };
