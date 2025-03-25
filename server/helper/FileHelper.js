const crypto = require('crypto-js');
const fs = require('fs');
const path = require('path');
require("dotenv").config();


// Secret key for AES encryption
const secretKey = keys.CRYPTO_SECURITY_KEY; 

// Function to encode the file
function encodeFile(inputPath,outputPath) {
    const fileData = fs.readFileSync(inputPath);  // Read file content as buffer
    const encryptedData = crypto.AES.encrypt(fileData.toString('base64'), secretKey).toString();
    fs.writeFileSync(outputPath,encryptedData);
}

// Function to decode the file
function decodeFile(filepath) {
    const outPutFolderPath = path.join(process.env.STATIC_FILE_UPLOAD_PATH,'dec_images');
    if(!fs.existsSync(outPutFolderPath)){
        fs.mkdirSync(outPutFolderPath,{recursive:true});
    }

    const folderPath=path.join(process.env.STATIC_FILE_UPLOAD_PATH,filepath); //path as per setup
    if(!fs.existsSync(folderPath)){
        return false;
    }
    const encryptedPath=path.join(folderPath);
    let fileName = path.basename(encryptedPath);
    const outputPath=path.join(outPutFolderPath,`${fileName}`);
    const encryptedData=fs.readFileSync(encryptedPath,'utf-8');
    const decryptedData=crypto.AES.decrypt(encryptedData, secretKey).toString(crypto.enc.Utf8);
    const fileBuffer = Buffer.from(decryptedData, 'base64');
    fs.writeFileSync(outputPath, fileBuffer);  // Write to file
    return 'dec_images/'+fileName;
}

module.exports = {
    encodeFile,
    decodeFile
};



