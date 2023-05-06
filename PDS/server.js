const express = require('express');
const registerRoutes = require('./routes/register'); // import the routes
const postRoutes = require('./routes/post'); // import the routes
const fs = require('fs'); 
const app = express();
const cors = require('cors');
const serverDirectory = './serverKeys';
const publicServerKeyPath = './serverKeys/public_server_key.pem';
const privateServerKeyPath = './serverKeys/private_server_key.pem'; 
const { connectToMongoDB } = require('./mongodb/connection');
const { setServerInstance, 
        isFileEmpty, 
        createDirectory, 
        createDiffHell, 
        putKeysInFile } = require('./utilities/fileAndKeys');


// User table  -> (SN server) {email , password}
// Post table  -> (PDS server) {postId, encryptedPost, digSig, email}
// Post table  -> (SN server) {postid, link, digSig, userId}
// UserKey table  -> (PDS server) {email, password, clientKey}
const instance = createDiffHell(); 
if(isFileEmpty(serverDirectory, publicServerKeyPath) || isFileEmpty(serverDirectory, privateServerKeyPath))
{
    console.log("Server keys are missing. They are being generated.")
    instance.generateKeys();
    createDirectory(serverDirectory)
    putKeysInFile(instance, publicServerKeyPath, privateServerKeyPath)
}
else
{
    console.log("Server keys were previously generated.")
    // Save the keys from server public/private files
    try {  
        var publicKey = fs.readFileSync(publicServerKeyPath, 'utf8');
        var privateKey = fs.readFileSync(privateServerKeyPath, 'utf8');
        instance.setPublicKey(publicKey, 'base64'); 
        instance.setPrivateKey(privateKey, 'base64'); 
    } catch(e) {
        console.log('Error:', e.stack);
    }
}
// Save the server instance 
setServerInstance(instance); 

app.use(express.json());

app.use(cors());

app.use('/', registerRoutes);

app.use('/', postRoutes);

connectToMongoDB();

app.listen(9500, console.log("Server is running on port 9500."));