const functions = require("../helper/functions")

function searchManagerPut(record){
      
      var id = record.dynamodb.Keys.id.S
      var newImage = record.dynamodb.NewImage
  
      var body = {
        "id":id,
        "name":newImage.name.S,
        "status":newImage.status.N,
        "__typename":newImage.__typename.S,
        "version":newImage.version.N,
        "createdAt":newImage.createdAt.S,
        "updatedAt":newImage.updatedAt.S
      }
  
      return functions.invokeLambdaSearchManager("put",`/account/_doc/${id}`,body)

  
  }
  
function searchManagerDelete(record){
    var id = record.dynamodb.Keys.id.S

    return functions.invokeLambdaSearchManager("delete",`/account/_doc/${id}`)

}
  
function insert(record){

    return searchManagerPut(record)
   
}

function update(record){
    return searchManagerPut(record)
}

function remove(record){
    return searchManagerDelete(record)
}


exports.insert = insert
exports.update = update
exports.remove = remove