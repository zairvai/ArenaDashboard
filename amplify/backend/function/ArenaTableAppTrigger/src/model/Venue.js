const functions = require("../helper/functions")

function searchManagerPut(record){
    
    var id = record.dynamodb.Keys.id.S
    var newImage = record.dynamodb.NewImage

    var account = {
      "id":newImage.accountId.S
    }

    var openHours = []
    if(newImage.openHours && Array.isArray(newImage.openHours.L)){
      newImage.openHours.L.forEach(item=>{
        openHours.push({
          "day":item.M.day.S,
          "time":{
            "gte": item.M.from.S,
            "lte":item.M.to.S
          }
        })
      })
    }

    var tags = ""
    if(newImage.tags){
      var array = []
      newImage.tags.L.forEach(item=>{
        array.push(item.S)
      })
      tags = array.join(",")
    }

    var body = {
      "id":id,
      "name":newImage.name.S,
      "account":account,
      "location":{
        "lat": newImage.location.M.lat.N,
        "lon": newImage.location.M.lon.N
      },
      "address":newImage.address.S,
      "openHours":openHours,
      "tags":tags,
      "availStatus":newImage.availStatus.N,
      "status":newImage.status.N,
      "__typename":newImage.__typename.S,
      "version":newImage.version.N,
      "createdAt":newImage.createdAt.S,
      "updatedAt":newImage.updatedAt.S
    }

    return functions.invokeLambdaSearchManager("put",`/venue/_doc/${id}`,body)
}

function searchManagerDelete(record){
    var id = record.dynamodb.Keys.id.S
    return functions.invokeLambdaSearchManager("delete",`/venue/_doc/${id}`)
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

exports.search = {
  put:searchManagerPut,
  delete:searchManagerDelete
}

exports.insert = insert
exports.update = update
exports.remove = remove
