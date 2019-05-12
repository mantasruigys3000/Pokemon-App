var ref = window.location.href
var url = new URL(ref)
const pokeId = url.searchParams.get("id")

image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokeId + ".png"
imgDiv = document.getElementById("mainPokeImage")
imgDiv.src = image;

mainLink = "https://pokeapi.co/api/v2/pokemon/" + pokeId;



pokemonInfo = {} // object used for getting all relevant information for a pokemon


createMainInfo();


function createMainInfo(){
    api = new XMLHttpRequest();
    api.open('GET',mainLink,true);
    api.send();

    api.onreadystatechange = function(){
        if (api.readyState ===4 && api.status ===200){
            obj = JSON.parse(api.response)
            pokemonInfo.name = obj.name.charAt(0).toUpperCase() + obj.name.slice(1);
            addInfo();

        }
    }

}

function addInfo(){
    nameTag = document.getElementById("pokeName")
    nameTag.innerHTML = pokemonInfo.name
}