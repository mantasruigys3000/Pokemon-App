
display = document.getElementById("poke-display")

for(let i = 1 ;i < 808; i++){
    var pokemonImg = document.createElement("img")
    pokemonImg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + i.toString() + ".png";
    pokemonImg.id = i;
    pokemonImg.classList.add('pokemonImg')
   
    pokeText = document.createElement('div')
    pokeText.innerHTML = i;
    pokeText.classList.add("pokeText")
   
   
    link = document.createElement('a');
    link.href = 'https://google.com';
    link.appendChild(pokemonImg);
    link.appendChild(pokeText)
    link.classList.add("pokeLink")
   
   
   
    display.appendChild(link);
}

