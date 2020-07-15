/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT *//*
  this file will loop through all js modules which are uploaded to the lambda resource,
  provided that the file names (without extension) are included in the "MODULES" env variable.
  "MODULES" is a comma-delimmited string.
*/

var AWS = require("aws-sdk")
var ddb = new AWS.DynamoDB({apiVersion: '2018-05-29'});


exports.handler = async (event, context, callback) => {
  
  let date = new Date()
  const tableName = process.env.TABLE_NAME
  const region = process.env.REGION
  
  AWS.config.update({region})
  
  if(event.request.userAttributes.sub){
    var params = {
      Item:{
        'id':{S: event.request.userAttributes.sub},
        'name':{S: typeof event.request.userAttributes.name != "undefined" ? event.request.userAttributes.name : event.request.userAttributes.email },
        'emailAddress':{S:event.request.userAttributes.email},
        'phoneNumber':{S:event.request.userAttributes.phone_number},
        '__typename':{S:"User"},
        'status':{S:event.request.userStatus},
        'version':{N:"1"},
        'createdAt':{S: event.request.userCreateDate},
        'updatedAt':{S: event.request.userLastModifiedDate}
      },
      TableName:tableName
    }
    
    // Call DynamoDB
    try {
        await ddb.putItem(params).promise()
    } catch (err) {
        console.log("Error", err);
    }

    context.done(null, event);
  }
 else {
      context.done(null, event);
  }
  
};

