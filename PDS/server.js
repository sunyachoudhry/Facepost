let instance = null; 
const express = require('express');
const registerRoutes = require('./routes/register'); // import the routes
const postRoutes = require('./routes/post'); // import the routes
const fs = require('fs'); 
const app = express();
const cors = require('cors');
const serverDirectory = './serverKeys';
const publicServerKeyPath = './serverKeys/public_server_key.pem';
const privateServerKeyPath = './serverKeys/private_server_key.pem';
const rsaPublicServerKeyPath = './serverKeys/rsa_public_server_key.pem';
const rsaPrivateServerKeyPath = './serverKeys/rsa_private_server_key.pem';
const primePath = './serverKeys/prime.pem'; 
const { connectToMongoDB } = require('./mongodb/connection');
const { createDiffieHellman } = require('crypto'); 
const { setServerInstance, 
        isFileEmpty, 
        createDirectory, 
        putKeysInFile } = require('./utilities/fileAndKeys');
        
// Creates directories to store servers files: prime number used for generation
// + RSA key pair + DH key pair
instance = createDiffieHellman(2048)

if(isFileEmpty(serverDirectory, publicServerKeyPath) || isFileEmpty(serverDirectory, privateServerKeyPath))
{
    console.log("PDS keys are missing. They are being generated.")
    const instancePrime = instance.getPrime('base64')
    instance = createDiffieHellman(instancePrime, 'base64');
    instance.generateKeys();
    createDirectory(serverDirectory)
    putKeysInFile(instance, publicServerKeyPath, privateServerKeyPath, primePath, rsaPublicServerKeyPath, rsaPrivateServerKeyPath)
    console.log("Done generating keys for PDS.");
}
else
{
    console.log("PDS keys were previously generated.")
    // Save the keys from server public/private files
    try {  
        var publicKey = fs.readFileSync(publicServerKeyPath, 'utf8');
        var privateKey = fs.readFileSync(privateServerKeyPath, 'utf8');
        var primeKey = fs.readFileSync(primePath, 'utf8');
        instance = createDiffieHellman(primeKey, 'base64');
        instance.setPublicKey(publicKey, 'base64'); 
        instance.setPrivateKey(privateKey, 'base64');
    } catch(e) {
        console.log('Error:', e.stack);
    }
}      
setServerInstance(instance); 

app.use(express.json());

app.use(cors());

app.use('/', registerRoutes);

app.use('/', postRoutes);

connectToMongoDB();

app.listen(9500, console.log("Server is running on port 9500."));