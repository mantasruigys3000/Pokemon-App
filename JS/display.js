
//Load names from objects.json. this method is far less expensive than than 807 http requests

var ref = window.location.href
var url = new URL(ref)
const searchText = url.searchParams.get("search")
const favOnly = url.searchParams.get("favorite")
console.log(favOnly)
console.log("local storage is" + localStorage.getItem("userFav"))

favList = []
if(localStorage.getItem("userFav") != null){
    lst = localStorage.getItem("userFav").split(',');
    if (lst.length > 0){
        for(num of lst){
            favList.push(Number(num))
        }
    }

}




// Compare Banner



updateCompBanner();









display = document.getElementById("poke-display")

searchButton = document.getElementById("pokeForm").children[1];
searchField = document.getElementById("pokeForm").children[0];
favSearch = document.getElementById("pokeForm").children[2];



document.getElementById("pokeForm").onsubmit = function(){
    window.location.href= "./index.html?favorite=false&search=" + document.getElementById("pokeForm").children[0].value;
    return false;
}

searchButton.onclick = function(){
    window.location.href= "./index.html?search=" + document.getElementById("pokeForm").children[0].value;
}

document.getElementById("pokeForm").children[0].value = searchText ;

favSearch.onclick = function(){
    window.location.href= "./index.html?favorite=true&search="
}




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

    
    //container.appendChild(pokemonImg)
    container.appendChild(link)
    favButton = document.createElement("input")
    favButton.type = "image"
    favButton.src =  (checkFavList(i)) ? "./img/star-yellow.png" : "./img/star-white.png";
    favButton.id = i;
    favButton.addEventListener("click",function(){
        favToggle(this)
    })
    favButton.classList.add("favButton")

    container.appendChild(favButton);

    compareButton = document.createElement("input")
    compareButton.type = "image"
    compareButton.src = "./img/compare-grey.png"
    compareButton.id = i;

    compareButton.classList.add("favButton");

    compareButton.addEventListener("click",function(){
        compToggle(this);
    })

    container.appendChild(compareButton);
   
    
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
            if (favOnly == "true"){
                if (!checkFavList(containerObj[i].children[1].id)){
                    containerObj[i].style.display = "none";
                }
            }
            
        } 
    }
}

function favToggle(element){

    if(checkFavList(element.id)){

        for(var i = 0; i < favList.length;i++){
            if(favList[i] == element.id){
                favList.splice(i,1);

            }
        }

        element.src = "./img/star-white.png";

    }else{
        favList.push(element.id)
        element.src = "./img/star-yellow.png";
    }

    localStorage.setItem("userFav",favList.toString())
    console.log(localStorage.userFav)

    
    
}

function checkFavList(num){
    for (id of favList){
        if (id == num){
            return true;
        }
    }
    return false;
}

function compToggle(element){

    if (Number(window.sessionStorage.comp1) == element.id){
        window.sessionStorage.comp1 = "null"
        updateCompBanner();
        return;
    }else if (Number(window.sessionStorage.comp2) == element.id){
        window.sessionStorage.comp2 = "null"
        updateCompBanner();
        return;
    }

    if (window.sessionStorage.comp1 == "null"){
        window.sessionStorage.comp1 = element.id;
    }else if (window.sessionStorage.comp2 == "null"){
        window.sessionStorage.comp2 = element.id;
    }

   

    updateCompBanner();
}

function updateCompBanner(){
    comp1 = window.sessionStorage.comp1;
    comp2 = window.sessionStorage.comp2;

    compBanner = document.getElementById("bannerComp");


    if (comp1== "null" && comp2 == "null"){
        compBanner.style.display = "none";
    }else{
        compBanner.style.display = "block";
        if (comp1 != "null"){
            compBanner.children[1].children[0].src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + Number(comp1) + ".png"
        }else{
            compBanner.children[1].children[0].src = "./img/empty.png"
        }
        if (comp2 != "null"){
            compBanner.children[3].children[0].src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + Number(comp2) + ".png"
        }else{
            compBanner.children[3].children[0].src = "./img/empty.png"
        }
    }
    
}

function clearComp(){
    window.sessionStorage.comp1 = "null"
    window.sessionStorage.comp2 = "null"
    updateCompBanner();

}

   