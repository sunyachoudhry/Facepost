const fs = require('fs')
const dir = './serverKeys';
const publicKeyPath = './serverKeys/public_key.txt'
const privateKeyPath = './serverKeys/private_key.txt'

const generatePDSKeyFile = () => {
    if (!fs.existsSync(dir))
    {
        fs.mkdirSync(dir);
    }

    var writeStream = fs.createWriteStream(publicKeyPath);
    writeStream.write(diffHell.getPublicKey());
    writeStream.end();

    writeStream = fs.createWriteStream(privateKeyPath);
    writeStream.write(diffHell.getPrivateKey());
    writeStream.end();
}
