

//Get Url Parameters
var ref = window.location.href
var url = new URL(ref)
const searchText = url.searchParams.get("search")
const favOnly = url.searchParams.get("favorite") // only show favorites 


favList = [] // locally stored fav list

if(localStorage.getItem("userFav") != null){ // read from stored favorites and put into variable for easy modification
    lst = localStorage.getItem("userFav").split(',');
    if (lst.length > 0){
        for(num of lst){
            favList.push(Number(num))
        }
    }

}




// Compare Banner
// set comp 1 and 2 variables to string types for easy comparison
if(window.sessionStorage.comp1 == null){
    window.sessionStorage.comp1 = "null"; // used to store the ID of the first pokemon being compared
}  
if(window.sessionStorage.comp2 == null){
    window.sessionStorage.comp2 = "null";
}   
updateCompBanner();







// Adding functionality to my form (search box)

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



// create each container
for(let i = 1 ;i < 808; i++){
    //image element
    var pokemonImg = document.createElement("img")
    pokemonImg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + i.toString() + ".png"; // get image for each pokemon
    pokemonImg.id = i;
    pokemonImg.classList.add('pokemonImg')
   
    //Text element
    pokeText = document.createElement('div')
    pokeText.id = i;
    pokeText.innerHTML = i;
    pokeText.classList.add("pokeText")

    //link element
    link = document.createElement('a');
    link.href = 'pokemon.html?id=' + i;
    link.appendChild(pokemonImg);
    link.appendChild(pokeText)
    link.classList.add("pokeLink")

    //container itself
    container = document.createElement("div")
    container.classList.add("pokeContainer")
    container.id = i
    container.appendChild(link)
    //Buttons
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
//Getting pokemon names
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
            textObj[i].innerHTML = fileObj.results[i].name // set text to pokemon name

            containerObj = document.getElementsByClassName("pokeContainer")
            containerObj[i].id = fileObj.results[i].name // set container to pokemon name
            if(searchText != null){
                
                if (containerObj[i].id.search(searchText.toLowerCase()) == -1){
                    containerObj[i].style.display = "none"; // if a pokemon is not in the search parameter then hide it
                }

            }
            if (favOnly == "true"){ // weather to only show favorites. this being below the search means you can search for favorites too
                if (!checkFavList(containerObj[i].children[1].id)){
                    containerObj[i].style.display = "none";
                }
            }
            
        } 
    }
}

function favToggle(element){ // toggle weather a pokemon is a favorite

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

function checkFavList(num){ // checks if pokemon is a favorite
    for (id of favList){
        if (id == num){
            return true;
        }
    }
    return false;
}

function compToggle(element){ // toggles a pokemon's position is the comparison banner

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

function updateCompBanner(){ // updates the sprites in the comparison banner
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

function clearComp(){ // clears comparison banner
    window.sessionStorage.comp1 = "null"
    window.sessionStorage.comp2 = "null"
    updateCompBanner();

}

function goCompare(){ // goes to comparison page
    if(window.sessionStorage.comp1 != "null" && window.sessionStorage.comp2 != "null")
        window.location.href = "./compare.html?id1=" + window.sessionStorage.comp1 + "&id2=" + window.sessionStorage.comp2; 
}