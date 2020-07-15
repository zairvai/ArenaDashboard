const functions = require("../helper/functions")

function searchManagerPut(record){
  
    //return new Promise((resolve,reject)=>{resolve(true)})
    
    var id = record.dynamodb.Keys.id.S
    var newImage = record.dynamodb.NewImage

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

    var price = []
    if(newImage.price){
      newImage.price.L.forEach(itemPrice=>{
        var detail = {}
        detail["day"] = itemPrice.M.day.S
        var hours = []
        itemPrice.M.hours.L.forEach(hour=>{
          var time = {}
          time["amount"] = hour.M.amount.N
          time["start"] = hour.M.start.S
          time["end"] = hour.M.end.S 
          hours.push(time)
        })
        detail["hours"] = hours
        price.push(detail)
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

    var account = {
      "id":newImage.accountId.S
    }

    var venue = {
      "id":newImage.venueId.S
    }


    var body = {
      "id":id,
      "name":newImage.name.S,
      "account":account,
      "venue":venue,
      "openHours": openHours,
      "location":{
        "lat": newImage.location.M.lat.N,
        "lon": newImage.location.M.lon.N
      },
      "address":newImage.address.S,
      "price": price,
      "entryType": newImage.entryType ? newImage.entryType.S : "",
      "tags":tags,
      "availStatus":newImage.availStatus.N,
      "status":newImage.status.N,
      "category":newImage.category.S,
      "courtType": newImage.courtType ? newImage.courtType.S : "",
      "__typename":newImage.__typename.S,
      "type":newImage.__typename.S,
      "version":newImage.version.N,
      "createdBy":newImage.createdBy.S,
      "updatedBy":newImage.updatedBy.S,
      "createdAt":newImage.createdAt.S,
      "updatedAt":newImage.updatedAt.S,
      "book_relations":{
        "name":"facility"
      }
    }

    return functions.invokeLambdaSearchManager("put",`/facility/_doc/${id}`,body)
}

function searchManagerDelete(record){
  

    var id = record.dynamodb.Keys.id.S

    return functions.invokeLambdaSearchManager("delete",`/facility/_doc/${id}`)

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