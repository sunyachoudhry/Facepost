const fs = require("fs");
const { createDiffieHellman, generateKeyPairSync } = require('crypto')
let serverInstance = null; 

// Generates all keys and puts them in the respective directory
const putKeysInFile = (instance, publicKeyPath, privateKeyPath, primePath, rsaPublicServerKeyPath, rsaPrivateServerKeyPath) => {

  const keyPair = generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: ''
    }
  });

  let writeStream = fs.createWriteStream(publicKeyPath);
  writeStream.write(instance.getPublicKey('base64'));
  writeStream.end();

  writeStream = fs.createWriteStream(privateKeyPath);
  writeStream.write(instance.getPrivateKey('base64'));
  writeStream.end();

  writeStream = fs.createWriteStream(rsaPublicServerKeyPath);
  writeStream.write(keyPair.publicKey);
  writeStream.end();

  writeStream = fs.createWriteStream(rsaPrivateServerKeyPath);
  writeStream.write(keyPair.privateKey);
  writeStream.end();

  writeStream = fs.createWriteStream(primePath);
  writeStream.write(instance.getPrime("base64"));
  writeStream.end();
}

const createDirectory = (directory) => {
  if (!fs.existsSync(directory))
  {
    fs.mkdirSync(directory, { recursive: true });
  }
}

const setServerInstance = (instance) => {
  serverInstance = instance; 
}

const getServerInstance = () => {
  return serverInstance; 
}

const isFileEmpty = (directory, path) => {
  if (fs.existsSync(directory))
  {
    fs.readFile(path, function(err, data) {
      if (data.length == 0) 
      {
        return true; 
      } 
      else 
      {
        return false; 
      }
    })
  }
  else 
  {
    return true; 
  }
}

module.exports = { 
  createDirectory,
  setServerInstance,
  getServerInstance,
  putKeysInFile,
  isFileEmpty
}