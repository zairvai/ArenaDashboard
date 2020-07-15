const connectionModule = require("../module/connection")

const ACCESSLEVEL = "ByLevel"
const STATUS = "ByStatus"
const CREATEDAT = "ByCreatedAt"
const UPDATEDAT = "ByUpdatedAt"

var tableConnectionName = process.env.TABLE_CONNECTION_NAME
var requestItems = {}
requestItems[tableConnectionName] = []

function createConnection(id,extensionId,connection,sortkey){

    connection = connection + "#" + extensionId

    return connectionModule.generateRequestItem(id,connection,sortkey)

}

function deleteConnection(id,extensionId,connection){
    return new Promise((resolve,reject)=>{
        connection = connection + "#" + extensionId

        connectionModule.deleteItem(id,connection).then(data=>resolve(data)).catch(error=>reject(error))
    })

}

function insertConnections(record){
    return new Promise((resolve,reject)=>{
        var id = record.dynamodb.Keys.id.S
        var newImage = record.dynamodb.NewImage
        var type = newImage.__typename.S

        var putRequests = []

        putRequests.push(
        createConnection(id,newImage.accountId.S,`${type}${ACCESSLEVEL}`,newImage.accessLevel.S),
        createConnection(id,newImage.accountId.S,`${type}${STATUS}`,newImage.status.S),
        createConnection(id,newImage.accountId.S,`${type}${CREATEDAT}`,newImage.createdAt.S),
        createConnection(id,newImage.accountId.S,`${type}${UPDATEDAT}`,newImage.updatedAt.S),
        createConnection(id,newImage.userId.S,`${type}${ACCESSLEVEL}`,newImage.accessLevel.S),
        createConnection(id,newImage.userId.S,`${type}${STATUS}`,newImage.status.S),
        createConnection(id,newImage.userId.S,`${type}${CREATEDAT}`,newImage.createdAt.S),
        createConnection(id,newImage.userId.S,`${type}${UPDATEDAT}`,newImage.updatedAt.S))


        requestItems[tableConnectionName] = putRequests

        connectionModule.base.batchWriteItem(requestItems).then(data=>resolve(data)).catch(error=>reject(error))
    })
}

function deleteConnections(record){
    return new Promise((resolve,reject)=>{
        var id = record.dynamodb.Keys.id.S
        var oldImage = record.dynamodb.OldImage
        var type = oldImage.__typename.S

        Promise.all([        
            deleteConnection(id,oldImage.accountId.S,`${type}${ACCESSLEVEL}`),
            deleteConnection(id,oldImage.accountId.S,`${type}${STATUS}`),
            deleteConnection(id,oldImage.accountId.S,`${type}${CREATEDAT}`),
            deleteConnection(id,oldImage.accountId.S,`${type}${UPDATEDAT}`),
            deleteConnection(id,oldImage.userId.S,`${type}${ACCESSLEVEL}`),
            deleteConnection(id,oldImage.userId.S,`${type}${STATUS}`),
            deleteConnection(id,oldImage.userId.S,`${type}${CREATEDAT}`),
            deleteConnection(id,oldImage.userId.S,`${type}${UPDATEDAT}`)])
        .then(data=>resolve(data)).catch(error=>reject(error))
    })

}

function updateConnections(record){
    return new Promise((resolve,reject)=>{
        var id = record.dynamodb.Keys.id.S

        var newImage = record.dynamodb.NewImage
        var oldImage = record.dynamodb.OldImage
        var type = newImage.__typename.S

        var putRequests = []

        if(newImage.accessLevel.S != oldImage.accessLevel.S) {
            putRequests.push(createConnection(id,newImage.accountId.S,`${type}${ACCESSLEVEL}`,newImage.accessLevel.S))
            putRequests.push(createConnection(id,newImage.userId.S,`${type}${ACCESSLEVEL}`,newImage.accessLevel.S))
        }
        if(newImage.status.S != oldImage.status.S){
            putRequests.push(createConnection(id,newImage.accountId.S,`${type}${STATUS}`,newImage.status.S))
            putRequests.push(createConnection(id,newImage.userId.S,`${type}${STATUS}`,newImage.status.S))
        } 

        putRequests.push(createConnection(id,newImage.accountId.S,`${type}${UPDATEDAT}`,newImage.updatedAt.S))
        putRequests.push(createConnection(id,newImage.userId.S,`${type}${UPDATEDAT}`,newImage.updatedAt.S))
        
        requestItems[tableConnectionName] = putRequests
        connectionModule.base.batchWriteItem(requestItems).then(data=>resolve(data)).catch(error=>reject(error))
    })
}

function insert(record){
    new Promise((resolve,reject)=>{
        insertConnections(record).then(data=>resolve(data)).catch(error=>reject(error))
    }).then(data=>console.log(data)).catch(error=>console.log(error))
}

function update(record){
    new Promise((resolve,reject)=>{
        updateConnections(record).then(data=>resolve(data)).catch(error=>reject(error))
    }).then(data=>console.log(data)).catch(error=>console.log(error))
}

function remove(record){
    new Promise((resolve,reject)=>{
        deleteConnections(record).then(data=>resolve(data)).catch(error=>reject(error))
    }).then(data=>console.log(data)).catch(error=>console.log(error))
}

exports.connection = {
    insert:insertConnections,
    update: updateConnections,
    delete:deleteConnections
}


exports.insert = insert
exports.update = update
exports.remove = remove