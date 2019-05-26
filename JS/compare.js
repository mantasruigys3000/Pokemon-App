


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

    tbls = document.getElementsByClassName("compareTableClass");

    fillCompareTable(tbls[0],poke1,poke2);
    fillCompareTable(tbls[1],poke2,poke1);


}

function fillCompareTable(tbl,data,compareData){
    console.log(tbl);

    rows = tbl.getElementsByTagName("tr")[1].children;
    for(var i = 1; i < rows.length;i++){
        statName = tbl.getElementsByTagName("tr")[0].children[i].innerText.toLowerCase();
        baseText = data.getBaseStatByName(statName);
        rows[i].innerHTML = baseText;
    }

    //images
    imgRows = tbl.getElementsByTagName("tr")[2].children;

    currentTypes = data.typeStats;
    compareTypes = compareData.typeStats;

    currentScore = getTypeComparison(currentTypes,compareTypes);
    compareScore = getTypeComparison(compareTypes,currentTypes);

    console.log(currentScore)
    console.log(compareScore)

    var img = getImageComparison(currentScore,compareScore);
    imgRows[1].children[0].src = img;


    for (var i = 2; i < imgRows.length ; i++){

        var currentBase = Number(rows[i].innerText);
        var compareBase = compareData.getBaseStatByName(tbl.getElementsByTagName("tr")[0].children[i].innerText.toLowerCase())
        var img = getImageComparison(currentBase,compareBase)
        imgRows[i].children[0].src = img;
    }

}


function getImageComparison(currentBase,compareBase){
    if (currentBase > compareBase){
        return "./img/compare/plus_one.png"
    }else{
        return "./img/compare/minus_one.png"
    }
}

function getTypeComparison(currentTypes,comapareTypes){
    
    score = 0;

    for (type of currentTypes){
        for(compareType of compareTypes){
            currentCompareType = compareType.name;
            console.log(type.stats.damage_relations.double_damage_from)
            if(getListHasType(type.stats.damage_relations.double_damage_from,currentCompareType)){
                score-=2;
            }
            if(getListHasType(type.stats.damage_relations.double_damage_to,currentCompareType)){
                score+=2;
            }
            if(getListHasType(type.stats.damage_relations.no_damage_to,currentCompareType)){
                score-=5;
            }
            if(getListHasType(type.stats.damage_relations.no_damage_from,currentCompareType)){
                score+=5;
            }
            if(getListHasType(type.stats.damage_relations.half_damage_from,currentCompareType)){
                score+=1;
            }
            if(getListHasType(type.stats.damage_relations.half_damage_to,currentCompareType)){
                score-=1;
            }
        }
    }
    return score;
}

function getListHasType(lst,type){
    for (element of lst){
        if (element.name == type){
            return true;
        }
    }
    return false;
}