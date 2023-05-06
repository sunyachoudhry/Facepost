const { getServerInstance, createDirectory, createDiffHell, putKeysInFile} = require("../utilities/fileAndKeys"); 
const UserKey = require('../models/UserKey')
const bcrypt = require ('bcrypt');
const fs = require('fs'); 
const { createDiffieHellman, createCipheriv, randomBytes, createDecipheriv } = require('crypto')
const {  } = require('crypto');

const registerUser = (async (req, res) => {
    const directory = `../clientKeys/${req.body.email}_keys`;
    const publicKeyPath = `${directory}/${req.body.email}_public_key.pem`;
    const privateKeyPath = `${directory}/${req.body.email}_private_key.pem`;
    const sharedKeyPath = `${directory}/${req.body.email}_shared_key.pem`;
    const server = getServerInstance(); 
    
    createDirectory(directory);
    createDirectory(`../clientKeys/${req.body.email}_keys`)
    
    const client = createDiffieHellman(server.getPrime(), server.getGenerator());
    client.generateKeys();
    putKeysInFile(client, publicKeyPath, privateKeyPath)
    const clientSharedKey = client.computeSecret(server.getPublicKey('base64'), 'base64', 'base64');

    let writeStream = fs.createWriteStream(sharedKeyPath);
    writeStream.write(clientSharedKey);
    writeStream.end();
})

const createUserKeyEntry = (async (req, res) => {
    const sharedKeyPath = `${directory}/${req.body.email}_shared_key.pem`;
    let encryptedPassword = await bcrypt.hash(req.body.userPassword, 10);
    let sharedKeyValue = null; 
    let encryptedEmail = null; 

    try {  
        sharedKeyValue = fs.readFileSync(sharedKeyPath, 'utf8');
    } catch(e) {
        console.log('Error:', e.stack);
    }

    /// Cipher
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes256', sharedKeyValue, iv);

    /// Encrypt
    const encryptedMessage = cipher.update(message, 'utf8', 'hex') + cipher.final('hex');
    console.log(`Encrypted: ${encryptedMessage}`);

    /// Decrypt
    const decipher = createDecipheriv('aes256', key, iv);
    const decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf-8') + decipher.final('utf8');
    console.log(`Deciphered: ${decryptedMessage.toString('utf-8')}`);

    encryptEmail = 
    encryptedPassword = 

    const newUserKey = new UserKey({
        email: encryptedEmail,
        password: encryptedPassword,
        publicKey: client.getPublicKey()
    })
    newUserKey.save()
})

module.exports = {
    registerUser,
    createUserKeyEntry
}
