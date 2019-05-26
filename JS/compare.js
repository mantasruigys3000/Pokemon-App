


var ref = window.location.href
var url = new URL(ref)
const pokemon1 = url.searchParams.get("id1")
const pokemon2 = url.searchParams.get("id2")

document.getElementById("compareContainer1").children[1].src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"  + pokemon1 + ".png"

if(Number(pokemon2) <= 649){
    document.getElementById("compareContainer2").children[0].src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/"  + pokemon2 + ".png"
}else{
    document.getElementById("compareContainer2").children[0].src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"  + pokemon2 + ".png"
}

createMainInfo(pokemon1,function(data){
    poke1 = data;

    createMainInfo(pokemon2,function(poke2){
        addCompareInfo(poke1,poke2);
    })
})


function addCompareInfo(poke1,poke2){   
    // Names

    var nameTag1 = document.getElementById("compareContainer1").children[0]
    var nameTag2 = document.getElementById("compareContainer2").children[1]

    nameTag1.innerHTML = poke1.name;
    nameTag2.innerHTML = poke2.name;


}