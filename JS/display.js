
//Load names from objects.json. this method is far less expensive than than 807 http requests





display = document.getElementById("poke-display")

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
        } 
    }
}
function changeText(element,text){
    element.innerHTML = "changed"
}

function loadText(){
   
}