const AWS = require('aws-sdk')
 
exports.handler = async (event) => {
return AWS.VERSION;
};
