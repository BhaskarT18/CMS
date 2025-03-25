// const moment = require('moment-timezone');
// const constant  = require("../config/constant.js");
// const crypto = require('crypto');
// const ENCRYPTION_KEY = crypto.createHash('sha256').update(keys.CRYPTO_SECURITY_KEY).digest('base64').substr(0, 32);
// const IV = Buffer.alloc(16, 0); // Fixed IV for deterministic encryption (16 bytes of zero)
// const HMAC_KEY = crypto.createHash('sha256').update(keys.HMA_SECURITY_KEY).digest(); // Separate key for HMAC
// const fs= require("fs");
// const {decodeFile} = require('./FileHelper.js');
// require('dotenv').config();
// /**
//  * Convert a date/time from one time zone to another.
//  * 
//  * @param {string|Date} date - The date/time to convert (can be a Date object or ISO string).
//  * @param {string} fromTimeZone - The source time zone (e.g., 'UTC').
//  * @param {string} toTimeZone - The target time zone (e.g., 'Asia/Kolkata').
//  * @param {string} format - (Optional) The format for the output date/time (default: 'YYYY-MM-DD HH:mm:ss').
//  * @returns {string} - The converted date/time string in the target time zone.
//  */
// // function convertTimeZoneToReq(date, fromTimeZone = TIME_ZONES.UTC, toTimeZone = TIME_ZONES.ASIA_KOLKATA, format = 'YYYY-MM-DD HH:mm:ss') {
// //     if (!date) {
// //         throw new Error('A valid date is required.');
// //     }
// //     if (!fromTimeZone || !toTimeZone) {
// //         throw new Error('Both source and target time zones are required.');
// //     }

// //     return moment.tz(date, fromTimeZone).tz(toTimeZone).format(format);
// // }

// // function convertTimeZoneToDefault(date, fromTimeZone = TIME_ZONES.ASIA_KOLKATA, toTimeZone = TIME_ZONES.UTC, format = 'YYYY-MM-DD HH:mm:ss') {
// //     if (!date) {
// //         throw new Error('A valid date is required.');
// //     }
// //     if (!fromTimeZone || !toTimeZone) {
// //         throw new Error('Both source and target time zones are required.');
// //     }

// //     return moment.tz(date, fromTimeZone).tz(toTimeZone).format(format);
// // }


// function convertToSysDateFormat(date,time=false) {
//   if (!date) {
//       throw new Error('A valid date is required.');
//   }
 
//   const parsedDate = moment.tz(date,constant.InputDateFormat, constant.TIME_ZONES.ASIA_KOLKATA);
//   if (!parsedDate.isValid()) {
//       throw new Error('Invalid date format');
//   }
//   if(time){
//     return parsedDate.format(constant.SystemTimeFormat);
//   }else{
//     return parsedDate.format(constant.SystemDateFormat);
//   }
  
// }
// function convertToUserDateFormat(date) {
//     if (!date) {
//         throw new Error('A valid date is required.');
//     }
//     const parsedDate = moment.tz(date,constant.SystemDateFormat,constant.TIME_ZONES.ASIA_KOLKATA);
//     return parsedDate.format(constant.UserDateFormat);
    
// }

// // Common response functions for success and error
// const sendSuccessResponse = (res, statusCode,status, message, data = null) => {
//     return res.status(statusCode).send({
//       statusCode,
//       status,
//       message,
//       data,
//     });
//   };
  
//   const sendErrorResponse = (res, statusCode,status, message,error,data=[]) => {
//     return res.status(statusCode).json({
//       statusCode,
//       status,
//       message,
//       error,
//       data
//     });
//   };
  
//   function titleCase(string) {
//     if (!string) {
//         throw new Error('A valid string is required.');
//     }

//     return string
//         .split(' ')  // Split the string into words
//         .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter and make rest lowercase
//         .join(' '); // Join the words back together
//   }

//   // function valueEncryption(text){
//   //   const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), IV);
//   //   let encrypted = cipher.update(text, 'utf8', 'base64');
//   //   encrypted += cipher.final('base64');
//   //   return encrypted;
//   // }

//   // function valueDecryption(encryptedText){
//   //   const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), IV);
//   //   let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
//   //   decrypted += decipher.final('utf8');
//   //   return decrypted;
//   // }
 
//   // URL-Safe Base64 Encoding
// function toUrlSafeBase64(str) {
//   return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
// }

// // URL-Safe Base64 Decoding
// function fromUrlSafeBase64(str) {
//   return str.replace(/-/g, '+').replace(/_/g, '/');
// }
// function valueEncryption(text) {
//   const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), IV);
//   let encrypted = cipher.update(text, 'utf8', 'base64');
//   encrypted += cipher.final('base64');

//   // Convert to URL-safe Base64
//   encrypted = toUrlSafeBase64(encrypted);

//   // Generate a truncated HMAC for integrity
//   const hmac = crypto.createHmac('sha256', HMAC_KEY).update(encrypted).digest('hex').substr(0, 16);

//   // Return encrypted text along with the shortened HMAC
//   return `${encrypted}.${hmac}`;
// }

// // Decryption Function
// function valueDecryption(encryptedText) {
//   const parts = encryptedText.split('.');
//   if (parts.length !== 2) {
//       throw new Error('Invalid input');
//   }

//   const [ciphertext, providedHmac] = parts;

//   // Validate HMAC integrity
//   const hmac = crypto.createHmac('sha256', HMAC_KEY).update(ciphertext).digest('hex').substr(0, 16);
//   if (hmac !== providedHmac) {
//       throw new Error('HMAC verification failed. Data integrity compromised.');
//   }

//   // Convert from URL-safe Base64
//   const decodedCiphertext = fromUrlSafeBase64(ciphertext);

//   // Proceed with decryption
//   const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), IV);
//   let decrypted = decipher.update(decodedCiphertext, 'base64', 'utf8');
//   decrypted += decipher.final('utf8');

//   return decrypted;
// }

// function fileUnlink(path){  
//    try {
//         if(path != '' && path != null  && path != 'undefined'){
//           let basepath = process.env.STATIC_FILE_UPLOAD_PATH+path;
//           if(fs.existsSync(basepath)){
//             fs.unlinkSync(basepath);
//           }
//         }
//     return;
//    } catch (error) {
//      console.log(error);
//      return;
//    }
   
// }

// function generateFilelink(filename){
//   if(process.env.isFileEncReq == 1){
//     let filepath = decodeFile(filename);
//     return process.env.STATIC_FILE_PATH+filepath;
//   }else{
//     return process.env.STATIC_FILE_PATH+filename;
//   }
// }

// function generateSampleFilelink(filename){
//   return process.env.STATIC_FILE_PATH+filename;
// }

// const masterLogInsertion = ({ db }) => async (newValues, oldvalues, otherDetails) => {
//   try {
//     let changes = [];
//     let oldJson = oldvalues;
//     let newJson = newValues;
//     Object.keys(newValues).forEach(key => {
//       let oldValue = oldvalues[key];
//       let newValue = newValues[key];
//       if (String(oldValue) !== String(newValue)) {
//         changes.push({
//           column_name: key,
//           old_value: oldValue,
//           new_value: newValue
//         });
//         //oldJson[key] = oldValue;
//         //newJson[key] = newValue;
//       }
//     });

//     for (let change of changes) {

//       await db.sequelize.query(`INSERT INTO master_logs(table_name, record_id,column_name,new_value,old_value,new_json,
//               old_json,modifiedby,modified_by_name,createdon,modifiedon,deletedon)
//               VALUES(:tablename,:record_id,:column_name,:new_value,:old_value,:new_json,:old_json,
//               :modified_by,:modified_by_name,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`, {

//         replacements: {
//           tablename: otherDetails.tablename,
//           record_id: otherDetails.id,
//           column_name: change.column_name,
//           new_value: change.new_value,
//           old_value: change.old_value,
//           new_json: JSON.stringify(newJson),
//           old_json: JSON.stringify(oldJson),
//           modified_by: otherDetails.modified_by,
//           modified_by_name: otherDetails.modified_by_name,
//         }
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }

// }

// const CommonHelper = {
//     //convertTimeZoneToReq,
//     //convertTimeZoneToDefault,
//     convertToSysDateFormat,
//     convertToUserDateFormat,
//     sendErrorResponse,
//     sendSuccessResponse,
//     titleCase,
//     valueEncryption,
//     valueDecryption,
//     fileUnlink,
//     generateFilelink,
//     masterLogInsertion,
//     generateSampleFilelink
// };
// module.exports = CommonHelper;