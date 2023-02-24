const crypto = require('crypto');

//Generate a 256-bit (32-byte) random key
module.exports.generateSecretKey  = () => crypto.randomBytes(32).toString('hex');
