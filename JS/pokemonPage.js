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


function createMainInfo(pokemonId,callback){

    mainLink = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
    pokemonInfo = {}  // object used for getting all relevant information for a pokemon
    api = new XMLHttpRequest();
    api.open('GET',mainLink,true);
    api.send();

    api.onreadystatechange = function(){
        if (api.readyState ===4 && api.status ===200){
            obj = JSON.parse(api.response)
            pokemonInfo.name = obj.name.charAt(0).toUpperCase() + obj.name.slice(1);

            statsObj = []

            for (stat of obj.stats){
                statName = stat.stat.name;
                statBase = stat.base_stat;

                statsObj.push({name:statName,baseStat:statBase})
            }

            typeText = ""
            for (type of obj.types){
                typeText += "/"
                typeText += type.type.name;

            }
            typeText = typeText.slice(1)

            statsObj.push({name:"type",baseStat:typeText})

            pokemonInfo.stats = statsObj;

            
            console.log(pokemonInfo.stats[0])

            pokemonInfo.sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonId + ".png"
            //methods
            pokemonInfo.getBaseStatByName = function(statName){
                
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


function getCharacteristics(pokemonInfo,callback){
    api = new XMLHttpRequest();
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

function addInfo(pokemonInfo){




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




