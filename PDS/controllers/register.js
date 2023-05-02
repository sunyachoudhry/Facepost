const {createDiffHell, generateTheKeys, putKeysInFile} = require("../keyGeneration"); 

const regsiterUser = (async (req, res) => {
    // Create public/private key for the user
    const instance = createDiffHell();
    instance.generateKeys(); 
    putKeysInFile(instance, '', '', '')
})

module.exports = {
    regsiterUser
}