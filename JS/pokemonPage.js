
if(document.title == "Pokemon"){

    var ref = window.location.href
    var url = new URL(ref)
    const pokeId = url.searchParams.get("id")

    image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokeId + ".png"
    imgDiv = document.getElementById("mainPokeImage")
    imgDiv.src = image;

    mainLink = "https://pokeapi.co/api/v2/pokemon/" + pokeId;
    charLink = "https://pokeapi.co/api/v2/pokemon-species/" + pokeId;








    createMainInfo(pokeId,function(data){
        addInfo(data)

        console.log(data)
    });

}

function createMainInfo(pokemonId,callback){ // gets relevant info of a pokemon by its id and returns it in the callback

    mainLink = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
    pokemonInfo = {}  // object used for getting all relevant information for a pokemon
    api = new XMLHttpRequest();
    api.open('GET',mainLink,true);
    api.send();

    api.onreadystatechange = function(){
        if (api.readyState ===4 && api.status ===200){
            obj = JSON.parse(api.response)
            pokemonInfo.name = obj.name.charAt(0).toUpperCase() + obj.name.slice(1); // capitalize first letter
            pokemonInfo.id = obj.id;


            statsObj = []

            for (stat of obj.stats){ // gets pokemon stats
                statName = stat.stat.name;
                statBase = stat.base_stat;

                statsObj.push({name:statName,baseStat:statBase})
            }

            typeText = "" // type
            for (type of obj.types){
                typeText += "/"
                typeText += type.type.name;

            }
            typeText = typeText.slice(1) // remove first slash

            statsObj.push({name:"type",baseStat:typeText})

            pokemonInfo.stats = statsObj;

            
            console.log(pokemonInfo.stats[0])

            pokemonInfo.sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonId + ".png"
            //methods
            pokemonInfo.getBaseStatByName = function(statName){ // returns stat value by name of stat
                
                for (i = 0; i < this.stats.length;i++){
                    if (this.stats[i].name == statName){
                        return this.stats[i].baseStat;
                    }
                }
                
               
            }

            console.log(pokemonInfo.getBaseStatByName("hp"))


            getCharacteristics(pokemonInfo,function(data){
                callback(pokemonInfo)
            })
            
           

        }
    }

}


function getCharacteristics(pokemonInfo,callback){ // call by get info to get description
    api = new XMLHttpRequest();
    charLink = "https://pokeapi.co/api/v2/pokemon-species/" + pokemonInfo.id;
    api.open('GET',charLink,true);
    api.send();

    api.onreadystatechange = function(){
        if (api.readyState ===4 && api.status ===200){
            obj = JSON.parse(api.response)
            
            for( desc in obj.flavor_text_entries){
                if (obj.flavor_text_entries[desc].language.name == "en"){
                    pokemonInfo.description = obj.flavor_text_entries[desc].flavor_text;
                }
            }


            callback(pokemonInfo)
            

        }
    }
}

function addInfo(pokemonInfo){ // adds gathered information into html page




    nameTag = document.getElementById("pokeName")
    nameTag.innerHTML = pokemonInfo.name

    descTag = document.getElementById("pokeDescription")
    descTag.innerHTML = pokemonInfo.description;

    tbl = document.getElementById("stats-table")
    rows = tbl.getElementsByTagName("table")[0].getElementsByTagName("tr")

    for (row of rows){
        headers = row.getElementsByTagName("th")
        if (headers.length > 1){
            //console.log(headers)
            headerName = headers[0].innerHTML.toLowerCase()
            statText = pokemonInfo.getBaseStatByName(headerName)
            headers[1].innerHTML = statText
        }
    }


}
