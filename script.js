let loadedPokemonArray = []
let loadedPokemon = 31;
let p = 0;

//-----loads Data from API-----//

async function loadPokemon() {
    loadedPokemonArray = [];
    document.getElementById('showPokedex').innerHTML = '';
    for (let i = 0; i < loadedPokemon; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        loadedPokemonArray.push(currentPokemon);
        renderPokemonInfo(i);
    }

}

//-----shows the Pokedex-----//

function renderPokemonInfo(i) {
    document.getElementById('showPokedex').innerHTML += `<div id="pokedex${i}" class="pokedex">
                                                                <h1 class="pokemonName">${loadedPokemonArray[i]['name']}</h1>
                                                                <img class="pokemonImg" src="${loadedPokemonArray[i]['sprites']['other']['home']['front_shiny']}" alt="">
                                                                <div id="pokemonInfo${i}" class="pokemonInfo"></div>
                                                            </div>`;
    showAbilities(i);
    renderDetails(i);
    changeBackgroundColor(i);

}

function showAbilities(i) {
    let firstAbility = `${loadedPokemonArray[i]['abilities'][0]}`;
    let secondAbility = `${loadedPokemonArray[i]['abilities'][1]}`;
    if (firstAbility) {
        document.getElementById(`pokemonInfo${i}`).innerHTML += `<div>
                                                                <div><b>Abilities:</b></div>
                                                                <div id="abilities${i}" class="abilities"><div>1) ${loadedPokemonArray[i]['abilities'][0]['ability']['name']}</div></div>
                                                                <button onclick="showDetails(${i})" class="showDetails" id="showDetails${i}">Show more</button>
                                                            </div>`
    }
    if (secondAbility == 'undefined') {
    } else {
        document.getElementById(`abilities${i}`).innerHTML += `<div>2) ${loadedPokemonArray[i]['abilities'][1]['ability']['name']}</div>`
    }
}

//-----shows the number of pokemons specified in the input field-----// 

function showMorePokemon() {
    let amount = document.getElementById('amountOfPokemonShown').value;
    if (amount <= 898) {
        loadedPokemon = amount;
        loadPokemon();
    } else {
        alert('Only a maximum of 898 Pokemon can be loaded')
    }
}

//-----shows the Pokemon Details-----//

function showDetails(i) {
    document.getElementById(`detailsBox${i}`).classList.remove('d-none');
}

function renderDetails(i) {
    details = document.getElementById('details');
    details.innerHTML += `<div class="detailsBox d-none" id="detailsBox${i}">
                            <h1 class="pokemonName">${loadedPokemonArray[i]['name']}</h1>
                            <img class="pokemonImg pokemonDetailsImg" src="${loadedPokemonArray[i]['sprites']['other']['home']['front_shiny']}" alt="">
                            <div class="pokemonDetails">
                                <div class="pokemonDetails1stContainer">
                                    <div class="type" id="type1${i}"></div><div class="type" id="type2${i}"></div>
                                </div>
                                <div class="pokemonDetails2ndContainer">
                                    <div class="statNames">
                                        <div class="stat">${loadedPokemonArray[i]['stats'][0]['stat']['name']}</div>
                                        <div class="stat">${loadedPokemonArray[i]['stats'][1]['stat']['name']}</div>
                                        <div class="stat">${loadedPokemonArray[i]['stats'][2]['stat']['name']}</div>
                                        <div class="stat">${loadedPokemonArray[i]['stats'][3]['stat']['name']}</div>
                                        <div class="stat">${loadedPokemonArray[i]['stats'][4]['stat']['name']}</div>
                                        <div class="stat">${loadedPokemonArray[i]['stats'][5]['stat']['name']}</div>
                                    </div>
                                    <div class="statBase">
                                        <div class="wholeBar"><div id="statbar${i}" class="startBar"></div></div>
                                        <div class="wholeBar"><div id="statbar${i}" class="startBar"></div></div>
                                        <div class="wholeBar"><div id="statbar${i}" class="startBar"></div></div>
                                        <div class="wholeBar"><div id="statbar${i}" class="startBar"></div></div>
                                        <div class="wholeBar"><div id="statbar${i}" class="startBar"></div></div>
                                        <div class="wholeBar"><div id="statbar${i}" class="startBar"></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>`
    renderTypes(i);
}

function renderTypes(i) {
    let secondType = `${loadedPokemonArray[i]['types'][1]}`;
    document.getElementById(`type1${i}`).innerHTML = `${loadedPokemonArray[i]['types'][0]['type']['name']}`
    if (secondType == 'undefined') {
    } else {
        document.getElementById(`type2${i}`).innerHTML = `${loadedPokemonArray[i]['types'][1]['type']['name']}`
    }
}

function move() {
    if (p == 0) {
        p = 1;
        let bar = document.getElementById(`statbar${i}`);
        let width = 1;
        let id = setInterval(frame, 10);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                p = 0;
            } else {
                width++;
                bar.style.width = width + "%";
            }
        }
    }
}

//-----changes the background color depending on the Pokemon type-----//

function changeBackgroundColor(i) {
    changeToGreen(i);
    changeToRed(i);
    changeToBlue(i);
    changeToDarkgreen(i);
    changeToLightgrey(i);
    changeToLightpurple(i);
    changeToLightbrown(i);
    changeToYellow(i);
    changeToLightpink(i);
    changeToOrange(i);
    changeToPink(i);
    changeToBronze(i);
    changeToPurple(i);
    changeToTurquoise(i);
    changeToRedorange(i);
    changeToGrey(i);
    changeToSilver(i);
}

function changeToGreen(i) {
    let secondType = `${loadedPokemonArray[i]['types'][1]}`;
    if (loadedPokemonArray[i]['types']['0']['type']['name'] == 'grass') {
        document.getElementById(`pokedex${i}`).classList.add('background-green');
        document.getElementById(`showDetails${i}`).classList.add('background-green')
        document.getElementById(`detailsBox${i}`).classList.add('background-green')
        document.getElementById(`type1${i}`).classList.add('background-green')
    }
    if (secondType == 'undefined') {
    } else {
        if (loadedPokemonArray[i]['types']['1']['type']['name'] == 'grass') {
            document.getElementById(`type2${i}`).classList.add('background-green')
        }
    }
}

function changeToRed(i) {
    let secondType = `${loadedPokemonArray[i]['types'][1]}`;
    if (loadedPokemonArray[i]['types']['0']['type']['name'] == 'fire') {
        document.getElementById(`pokedex${i}`).classList.add('background-red')
        document.getElementById(`showDetails${i}`).classList.add('background-red')
        document.getElementById(`detailsBox${i}`).classList.add('background-red')
        document.getElementById(`type1${i}`).classList.add('background-red')
    }
    if (secondType == 'undefined') {
    } else {
        if (loadedPokemonArray[i]['types']['1']['type']['name'] == 'fire') {
            document.getElementById(`type2${i}`).classList.add('background-red')
        }
    }
}

function changeToBlue(i) {
    let secondType = `${loadedPokemonArray[i]['types'][1]}`;
    if (loadedPokemonArray[i]['types']['0']['type']['name'] == 'water') {
        document.getElementById(`pokedex${i}`).classList.add('background-blue')
        document.getElementById(`showDetails${i}`).classList.add('background-blue')
        document.getElementById(`detailsBox${i}`).classList.add('background-blue')
        document.getElementById(`type1${i}`).classList.add('background-blue')
    }
    if (secondType == 'undefined') {
    } else {
        if (loadedPokemonArray[i]['types']['1']['type']['name'] == 'water') {
            document.getElementById(`type2${i}`).classList.add('background-blue')
        }
    }
}

function changeToDarkgreen(i) {
    let secondType = `${loadedPokemonArray[i]['types'][1]}`;
    if (loadedPokemonArray[i]['types']['0']['type']['name'] == 'bug') {
        document.getElementById(`pokedex${i}`).classList.add('background-darkgreen')
        document.getElementById(`showDetails${i}`).classList.add('background-darkgreen')
        document.getElementById(`detailsBox${i}`).classList.add('background-darkgreen')
        document.getElementById(`type1${i}`).classList.add('background-darkgreen')
    }
    if (secondType == 'undefined') {
    } else {
        if (loadedPokemonArray[i]['types']['1']['type']['name'] == 'bug') {
            document.getElementById(`type2${i}`).classList.add('background-darkgreen')
        }
    }
}

function changeToLightgrey(i) {
    let secondType = `${loadedPokemonArray[i]['types'][1]}`;
    let type1 = loadedPokemonArray[i]['types']['0']['type']['name'];
    if (type1 == 'normal' || type1 == 'flying') {
        document.getElementById(`pokedex${i}`).classList.add('background-lightgrey')
        document.getElementById(`showDetails${i}`).classList.add('background-lightgrey')
        document.getElementById(`detailsBox${i}`).classList.add('background-lightgrey')
        document.getElementById(`type1${i}`).classList.add('background-lightgrey')
    }
    if (secondType == 'undefined') {
    } else {
        changeSecondTypeToLightgrey(i);
    }
}

function changeSecondTypeToLightgrey(i) {
    let type2 = loadedPokemonArray[i]['types']['1']['type']['name'];
    if (type2 == 'normal' || type2 == 'flying') {
        document.getElementById(`type2${i}`).classList.add('background-lightgrey')
    }
}


function changeToLightpurple(i) {
    let secondType = `${loadedPokemonArray[i]['types'][1]}`;
    if (loadedPokemonArray[i]['types']['0']['type']['name'] == 'poison') {
        document.getElementById(`pokedex${i}`).classList.add('background-lightpurple')
        document.getElementById(`showDetails${i}`).classList.add('background-lightpurple')
        document.getElementById(`detailsBox${i}`).classList.add('background-lightpurple')
        document.getElementById(`type1${i}`).classList.add('background-lightpurple')
        
    }
    if (secondType == 'undefined') {
    } else {
        if (loadedPokemonArray[i]['types']['1']['type']['name'] == 'poison') {
            document.getElementById(`type2${i}`).classList.add('background-lightpurple')
        }
    }
}

function changeToLightbrown(i) {
    let secondType = `${loadedPokemonArray[i]['types'][1]}`;
    if (loadedPokemonArray[i]['types']['0']['type']['name'] == 'ground') {
        document.getElementById(`pokedex${i}`).classList.add('background-lightbrown')
        document.getElementById(`showDetails${i}`).classList.add('background-lightbrown')
        document.getElementById(`detailsBox${i}`).classList.add('background-lightbrown')
        document.getElementById(`type1${i}`).classList.add('background-lightbrown')
    }
    if (secondType == 'undefined') {
    } else {
        if (loadedPokemonArray[i]['types']['1']['type']['name'] == 'ground') {
            document.getElementById(`type2${i}`).classList.add('background-lightbrown')
        }
    }
}

function changeToYellow(i) {
    let secondType = `${loadedPokemonArray[i]['types'][1]}`;
    if (loadedPokemonArray[i]['types']['0']['type']['name'] == 'electric') {
        document.getElementById(`pokedex${i}`).classList.add('background-yellow')
        document.getElementById(`showDetails${i}`).classList.add('background-yellow')
        document.getElementById(`detailsBox${i}`).classList.add('background-yellow')
        document.getElementById(`type1${i}`).classList.add('background-yellow')
    }
    if (secondType == 'undefined') {
    } else {
        if (loadedPokemonArray[i]['types']['1']['type']['name'] == 'electric') {
            document.getElementById(`type2${i}`).classList.add('background-yellow')
        }
    }
}

function changeToLightpink(i) {
    let secondType = `${loadedPokemonArray[i]['types'][1]}`;
    if (loadedPokemonArray[i]['types']['0']['type']['name'] == 'fairy') {
        document.getElementById(`pokedex${i}`).classList.add('background-lightpink')
        document.getElementById(`showDetails${i}`).classList.add('background-lightpink')
        document.getElementById(`detailsBox${i}`).classList.add('background-lightpink')
        document.getElementById(`type1${i}`).classList.add('background-lightpink')
    }
    if (secondType == 'undefined') {
    } else {
        if (loadedPokemonArray[i]['types']['1']['type']['name'] == 'fairy') {
            document.getElementById(`type2${i}`).classList.add('background-lightpink')
        }
    }
}

function changeToOrange(i) {
    let secondType = `${loadedPokemonArray[i]['types'][1]}`;
    if (loadedPokemonArray[i]['types']['0']['type']['name'] == 'fighting') {
        document.getElementById(`pokedex${i}`).classList.add('background-orange')
        document.getElementById(`showDetails${i}`).classList.add('background-orange')
        document.getElementById(`detailsBox${i}`).classList.add('background-orange')
        document.getElementById(`type1${i}`).classList.add('background-orange')
    }
    if (secondType == 'undefined') {
    } else {
        if (loadedPokemonArray[i]['types']['1']['type']['name'] == 'fighting') {
            document.getElementById(`type2${i}`).classList.add('background-orange')
        }
    }
}

function changeToPink(i) {
    let secondType = `${loadedPokemonArray[i]['types'][1]}`;
    if (loadedPokemonArray[i]['types']['0']['type']['name'] == 'psychic') {
        document.getElementById(`pokedex${i}`).classList.add('background-pink')
        document.getElementById(`showDetails${i}`).classList.add('background-pink')
        document.getElementById(`detailsBox${i}`).classList.add('background-pink')
        document.getElementById(`type1${i}`).classList.add('background-pink')
    }
    if (secondType == 'undefined') {
    } else {
        if (loadedPokemonArray[i]['types']['1']['type']['name'] == 'psychic') {
            document.getElementById(`type2${i}`).classList.add('background-pink')
        }
    }
}

function changeToBronze(i) {
    let secondType = `${loadedPokemonArray[i]['types'][1]}`;
    if (loadedPokemonArray[i]['types']['0']['type']['name'] == 'rock') {
        document.getElementById(`pokedex${i}`).classList.add('background-bronze')
        document.getElementById(`showDetails${i}`).classList.add('background-bronze')
        document.getElementById(`detailsBox${i}`).classList.add('background-bronze')
        document.getElementById(`type1${i}`).classList.add('background-bronze')
    }
    if (secondType == 'undefined') {
    } else {
        if (loadedPokemonArray[i]['types']['1']['type']['name'] == 'rock') {
            document.getElementById(`type2${i}`).classList.add('background-bronze')
        }
    }
}

function changeToPurple(i) {
    let secondType = `${loadedPokemonArray[i]['types'][1]}`;
    if (loadedPokemonArray[i]['types']['0']['type']['name'] == 'ghost') {
        document.getElementById(`pokedex${i}`).classList.add('background-purple')
        document.getElementById(`showDetails${i}`).classList.add('background-purple')
        document.getElementById(`detailsBox${i}`).classList.add('background-purple')
        document.getElementById(`type1${i}`).classList.add('background-purple')
    }
    if (secondType == 'undefined') {
    } else {
        if (loadedPokemonArray[i]['types']['1']['type']['name'] == 'ghost') {
            document.getElementById(`type2${i}`).classList.add('background-purple')
        }
    }
}

function changeToTurquoise(i) {
    let secondType = `${loadedPokemonArray[i]['types'][1]}`;
    if (loadedPokemonArray[i]['types']['0']['type']['name'] == 'ice') {
        document.getElementById(`pokedex${i}`).classList.add('background-turquoise')
        document.getElementById(`showDetails${i}`).classList.add('background-turquoise')
        document.getElementById(`detailsBox${i}`).classList.add('background-turquoise')
        document.getElementById(`type1${i}`).classList.add('background-turquoise')
    }
    if (secondType == 'undefined') {
    } else {
        if (loadedPokemonArray[i]['types']['1']['type']['name'] == 'ice') {
            document.getElementById(`type2${i}`).classList.add('background-turquoise')
        }
    }
}

function changeToRedorange(i) {
    let secondType = `${loadedPokemonArray[i]['types'][1]}`;
    if (loadedPokemonArray[i]['types']['0']['type']['name'] == 'dragon') {
        document.getElementById(`pokedex${i}`).classList.add('background-redorange')
        document.getElementById(`showDetails${i}`).classList.add('background-redorange')
        document.getElementById(`detailsBox${i}`).classList.add('background-redorange')
        document.getElementById(`type1${i}`).classList.add('background-redorange')
    }
    if (secondType == 'undefined') {
    } else {
        if (loadedPokemonArray[i]['types']['1']['type']['name'] == 'dragon') {
            document.getElementById(`type2${i}`).classList.add('background-redorange')
        }
    }
}

function changeToGrey(i) {
    let secondType = `${loadedPokemonArray[i]['types'][1]}`;
    if (loadedPokemonArray[i]['types']['0']['type']['name'] == 'dark') {
        document.getElementById(`pokedex${i}`).classList.add('background-grey')
        document.getElementById(`showDetails${i}`).classList.add('background-grey')
        document.getElementById(`detailsBox${i}`).classList.add('background-grey')
        document.getElementById(`type1${i}`).classList.add('background-grey')
    }
    if (secondType == 'undefined') {
    } else {
        if (loadedPokemonArray[i]['types']['1']['type']['name'] == 'dark') {
            document.getElementById(`type2${i}`).classList.add('background-grey')
        }
    }
}

function changeToSilver(i) {
    let secondType = `${loadedPokemonArray[i]['types'][1]}`;
    if (loadedPokemonArray[i]['types']['0']['type']['name'] == 'steel') {
        document.getElementById(`pokedex${i}`).classList.add('background-silver')
        document.getElementById(`showDetails${i}`).classList.add('background-silver')
        document.getElementById(`detailsBox${i}`).classList.add('background-silver')
        document.getElementById(`type1${i}`).classList.add('background-silver')
    }
    if (secondType == 'undefined') {
    } else {
        if (loadedPokemonArray[i]['types']['1']['type']['name'] == 'steel') {
            document.getElementById(`type2${i}`).classList.add('background-silver')
        }
    }
}