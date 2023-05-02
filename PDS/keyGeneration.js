const { createDiffieHellman } = require('crypto')
const fs = require('fs')

const createDiffHell = () => {
    const diffHell = createDiffieHellman(2048);
    return diffHell; 
}
const generateTheKeys = () => {
    createInstanceOfDfHellman(); 
    diffHell.generateKeys();
}

const putKeysInFile = (instance, dir, publicKeyPath, privateKeyPath) => {

    const dir = dir;
    const publicKeyPath = publicKeyPath
    const privateKeyPath = privateKeyPath

    if (!fs.existsSync(dir))
    {
        fs.mkdirSync(dir);
    }
    var writeStream = fs.createWriteStream(publicKeyPath);
    writeStream.write(instance.getPublicKey());
    writeStream.end();

    writeStream = fs.createWriteStream(privateKeyPath);
    writeStream.write(instance.getPrivateKey());
    writeStream.end();
}

module.exports = {
    createDiffHell, 
    generateTheKeys,
    putKeysInFile
}