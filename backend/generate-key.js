const crypto = require('crypto');

// Generate a 32-byte random key
const encryptionKey = crypto.randomBytes(32).toString('hex');

console.log('ENCRYPTION_KEY=' + encryptionKey);
