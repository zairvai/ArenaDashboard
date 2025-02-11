/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var functionArenaIdentityManagerName = process.env.FUNCTION_ARENAIDENTITYMANAGER_NAME
var functionArenaSearchManagerName = process.env.FUNCTION_ARENASEARCHMANAGER_NAME

Amplify Params - DO NOT EDIT */

const User = require("./model/User")
const Account = require("./model/Account")
const Venue = require("./model/Venue")
const Facility = require("./model/Facility")

exports.handler = (event,context,callback) => {

  event.Records.forEach((record)=>{
    
      console.log("Stream Records : ",JSON.stringify(record,null,2))

      if(record.eventName=="INSERT"){
      
        var newType = typeof record.dynamodb.NewImage.__typename !="undefined" ? record.dynamodb.NewImage.__typename.S : "unknown"

        switch(newType){

          case 'User'             :   User.insert(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Account'          :   Account.insert(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;


          case 'Venue'            :   Venue.insert(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))

                                      break;

          case 'Facility'           :   Facility.insert(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          default                 :   callback(null,"Unknown Field"); break;

        }  
      
      }
      else if(record.eventName=="MODIFY"){

        var newType = typeof record.dynamodb.NewImage.__typename !="undefined" ? record.dynamodb.NewImage.__typename.S : "unknown"
        
        switch(newType){

          case 'User'             :   User.update(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Account'          :   Account.update(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Venue'            :   Venue.update(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Facility'           :   Facility.update(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          default                 :   callback(null,"Unknown Field"); break;

        }

      }
      else if(record.eventName=="REMOVE"){

        var oldType = typeof record.dynamodb.OldImage.__typename !="undefined" ? record.dynamodb.OldImage.__typename.S : "unknown"

        switch(oldType){

          case 'User'             :   User.remove(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Account'          :   Account.remove(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Venue'            :   Venue.remove(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;

          case 'Facility'           :   Facility.remove(record).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
                                      break;                           

          default                 :   callback(null,"Unknown Field"); break;

        }  

      }
      
  })
  
};