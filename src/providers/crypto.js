const crypto = require('crypto');

const algorithm = 'aes-256-cbc'; 
const iv = "2bzhAM/vY+NzuduQ"

async function encrypt(text, key) {
    try {
    const secretkey = crypto.createHash('sha256').update(key).digest('base64').substr(0, 32);
    console.log(secretkey)
    const cipher = crypto.createCipheriv(algorithm, secretkey, iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
    }
    catch (error) {
        console.log("error here === ",error)
    }
}

async function decrypt(encryptedText, key) {
    try {
    const secretkey = crypto.createHash('sha256').update(key).digest('base64').substr(0, 32);
    console.log(secretkey, encryptedText)
    const decipher = crypto.createDecipheriv(algorithm, secretkey, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
    }
    catch (error) {
        console.log("errorv== ",error)
    }
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;