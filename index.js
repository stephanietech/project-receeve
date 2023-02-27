

'use strict';

require('dotenv').config();

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1'});




exports.handler = async (event) => {

  let responseBody = "";
  let statusCode = 0;

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});


var params = {
  S3Bucket: process.env.S3BUCKET,
  TableArn: process.env.TABLEARN,
  //ExportFormat: DYNAMODB_JSON 
  //S3SseAlgorithm: AES256 
};






try {

       const data = await ddb.exportTableToPointInTime(params).promise(); 
  //if (err) console.log(err, err.stack);
  //else     console.log(data);

        responseBody = JSON.stringify(data);
        statusCode = 200;

           
}

catch (err) {
        responseBody = `Unable to get Products: ${err}`;
        statusCode = 403;
    }


    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: responseBody
    };

    return response;




}
