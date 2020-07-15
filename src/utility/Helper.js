import React from 'react'
import Icon from 'react-web-vector-icons'
var moment = require('moment')

export function getPageWrapperHeight(){
    return window.innerHeight - 135
}

export function compare(key){

    return function(a,b){
        const itemA = a[key].toLowerCase()
        const itemB = b[key].toLowerCase()

        if(itemA > itemB) return 1
        else if(itemA <= itemB) return -1
    }
}

export function getUrlParams(obj){
    
    var str = "";
    for (var key in obj) {
        if (str !== "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(obj[key]);
    }

    return str
}

export function getMomentFormat(date){

    var itemDate = moment(date)
    var now = moment()

    var duration = now.diff(itemDate,'days')

    if(duration<10) return moment(date).fromNow()

    return moment(date).format('MMM D, Y [@] HH:mm')
    
}

export function getStatusIcon(status,props){

    var iconName
    var color
    var size 

    if(typeof props === "undefined") size = 22

    if(status){
        iconName="check"
        color = "#33a437"    
    }
    else {
        iconName="close"
        color = "#b22143"    
    }

    return <Icon
                className="icon"
                name={iconName}
                font="MaterialCommunityIcons"
                color={color}
                size={size}/>

}

export function getTimeOptions(from=0,to=24){

    var i
    // var options=[{
    //     value:0,
    //     text:"Closed"
    // }]
    var options = []

    for(i = from ; i < to; i++){
        var len = `${i}`.length
    
        var option = {
            value: i,
            text: len <= 1 ? `0${i}:00` : `${i}:00`
        }

        options.push(option)
    }

    return options

}

export const normalizeTime = value => {

    if(value===false) return false

    var len = `${value}`.length

    const newValue = len <= 1 ? `0${value}:00` : `${value}:00`

    return newValue

}