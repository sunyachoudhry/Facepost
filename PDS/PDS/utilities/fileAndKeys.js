const fs = require("fs");
const { createDiffieHellman } = require('crypto')
let serverInstance = null; 

const createDiffHell = () => {
  const diffHell = createDiffieHellman(2048);
  return diffHell; 
}

const putKeysInFile = (instance, publicKeyPath, privateKeyPath) => {

  let writeStream = fs.createWriteStream(publicKeyPath);
  writeStream.write(instance.getPublicKey('base64'));
  writeStream.end();

  writeStream = fs.createWriteStream(privateKeyPath);
  writeStream.write(instance.getPrivateKey('base64'));
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
  createDiffHell, 
  putKeysInFile,
  isFileEmpty,
  setServerInstance,
  getServerInstance,
  encrypt, 
  decrypt
}