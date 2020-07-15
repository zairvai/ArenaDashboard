
var AWS = require("aws-sdk")

exports.handler = function (event, context) { 
  event.Records.forEach(async(record) => {
    
    // console.log(record)
    var jsonMessage = JSON.parse(record.Sns.Message)
    //console.log(jsonMessage)
    const updatedAttr = jsonMessage.attributes
    
    var venueId = updatedAttr.id.S
    var from = parseInt(jsonMessage.from)
    var size = parseInt(jsonMessage.size)
    
    try{
      
      var response = await getFacilitiesByVenueId(venueId,from,size)
      
      if(response.hits.hits.length>0){
        var totalFoundRecords = response.hits.total.value
        var items = response.hits.hits
        
        var promises = []

        promises.push(updateFacilities(items,updatedAttr))

        if(from+size < totalFoundRecords){
          //get next records
          var snsPubMessage = {
            attributes:updatedAttr,
            from: (from + size),
            size : size
          }
          
          promises.push(publishSnsPostUpdateVenue(snsPubMessage))

        }

        await Promise.all(promises)
        //Promise.all(promises).then(()=>context.done(null,"done")).catch(error=>console.log(error))
      }

    }
    catch(error){
      context.done("Error",error)
    }
    finally{
      context.done(null,"Done")
    }
  })
  
  return {};
}

function publishSnsPostUpdateVenue(attr){
  
  return new Promise((resolve,reject)=>{
    var sns = new AWS.SNS({
        region:process.env.REGION,
        apiVersion: '2010-03-31'
    });

    var params ={
        Message:JSON.stringify(attr),
        TopicArn:process.env.SNS_TOPIC_ARENAPOSTUPDATEVENUE
    }

    sns.publish(params).promise().then(response=>resolve(response)).catch(error=>{
      console.log(error)
      reject(error)
      
    })
  })
}

function updateFacilities(facilities,updatedAttr){

  var ddb = new AWS.DynamoDB({
    region:process.env.REGION,
    apiVersion:"2018-05-29"
  })
  
    return new Promise((resolve,reject)=>{

      var promises = []
      //update to dynamodb App table
      var tableName = process.env.TABLE_NAME
      var expressionAttrNames = {}
      var expressionAttrValues = {}
      var updateExpression = []
      
      for(const[key,value] of Object.entries(updatedAttr)){
        
        if(key=="id") continue
        
        var attrKey = `#${key}`
        var valKey = `:${key}`
        
        expressionAttrNames[attrKey] = key
        expressionAttrValues[valKey] = value
        updateExpression.push(`${attrKey} = ${valKey}`)
        
      }
      
      facilities.forEach(item=>{
        var params = {
          TableName:tableName,
          Key:{"id":{S:item._source.id}},
          ExpressionAttributeNames:expressionAttrNames,
          ExpressionAttributeValues:expressionAttrValues,
          UpdateExpression:"SET " + updateExpression.join(","),  
          ReturnValues:"ALL_NEW"
        }
      
        
        promises.push(ddb.updateItem(params).promise())
        
      })
      
      Promise.all(promises).then(response=>resolve(response)).catch(error=>{
        console.log(error)
        reject(error)
      }) 

  })
}

function getFacilitiesByVenueId(venueId,from,size){

  var domain = process.env.ELASTICSEARCH_DOMAIN

  var endpoint = new AWS.Endpoint(domain)
  var request = new AWS.HttpRequest(endpoint,process.env.REGION)

  return new Promise((resolve,reject)=>{
     var body = {
          "query":{
            "bool": {
              "must": [
                {"match": {"venue.id": venueId}}
              ],
              "must_not": [
                {"match": {
                  "status": "deleted"
                }}
              ]
            }
          },
          "from":from,
          "size":size
        }
    
    request.method = "GET"
    request.path = '/facility/_search'
    request.body = JSON.stringify(body)
    request.headers["host"] = domain
    request.headers["Content-Type"] = "application/json"
    request.headers["Content-Length"] = Buffer.byteLength(request.body)

    var client = new AWS.HttpClient()

    var credentials = new AWS.EnvironmentCredentials('AWS');
    var signer = new AWS.Signers.V4(request, 'es');
    signer.addAuthorization(credentials, new Date());

    var responseBody = ""
    
    client.handleRequest(request,null,
      response => {

          response.on("data",chunk=>{
              responseBody += chunk
          })

          response.on("end",()=>{
              var jsonResponse = JSON.parse(responseBody)
              resolve(jsonResponse)
          })
      },
      error => {
          console.log(error)
          reject(error)
      })

  })

}