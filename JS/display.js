
//Load names from objects.json. this method is far less expensive than than 807 http requests

var ref = window.location.href
var url = new URL(ref)
const searchText = url.searchParams.get("search")

display = document.getElementById("poke-display")

searchButton = document.getElementById("pokeForm").children[1];
searchField = document.getElementById("pokeForm").children[0];



document.getElementById("pokeForm").onsubmit = function(){
    window.location.href= "./index.html?search=" + document.getElementById("pokeForm").children[0].value;
    return false;
}

searchButton.onclick = function(){
    window.location.href= "./index.html?search=" + document.getElementById("pokeForm").children[0].value;
}

document.getElementById("pokeForm").children[0].value = searchText ;





for(let i = 1 ;i < 808; i++){
    var pokemonImg = document.createElement("img")
    pokemonImg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + i.toString() + ".png";
    pokemonImg.id = i;
    pokemonImg.classList.add('pokemonImg')
   
    pokeText = document.createElement('div')
    pokeText.id = i;
    pokeText.innerHTML = i;

    pokeText.classList.add("pokeText")
    //changeText(pokeText)
   
    link = document.createElement('a');
    link.href = 'pokemon.html?id=' + i;
    link.appendChild(pokemonImg);
    link.appendChild(pokeText)
    link.classList.add("pokeLink")

    container = document.createElement("div")
    container.classList.add("pokeContainer")
    container.id = i

    container.appendChild(link)
    //container.appendChild(pokemonImg)
   
   
   
    display.appendChild(container);
}

link = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=807"

file = new XMLHttpRequest();
file.open('GET',link,true)
file.send();
fileObj = {}

file.onreadystatechange = function(){

    

    if (file.readyState ===4 && file.status ===200){
    fileObj = JSON.parse(file.responseText);
    
        for( i in fileObj.results){
            textObj = document.getElementsByClassName("pokeText")
            textObj[i].innerHTML = fileObj.results[i].name

            containerObj = document.getElementsByClassName("pokeContainer")
            containerObj[i].id = fileObj.results[i].name
            if(searchText != null){
                
                if (containerObj[i].id.search(searchText.toLowerCase()) == -1){
                    containerObj[i].style.display = "none";
                }

            }
            
        } 
    }
}



   