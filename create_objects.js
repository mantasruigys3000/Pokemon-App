/**
 * This file is used to request required data from the pokemon api in order to create a local JSON file of all pokemon
 * to prevent the need of many HTTP requests when the main page loads
 */

const fs = require('fs')
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const http = require('http')
const request = require('request')

url = 'http://pokeapi.co/api/v2/pokemon/';

obj = [];


for (i = 1; i < 900;i++){
    request(url + i.toString(),{json:true},function(err,res,body){
        if (err) {return console.log(err);}
        pokemon = {
            id : body.id,
            name : body.name
        }
        obj.push(pokemon)
        console.log(obj.length)
        if (obj.length == 500){
            write();

        }
    })
}


function write(){
    json = JSON.parse(obj);
    fs.writeFile('objects.json',json,function(err){
        console.log(err)
    })
}
