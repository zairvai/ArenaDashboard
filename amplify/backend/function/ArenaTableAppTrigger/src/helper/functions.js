const AWS = require("aws-sdk")

exports.invokeLambdaIdentityManager = function(field,body){

    const lambda = new AWS.Lambda({
        region:process.env.REGION,
        apiVersion:"2015-03-31"
    })

    var params = {
        FunctionName:process.env.FUNCTION_ARENAIDENTITYMANAGER_NAME,
        InvocationType:"Event",
        LogType:"Tail",
        Payload:`{
            "field":"${field}",
            "arguments":${JSON.stringify(body)}
        }`
    }

    return lambda.invoke(params).promise()

}

exports.invokeLambdaSearchManager = function(field,path,body={}){

    const lambda = new AWS.Lambda({
        region:process.env.REGION,
        apiVersion:"2015-03-31"
    })

    var params = {
        FunctionName:process.env.FUNCTION_ARENASEARCHMANAGER_NAME,
        InvocationType:"Event",
        LogType:"Tail",
        Payload:`{
            "field":"${field}",
            "arguments":{
                "path":"${path}",
                "body":${JSON.stringify(body)}
            }
        }`
    }
    
    return lambda.invoke(params).promise()

}

exports.publishSnsPostUpdateVenue = function(attr){
    
    var sns = new AWS.SNS({
        region:process.env.REGION,
        apiVersion: '2010-03-31'
    });

    var params ={
        Message:JSON.stringify(attr),
        TopicArn:process.env.SNS_TOPIC_ARENAPOSTUPDATEVENUE
    }

    return sns.publish(params).promise()
}

