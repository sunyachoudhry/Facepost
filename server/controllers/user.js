const fs = require('fs'); 
const { createDiffieHellman, generateKeyPairSync, randomBytes, createCipheriv } = require('crypto')
const bcrypt = require('bcrypt'); 
//creates the directories for both sets of clients keys + shared key
const getKeys = (async (req, res) => {
    let writeStream = null; 
    let clientSharedKey = null; 
    const email = req.body.email; 
    const pdsPublicKey = req.body.pdsPublicKey; 
    const pdsPrime = req.body.pdsPrime; 
    const directory = `./clientKeys/${email}_keys`;
    const publicKeyPath = `${directory}/${email}_public_key.pem`;
    const privateKeyPath = `${directory}/${email}_private_key.pem`;
    const sharedKeyPath = `${directory}/${email}_shared_key.pem`;
    const publicRSAKeyPath = `${directory}/rsa_${email}_public_key.pem`;
    const privateRSAKeyPath = `${directory}/rsa_${email}_private_key.pem`;
    const instance = createDiffieHellman(pdsPrime, 'base64');
   
    if (!fs.existsSync(directory))
    {
      fs.mkdirSync(directory, { recursive: true });     
    }

    if(isFileEmpty(publicKeyPath) || isFileEmpty(privateKeyPath))
    {
      console.log("Clients DH and RSA public/private keys not generated. Generating...")
      instance.generateKeys(); 

      const keyPair = generateKeyPairSync('rsa', {
        modulusLength: 530,
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

      clientSharedKey = instance.computeSecret(pdsPublicKey, 'base64', 'base64');

      writeStream = fs.createWriteStream(publicKeyPath);
      writeStream.write(instance.getPublicKey('base64'));
      writeStream.end();
      
      writeStream = fs.createWriteStream(privateKeyPath);
      writeStream.write(instance.getPrivateKey('base64'));
      writeStream.end();

      writeStream = fs.createWriteStream(publicRSAKeyPath);
      writeStream.write(keyPair.publicKey);
      writeStream.end();

      writeStream = fs.createWriteStream(privateRSAKeyPath);
      writeStream.write(keyPair.privateKey);
      writeStream.end();

      writeStream = fs.createWriteStream(sharedKeyPath);
      writeStream.write(clientSharedKey);
      writeStream.end();
      console.log("Done generating DH and RSA public/private keys for client.");
    }
    else 
    {
      console.log("Clients public/private keys have previously been generated.")
      try {  
        var publicKey = fs.readFileSync(publicKeyPath, 'utf8');
        var privateKey = fs.readFileSync(privateKeyPath, 'utf8');
        clientSharedKey = fs.readFileSync(sharedKeyPath, 'utf8')
        instance.setPublicKey(publicKey, 'base64'); 
        instance.setPrivateKey(privateKey, 'base64'); 
      } catch(e) {
        console.log('Error:', e.stack);
      }
    }
  
    const clientPublicKey = instance.getPublicKey('base64');   
    const autoGenPsw = await bcrypt.hash(req.body.email, 10);
    const encryptedEmail = symmetricEncrypt(clientSharedKey, email);
    const encryptedPw = symmetricEncrypt(clientSharedKey, autoGenPsw); 

    const resJson = 
    {
      email: encryptedEmail, 
      autoGenPw: encryptedPw,
      clientPublicKey: clientPublicKey
    }
    res.status(200).json(resJson);
})
//Symmetric encryption function used to encrypt something with shared key
function symmetricEncrypt(password, text) {
  const algorithm = 'aes-256-ctr';
  const key = Buffer.concat([Buffer.from(password), Buffer.alloc(32)], 32);
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + encrypted.toString('hex');
}

const isFileEmpty = (path) => {
    if (!fs.existsSync(path))
    {
      return true;     
    }
    else
    {
      return false; 
    }
}

module.exports = {
    getKeys
}