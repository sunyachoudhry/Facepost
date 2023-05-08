const fs = require('fs'); 
const publicServerKeyPath = './serverKeys/public_server_key.pem';
const rsaPublicServerKeyPath = './serverKeys/rsa_public_server_key.pem';
const rsaPrivateServerKeyPath = './serverKeys/rsa_private_server_key.pem';
const primePath = './serverKeys/prime.pem'; 
const path = require("path");
const { getServerInstance } = require('../utilities/fileAndKeys');
const UserKey = require('../models/UserKey'); 
const { createDecipheriv, publicEncrypt, privateDecrypt } = require('crypto')
const crypto = require('crypto')

//Fetches the public key and prime key of the server to be used for shared key gen on clients side
const getKeys = (async (req, res) => {
    try {  
        var publicKey = fs.readFileSync(publicServerKeyPath, 'utf8');
        var prime = fs.readFileSync(primePath, 'utf8')
        const resJson = {publicKey: publicKey, prime: prime}; 
        res.status(200).json(resJson); 
    } catch(e) {
        console.log('Error:', e.stack);
    }
})
 // Creates the entry in the database (mongoDB)
const createEntry = (async (req, res) => {
    const encryptedEmail = req.body.clientInfo.encryptedEmail;
    const encryptedPw =  req.body.clientInfo.encryptedPw; 
    const clientPublicKey = req.body.clientInfo.clientPublicKey; 
    const pdsInstance = getServerInstance();
    const pdsSharedKey = pdsInstance.computeSecret(clientPublicKey, 'base64', 'base64'); 
    const decryptedEmail = symmetricDecrypt(pdsSharedKey, encryptedEmail);
    const decryptedPw = symmetricDecrypt(pdsSharedKey, encryptedPw); 

    const encryptedSharedKey = asymmetricEncrypt(pdsSharedKey, rsaPublicServerKeyPath);

    const newEntry = new UserKey({
        email: decryptedEmail,
        password: decryptedPw,
        sharedKey: encryptedSharedKey,
        clientDHPubKey: clientPublicKey
    }) 

    newEntry.save(); 
})
//Shared key decryption function
function symmetricDecrypt(password, text) {
    const algorithm = 'aes-256-ctr';
    const key = Buffer.concat([Buffer.from(password), Buffer.alloc(32)], 32);
    const iv = Buffer.from(text.substring(0, 32), 'hex');
    const encryptedText = Buffer.from(text.substring(32), 'hex');
    const decipher = createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

//Public private encryption function
function asymmetricEncrypt (sharedKey, rsaPublicKeyFile) {
    const publicKey = fs.readFileSync(rsaPublicKeyFile, "utf8");
    const encrypted = crypto.publicEncrypt(
        publicKey, Buffer.from(sharedKey));
    return encrypted.toString("base64");
}
//Public private decryption function
function asymmetricDecrypt(encryptedText, rsaPrivateKeyFile) {
    const privateKey = fs.readFileSync(rsaPrivateKeyFile, "utf8");
    const decrypted = crypto.privateDecrypt(
        {
            key: privateKey,
            passphrase: '',
        },
        Buffer.from(encryptedText, "base64")
    );
 
    return decrypted.toString("utf8");
}

module.exports = {
    getKeys,
    createEntry
}