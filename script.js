let loadedPokemonArray = [];
let alreadyloadedPokemon = 0;
let PokemonToLoad = 28;
let currentPokemons = [];


/**
 * This function will load data from the API
 */

async function loadPokemon() {
    for (let i = 0; i < 28; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        loadedPokemonArray.push(currentPokemon);
    }
    renderPokemonInfo();
    loadAllPokemon();
}


/**
 * This function will load Data from the API
 */

async function loadAllPokemon() {
    for (let i = 29; i < 898; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        loadedPokemonArray.push(currentPokemon);
    }
}

/**
 * This function will refresh the Website
 */

function refresh() {
    scrollToTop();
    document.getElementById('details').innerHTML = '';
    document.getElementById('showPokedex').innerHTML = '';
    document.getElementById('listSearchfield').classList.add('d-none');
    document.body.classList.remove('overflowHidden');
    document.getElementById('noScrollNoClick').classList.remove('noScrollNoClick');
    document.getElementById('search').value = '';
    alreadyloadedPokemon = 0;
    PokemonToLoad = 30;
    renderPokemonInfo();

}


/**
 * This function will render the main-content
 */

function renderPokemonInfo() {
    currentPokemons = [];
    currentPokemons.push(loadedPokemonArray);
    renderPokemonInfoTemplate();
    alreadyloadedPokemon = PokemonToLoad;
    document.getElementById('waves').classList.add('d-none');
}


/**
 * This is a Template for the main-content
 */

function renderPokemonInfoTemplate() {
    for (let i = alreadyloadedPokemon; i < PokemonToLoad; i++) {
        renderPokemonInfoHtmlTemplate(i);
        renderDetails(i);
        showAbilities(i);
        checkTypes(i);
    }
}


/**
 * This function is made to search a specific pokemon 
 */

function searchPokemon() {
    scrollToTop();
    let search = document.getElementById('search').value;
    let pokedex = document.getElementById('showPokedex');
    let listSearchfield = document.getElementById('listSearchfield');
    search = search.toLowerCase();
    startSearch(search, pokedex, listSearchfield);
    checkIfTheSearchfieldGotCleared(search, pokedex, listSearchfield);
}


/**
 * This function checks if there are more then 2 characters in the inputfield, if not another function starts
 * 
 * @param {Inputfield to search pokemon} search 
 * @param {Main-contetn} pokedex 
 * @param {List of Pokemon under the Inputfield} listSearchfield 
 */

function startSearch(search, pokedex, listSearchfield) {
    if (searchfieldValueSmallerThen2(search)) {
        listSearchfield.classList.remove('d-none');
        listSearchfield.innerHTML = `<div class="padding3px">'Enter at least 2 characters'</div>`;
    } else {
        valueofSearchBiggerThen2(search, pokedex, listSearchfield);
    }
}


/**
 * This function just returns if there are more as 1 characters in the searchfield
 * 
 * @param {Inputfield to search pokemon} search 
 * @returns 
 */

function searchfieldValueSmallerThen2(search) {
    return search.length < 2;
}


/**
 *  This function will prepare the website to show the pokeoms
 * 
 *  @param {Inputfield to search pokemon} search 
 *  @param {Main-contetn} pokedex 
 *  @param {List of Pokemon under the Inputfield} listSearchfield 
 */

function valueofSearchBiggerThen2(search, pokedex, listSearchfield) {
    currentPokemons = [];
    document.getElementById('details').innerHTML = '';
    pokedex.innerHTML = '';
    listSearchfield.innerHTML = '';
    listSearchfield.classList.remove('d-none');
    let filtered = loadedPokemonArray.filter(pokemon => String(pokemon.name).startsWith(search));
    currentPokemons.push(filtered);
    checksIfThePokemonExists(filtered, pokedex, listSearchfield);
}


/**
 *  This function checks if the Pokemon which you search for exists or not
 * 
 *  @param {Main-contetn} pokedex 
 *  @param {List of Pokemon under the Inputfield} listSearchfield 
 */

function checksIfThePokemonExists(filtered, pokedex, listSearchfield) {
    if (noPokemonFound(filtered)) {
        listSearchfield.classList.add('d-none');
        pokedex.innerHTML += '<div class="notFound">no pokemon with this name could be found!</div>';
    } else {
        renderSearchPokedex(filtered, pokedex, listSearchfield);
    }
}


/**
 * This function just returns if the filtered array is empty
 * 
 * @returns 
 */

function noPokemonFound(filtered) {
    return filtered.length == 0;
}


/**
 *  This function will render the searched pokemon 
 * 
 *  @param {Main-contetn} pokedex 
 *  @param {List of Pokemon under the Inputfield} listSearchfield 
 */

function renderSearchPokedex(filtered, pokedex, listSearchfield) {
    for (let i = 0; i < filtered.length; i++) {
        listSearchfield.innerHTML += `<div class="showName" onclick="showDetails(${i})">${currentPokemons[0][i]['name']}</div>`;
        renderSearchPokedexTemplate(i, pokedex);
        showAbilities(i);
        renderDetails(i);
        checkTypes(i);
    }
}


/**
 *  This function chekcs if the searchfield got cleared and will render the startpage if that is the case
 * 
 *  @param {Inputfield to search pokemon} search 
 *  @param {Main-contetn} pokedex 
 *  @param {List of Pokemon under the Inputfield} listSearchfield 
 */

function checkIfTheSearchfieldGotCleared(search, pokedex, listSearchfield) {
    if (searchfieldIsEmpty(search)) {
        document.getElementById('details').innerHTML = '';
        pokedex.innerHTML = '';
        listSearchfield.classList.add('d-none');
        alreadyloadedPokemon = 0;
        PokemonToLoad = 30;
        renderPokemonInfo();
    }
}


/**
 * This functiion just returns is the seachfield is empty
 * 
 * @param {Inputfield to search pokemon} search 
 */

function searchfieldIsEmpty(search) {
    return search.length == 0;
}


/**
 * This function will show you the abilities of each pokemon
 * 
 * @param {*} i 
 */

function showAbilities(i) {
    let firstAbility = `${currentPokemons[0][i]['abilities'][0]}`;
    let secondAbility = `${currentPokemons[0][i]['abilities'][1]}`;
    if (firstAbility) {
        renderfirstAbilityTemplate(i);
    }
    if (secondAbility == 'undefined') {
    } else {
        rednerSecondAbilityTemplate(i);
    }
}


/**
 * This function will load more pokemon if you reach the bottom of the website
 */

window.addEventListener('scroll', () => {
    let scrollable = document.documentElement.scrollHeight - window.innerHeight;
    let scrolled = window.scrollY;
    let search = document.getElementById('search').value;
    if (pageIsScrolledToBottomAndTheSearchIsNotActive(scrollable, scrolled, search)) {
        if (PokemonToLoad < 894) {
            PokemonToLoad += 5;
            renderPokemonInfo();
        }
    }
});


/**
 * This function just returns if you reached the bottom of the website and if the Searchfield is empty
 * 
 * @param {*} scrollable 
 * @param {*} scrolled 
 * @param {*} search 
 * @returns 
 */

function pageIsScrolledToBottomAndTheSearchIsNotActive(scrollable, scrolled, search) {
    return Math.ceil(scrolled) === scrollable && search.length == 0;
}

/**
 * This function will scroll to the top as soon as you refresh the Page
 */

window.onbeforeunload = function () {
    scrollToTop();
}

/**
 * This function will scroll to the top
 */

function scrollToTop() {
    window.scrollTo(0, 0);
}


/**
 * This function will add the class d-none
 */

function addDnone() {
    document.getElementById('listSearchfield').classList.add('d-none');
}


/**
 * This function will open the detailsbox and it will make the background unscroll and unclickable
 * 
 * @param {*} i 
 */

function showDetails(i) {
    document.getElementById('listSearchfield').classList.add('d-none');
    document.getElementById(`detailsBox${i}`).classList.remove('d-none');
    document.getElementById('noScrollNoClick').classList.add('noScrollNoClick');
    document.body.classList.add('overflowHidden');
    renderDetails(i);
}


/**
 * This function will render all details in the detailbox
 * 
 * @param {*} i 
 */

function renderDetails(i) {
    details = document.getElementById('details');
    renderDetailsTemplate(i, details);
    showStatBar(i);
}


/**
 * This function will show you the statbars in the detailsbox, the statbars will have a different sice depending on the screensice 
 * 
 * @param {*} i 
 */

function showStatBar(i) {
    showStatbar400pxTemplate(i);
    showStatbar550pxTemplate(i);
    showStatBar650pxTemplate(i);
    showStatBarMoreThen650pxTemplate(i);
}


/**
 * This function will close the Detailbox
 * 
 * @param {*} i 
 */

function closeDetails(i) {
    document.getElementById(`detailsBox${i}`).classList.add('d-none');
    document.body.classList.remove('overflowHidden');
    document.getElementById('noScrollNoClick').classList.remove('noScrollNoClick');
}


/**
 * This function will check the different pokemontypes
 * 
 * @param {*} i 
 */

function checkTypes(i) {
    renderGrassPokemon(i);
    renderFirePokemon(i);
    renderWaterPokemon(i);
    renderBugPokemon(i);
    renderFlyingPokemon(i);
    renderPoisonPokemon(i);
    renderGroundPokemon(i);
    renderElectricPokemon(i);
    renderFairyPokemon(i);
    renderFightingPokemon(i);
    renderNormalPokemon(i);
    renderPsychicPokemon(i);
    renderRockPokemon(i);
    renderGhostPokemon(i);
    renderIcePokemon(i);
    renderDragonPokemon(i);
    renderDarkPokemon(i);
    renderSteelPokemon(i);
}


/**
 * This function will modify the detailsbox if type 2 doesn´t exist
 */

function type2doesNotExist(i) {
    document.getElementById(`type2${i}`).classList.remove('type');
    document.getElementById(`pokemonDetails1stContainer${i}`).classList.add('center');
}


/**
 * This function will let you know which class the pokemon belongs, it will change the backgrounds and it will tell you the class 
 * 
 * @param {*} i 
 */

function renderGrassPokemon(i) {
    ifType1IsGrass(i);
    doesType2ExistAndIsGrass(i);
}


/**
 * This function will check Type 1 of the Pokemon
 * 
 * @param {*} i 
 */

function ifType1IsGrass(i) {
    if (currentPokemons[0][i]['types']['0']['type']['name'] == 'grass') {
        document.getElementById(`pokedex${i}`).classList.add('background-green');
        document.getElementById(`showDetails${i}`).classList.add('background-green');
        document.getElementById(`detailsBox${i}`).classList.add('background-green');
        document.getElementById(`type1${i}`).classList.add('background-green');
        document.getElementById(`type1${i}`).innerHTML = `<img class="icon" src="img/grass.png"><div>${currentPokemons[0][i]['types'][0]['type']['name']}</div>`;
    }
}


/**
 * This function will check Type 2 of the Pokemon
 * 
 * @param {*} i 
 */

function doesType2ExistAndIsGrass(i) {
    if (`${currentPokemons[0][i]['types']['1']}` == 'undefined') {
        type2doesNotExist(i);
    } else {
        if (currentPokemons[0][i]['types']['1']['type']['name'] == 'grass') {
            document.getElementById(`type2${i}`).classList.add('background-green');
            document.getElementById(`type2${i}`).innerHTML = `<img class="icon" src="img/grass.png"><div>${currentPokemons[0][i]['types'][1]['type']['name']}</div>`;
        }
    }
}


/**
 * This function will let you know which class the pokemon belongs, it will change the backgrounds and it will tell you the class 
 * 
 * @param {*} i 
 */

function renderFirePokemon(i) {
    ifType1IsFire(i);
    doesType2ExistAndIsFire(i);
}


/**
 * This function will check Type 1 of the Pokemon
 * 
 * @param {*} i 
 */

function ifType1IsFire(i) {
    if (currentPokemons[0][i]['types']['0']['type']['name'] == 'fire') {
        document.getElementById(`pokedex${i}`).classList.add('background-red');
        document.getElementById(`showDetails${i}`).classList.add('background-red');
        document.getElementById(`detailsBox${i}`).classList.add('background-red');
        document.getElementById(`type1${i}`).classList.add('background-red');
        document.getElementById(`type1${i}`).innerHTML = `<img class="icon" src="img/fire.png"><div>${currentPokemons[0][i]['types'][0]['type']['name']}</div>`;
    }
}


/**
 * This function will check Type 2 of the Pokemon
 * 
 * @param {*} i 
 */

function doesType2ExistAndIsFire(i) {
    if (`${currentPokemons[0][i]['types']['1']}` == 'undefined') {
        type2doesNotExist(i);
    } else {
        if (currentPokemons[0][i]['types']['1']['type']['name'] == 'fire') {
            document.getElementById(`pokemonDetails1stContainer${i}`).classList.remove('center');
            document.getElementById(`type2${i}`).classList.add('background-red');
            document.getElementById(`type2${i}`).innerHTML = `<img class="icon" src="img/fire.png"><div>${currentPokemons[0][i]['types'][1]['type']['name']}</div>`;
        }
    }
}


/**
 * This function will let you know which class the pokemon belongs, it will change the backgrounds and it will tell you the class 
 * 
 * @param {*} i 
 */

function renderWaterPokemon(i) {
    ifType1IsWater(i);
    doesType2ExistAndIsWater(i);
}


/**
 * This function will check Type 1 of the Pokemon
 * 
 * @param {*} i 
 */

function ifType1IsWater(i) {
    if (currentPokemons[0][i]['types']['0']['type']['name'] == 'water') {
        document.getElementById(`pokedex${i}`).classList.add('background-blue');
        document.getElementById(`showDetails${i}`).classList.add('background-blue');
        document.getElementById(`detailsBox${i}`).classList.add('background-blue');
        document.getElementById(`type1${i}`).classList.add('background-blue');
        document.getElementById(`type1${i}`).innerHTML = `<img class="icon" src="img/water.png"><div>${currentPokemons[0][i]['types'][0]['type']['name']}</div>`;
    }
}


/**
 * This function will check Type 2 of the Pokemon
 * 
 * @param {*} i 
 */

function doesType2ExistAndIsWater(i) {
    if (`${currentPokemons[0][i]['types']['1']}` == 'undefined') {
        type2doesNotExist(i);
    } else {
        if (currentPokemons[0][i]['types']['1']['type']['name'] == 'water') {
            document.getElementById(`type2${i}`).classList.add('background-blue');
            document.getElementById(`type2${i}`).innerHTML = `<img class="icon" src="img/water.png"><div>${currentPokemons[0][i]['types'][1]['type']['name']}</div>`;
        }
    }
}

/**
 * This function will let you know which class the pokemon belongs, it will change the backgrounds and it will tell you the class 
 * 
 * @param {*} i 
 */

function renderBugPokemon(i) {
    ifType1IsBug(i);
    doesType2ExistAndIsBug(i);
}


/**
 * This function will check Type 1 of the Pokemon
 * 
 * @param {*} i 
 */

function ifType1IsBug(i) {
    if (currentPokemons[0][i]['types']['0']['type']['name'] == 'bug') {
        document.getElementById(`pokedex${i}`).classList.add('background-darkgreen');
        document.getElementById(`showDetails${i}`).classList.add('background-darkgreen');
        document.getElementById(`detailsBox${i}`).classList.add('background-darkgreen');
        document.getElementById(`type1${i}`).classList.add('background-darkgreen');
        document.getElementById(`type1${i}`).innerHTML = `<img class="icon" src="img/bug.png"><div>${currentPokemons[0][i]['types'][0]['type']['name']}</div>`;
    }
}


/**
 * This function will check Type 2 of the Pokemon
 * 
 * @param {*} i 
 */

function doesType2ExistAndIsBug(i) {
    if (`${currentPokemons[0][i]['types']['1']}` == 'undefined') {
        type2doesNotExist(i);
    } else {
        if (currentPokemons[0][i]['types']['1']['type']['name'] == 'bug') {
            document.getElementById(`type2${i}`).classList.add('background-darkgreen');
            document.getElementById(`type2${i}`).innerHTML = `<img class="icon" src="img/bug.png"><div>${currentPokemons[0][i]['types'][1]['type']['name']}</div>`;
        }
    }
}


/**
 * This function will let you know which class the pokemon belongs, it will change the backgrounds and it will tell you the class 
 * 
 * @param {*} i 
 */

function renderFlyingPokemon(i) {
    ifType1IsFlying(i);
    doesType2ExistAndIsFlying(i);
}


/**
 * This function will check Type 1 of the Pokemon
 * 
 * @param {*} i 
 */

function ifType1IsFlying(i) {
    if (currentPokemons[0][i]['types']['0']['type']['name'] == 'flying') {
        document.getElementById(`pokedex${i}`).classList.add('background-lightgrey');
        document.getElementById(`showDetails${i}`).classList.add('background-lightgrey');
        document.getElementById(`detailsBox${i}`).classList.add('background-lightgrey');
        document.getElementById(`type1${i}`).classList.add('background-lightgrey');
        document.getElementById(`type1${i}`).innerHTML = `<img class="icon" src="img/flying.png"><div>${currentPokemons[0][i]['types'][0]['type']['name']}</div>`;
    }
}


/**
 * This function will check Type 2 of the Pokemon
 * 
 * @param {*} i 
 */

function doesType2ExistAndIsFlying(i) {
    if (`${currentPokemons[0][i]['types']['1']}` == 'undefined') {
        type2doesNotExist(i);
    } else {
        if (currentPokemons[0][i]['types']['1']['type']['name'] == 'flying') {
            document.getElementById(`type2${i}`).classList.add('background-lightgrey');
            document.getElementById(`type2${i}`).innerHTML = `<img class="icon" src="img/flying.png"><div>${currentPokemons[0][i]['types'][1]['type']['name']}</div>`;
        }
    }
}


/**
 * This function will let you know which class the pokemon belongs, it will change the backgrounds and it will tell you the class 
 * 
 * @param {*} i 
 */

function renderNormalPokemon(i) {
    ifType1IsNormal(i);
    doesType2ExistAndIsNormal(i);
}


/**
 * This function will check Type 1 of the Pokemon
 * 
 * @param {*} i 
 */

function ifType1IsNormal(i) {
    if (currentPokemons[0][i]['types']['0']['type']['name'] == 'normal') {
        document.getElementById(`pokedex${i}`).classList.add('background-lightgrey');
        document.getElementById(`showDetails${i}`).classList.add('background-lightgrey');
        document.getElementById(`detailsBox${i}`).classList.add('background-lightgrey');
        document.getElementById(`type1${i}`).classList.add('background-lightgrey');
        document.getElementById(`type1${i}`).innerHTML = `<img class="icon" src="img/normal.png"><div>${currentPokemons[0][i]['types'][0]['type']['name']}</div>`;
    }
}


/**
 * This function will check Type 2 of the Pokemon
 * 
 * @param {*} i 
 */

function doesType2ExistAndIsNormal(i) {
    if (`${currentPokemons[0][i]['types']['1']}` == 'undefined') {
        type2doesNotExist(i);
    } else {
        if (currentPokemons[0][i]['types']['1']['type']['name'] == 'normal') {
            document.getElementById(`type2${i}`).classList.add('background-lightgrey');
            document.getElementById(`type2${i}`).innerHTML = `<img class="icon" src="img/normal.png"><div>${currentPokemons[0][i]['types'][1]['type']['name']}</div>`;
        }
    }
}


/**
 * This function will let you know which class the pokemon belongs, it will change the backgrounds and it will tell you the class 
 * 
 * @param {*} i 
 */

function renderPoisonPokemon(i) {
    ifType1IsPosion(i);
    doesType2ExistAndIsPoison(i);
}


/**
 * This function will check Type 1 of the Pokemon
 * 
 * @param {*} i 
 */

function ifType1IsPosion(i) {
    if (currentPokemons[0][i]['types']['0']['type']['name'] == 'poison') {
        document.getElementById(`pokedex${i}`).classList.add('background-lightpurple');
        document.getElementById(`showDetails${i}`).classList.add('background-lightpurple');
        document.getElementById(`detailsBox${i}`).classList.add('background-lightpurple');
        document.getElementById(`type1${i}`).classList.add('background-lightpurple');
        document.getElementById(`type1${i}`).innerHTML = `<img class="icon" src="img/poison.png"><div>${currentPokemons[0][i]['types'][0]['type']['name']}</div>`;
    }
}


/**
 * This function will check Type 2 of the Pokemon
 * 
 * @param {*} i 
 */

function doesType2ExistAndIsPoison(i) {
    if (`${currentPokemons[0][i]['types']['1']}` == 'undefined') {
        type2doesNotExist(i);
    } else {
        if (currentPokemons[0][i]['types']['1']['type']['name'] == 'poison') {
            document.getElementById(`type2${i}`).classList.add('background-lightpurple');
            document.getElementById(`type2${i}`).innerHTML = `<img class="icon" src="img/poison.png"><div>${currentPokemons[0][i]['types'][1]['type']['name']}</div>`;
        }
    }
}


/**
 * This function will let you know which class the pokemon belongs, it will change the backgrounds and it will tell you the class 
 * 
 * @param {*} i 
 */

function renderGroundPokemon(i) {
    ifType1IsGround(i);
    doesType2ExistAndIsGround(i);
}


/**
 * This function will check Type 1 of the Pokemon
 * 
 * @param {*} i 
 */

function ifType1IsGround(i) {
    if (currentPokemons[0][i]['types']['0']['type']['name'] == 'ground') {
        document.getElementById(`pokedex${i}`).classList.add('background-lightbrown');
        document.getElementById(`showDetails${i}`).classList.add('background-lightbrown');
        document.getElementById(`detailsBox${i}`).classList.add('background-lightbrown');
        document.getElementById(`type1${i}`).classList.add('background-lightbrown');
        document.getElementById(`type1${i}`).innerHTML = `<img class="icon" src="img/ground.png"><div>${currentPokemons[0][i]['types'][0]['type']['name']}</div>`;
    }
}


/**
 * This function will check Type 2 of the Pokemon
 * 
 * @param {*} i 
 */

function doesType2ExistAndIsGround(i) {
    if (`${currentPokemons[0][i]['types']['1']}` == 'undefined') {
        type2doesNotExist(i);
    } else {
        if (currentPokemons[0][i]['types']['1']['type']['name'] == 'ground') {
            document.getElementById(`type2${i}`).classList.add('background-lightbrown');
            document.getElementById(`type2${i}`).innerHTML = `<img class="icon" src="img/ground.png"><div>${currentPokemons[0][i]['types'][1]['type']['name']}</div>`;
        }
    }
}


/**
 * This function will let you know which class the pokemon belongs, it will change the backgrounds and it will tell you the class 
 * 
 * @param {*} i 
 */

function renderElectricPokemon(i) {
    ifType1IsElectric(i);
    doesType2ExistAndIsElectric(i);
}


/**
 * This function will check Type 1 of the Pokemon
 * 
 * @param {*} i 
 */

function ifType1IsElectric(i) {
    if (currentPokemons[0][i]['types']['0']['type']['name'] == 'electric') {
        document.getElementById(`pokedex${i}`).classList.add('background-yellow');
        document.getElementById(`showDetails${i}`).classList.add('background-yellow');
        document.getElementById(`detailsBox${i}`).classList.add('background-yellow');
        document.getElementById(`type1${i}`).classList.add('background-yellow');
        document.getElementById(`type1${i}`).innerHTML = `<img class="icon" src="img/electric.png"><div>${currentPokemons[0][i]['types'][0]['type']['name']}</div>`;
    }
}


/**
 * This function will check Type 2 of the Pokemon
 * 
 * @param {*} i 
 */

function doesType2ExistAndIsElectric(i) {
    if (`${currentPokemons[0][i]['types']['1']}` == 'undefined') {
        type2doesNotExist(i);
    } else {
        if (currentPokemons[0][i]['types']['1']['type']['name'] == 'electric') {
            document.getElementById(`type2${i}`).classList.add('background-yellow');
            document.getElementById(`type2${i}`).innerHTML = `<img class="icon" src="img/electric.png"><div>${currentPokemons[0][i]['types'][1]['type']['name']}</div>`;
        }
    }
}


/**
 * This function will let you know which class the pokemon belongs, it will change the backgrounds and it will tell you the class 
 * 
 * @param {*} i 
 */

function renderFairyPokemon(i) {
    ifType1IsFairy(i);
    doesType2ExistAndIsFairy(i);
}

/**
 * This function will check Type 1 of the Pokemon
 * 
 * @param {*} i 
 */


function ifType1IsFairy(i) {
    if (currentPokemons[0][i]['types']['0']['type']['name'] == 'fairy') {
        document.getElementById(`pokedex${i}`).classList.add('background-lightpink');
        document.getElementById(`showDetails${i}`).classList.add('background-lightpink');
        document.getElementById(`detailsBox${i}`).classList.add('background-lightpink');
        document.getElementById(`type1${i}`).classList.add('background-lightpink');
        document.getElementById(`type1${i}`).innerHTML = `<img class="icon" src="img/fairy.png"><div>${currentPokemons[0][i]['types'][0]['type']['name']}</div>`;
    }
}


/**
 * This function will check Type 2 of the Pokemon
 * 
 * @param {*} i 
 */

function doesType2ExistAndIsFairy(i) {
    if (`${currentPokemons[0][i]['types']['1']}` == 'undefined') {
        type2doesNotExist(i);
    } else {
        if (currentPokemons[0][i]['types']['1']['type']['name'] == 'fairy') {
            document.getElementById(`type2${i}`).classList.add('background-lightpink');
            document.getElementById(`type2${i}`).innerHTML = `<img class="icon" src="img/fairy.png"><div>${currentPokemons[0][i]['types'][1]['type']['name']}</div>`;
        }
    }
}


/**
 * This function will let you know which class the pokemon belongs, it will change the backgrounds and it will tell you the class 
 * 
 * @param {*} i 
 */

function renderFightingPokemon(i) {
    ifType1IsFighting(i);
    doesType2ExistAndIsFighting(i);
}


/**
 * This function will check Type 1 of the Pokemon
 * 
 * @param {*} i 
 */

function ifType1IsFighting(i) {
    if (currentPokemons[0][i]['types']['0']['type']['name'] == 'fighting') {
        document.getElementById(`pokedex${i}`).classList.add('background-orange');
        document.getElementById(`showDetails${i}`).classList.add('background-orange');
        document.getElementById(`detailsBox${i}`).classList.add('background-orange');
        document.getElementById(`type1${i}`).classList.add('background-orange');
        document.getElementById(`type1${i}`).innerHTML = `<img class="icon" src="img/fighting.png"><div>${currentPokemons[0][i]['types'][0]['type']['name']}</div>`;
    }
}


/**
 * This function will check Type 2 of the Pokemon
 * 
 * @param {*} i 
 */

function doesType2ExistAndIsFighting(i) {
    if (`${currentPokemons[0][i]['types']['1']}` == 'undefined') {
        type2doesNotExist(i);
    } else {
        if (currentPokemons[0][i]['types']['1']['type']['name'] == 'fighting') {
            document.getElementById(`type2${i}`).classList.add('background-orange');
            document.getElementById(`type2${i}`).innerHTML = `<img class="icon" src="img/fighting.png"><div>${currentPokemons[0][i]['types'][1]['type']['name']}</div>`;
        }
    }
}

/**
 * This function will let you know which class the pokemon belongs, it will change the backgrounds and it will tell you the class 
 * 
 * @param {*} i 
 */

function renderPsychicPokemon(i) {
    ifType1IsPsychic(i);
    doesType2ExistAndIsPsychic(i);
}


/**
 * This function will check Type 1 of the Pokemon
 * 
 * @param {*} i 
 */

function ifType1IsPsychic(i) {
    if (currentPokemons[0][i]['types']['0']['type']['name'] == 'psychic') {
        document.getElementById(`pokedex${i}`).classList.add('background-pink');
        document.getElementById(`showDetails${i}`).classList.add('background-pink');
        document.getElementById(`detailsBox${i}`).classList.add('background-pink');
        document.getElementById(`type1${i}`).classList.add('background-pink');
        document.getElementById(`type1${i}`).innerHTML = `<img class="icon" src="img/psychic.png"><div>${currentPokemons[0][i]['types'][0]['type']['name']}</div>`;
    }
}


/**
 * This function will check Type 2 of the Pokemon
 * 
 * @param {*} i 
 */

function doesType2ExistAndIsPsychic(i) {
    if (`${currentPokemons[0][i]['types']['1']}` == 'undefined') {
        type2doesNotExist(i);
    } else {
        if (currentPokemons[0][i]['types']['1']['type']['name'] == 'psychic') {
            document.getElementById(`type2${i}`).classList.add('background-pink');
            document.getElementById(`type2${i}`).innerHTML = `<img class="icon" src="img/psychic.png"><div>${currentPokemons[0][i]['types'][1]['type']['name']}</div>`;
        }
    }
}


/**
 * This function will let you know which class the pokemon belongs, it will change the backgrounds and it will tell you the class 
 * 
 * @param {*} i 
 */

function renderRockPokemon(i) {
    ifType1IsRock(i);
    doesType2ExistAndIsRock(i);
}


/**
 * This function will check Type 1 of the Pokemon
 * 
 * @param {*} i 
 */

function ifType1IsRock(i) {
    if (currentPokemons[0][i]['types']['0']['type']['name'] == 'rock') {
        document.getElementById(`pokedex${i}`).classList.add('background-bronze');
        document.getElementById(`showDetails${i}`).classList.add('background-bronze');
        document.getElementById(`detailsBox${i}`).classList.add('background-bronze');
        document.getElementById(`type1${i}`).classList.add('background-bronze');
        document.getElementById(`closeDetails${i}`).classList.add('invert');
        document.getElementById(`type1${i}`).innerHTML = `<img class="icon" src="img/rock.png"><div>${currentPokemons[0][i]['types'][0]['type']['name']}</div>`;
    }
}


/**
 * This function will check Type 2 of the Pokemon
 * 
 * @param {*} i 
 */

function doesType2ExistAndIsRock(i) {
    if (`${currentPokemons[0][i]['types']['1']}` == 'undefined') {
        type2doesNotExist(i);
    } else {
        if (currentPokemons[0][i]['types']['1']['type']['name'] == 'rock') {
            document.getElementById(`type2${i}`).classList.add('background-bronze');
            document.getElementById(`type2${i}`).innerHTML = `<img class="icon" src="img/rock.png"><div>${currentPokemons[0][i]['types'][1]['type']['name']}</div>`;
        }
    }
}


/**
 * This function will let you know which class the pokemon belongs, it will change the backgrounds and it will tell you the class 
 * 
 * @param {*} i 
 */

function renderGhostPokemon(i) {
    ifType1IsGhost(i);
    doesType2ExistAndIsGhost(i);
}


/**
 * This function will check Type 1 of the Pokemon
 * 
 * @param {*} i 
 */

function ifType1IsGhost(i) {
    if (currentPokemons[0][i]['types']['0']['type']['name'] == 'ghost') {
        document.getElementById(`pokedex${i}`).classList.add('background-purple');
        document.getElementById(`showDetails${i}`).classList.add('background-purple');
        document.getElementById(`detailsBox${i}`).classList.add('background-purple');
        document.getElementById(`type1${i}`).classList.add('background-purple');
        document.getElementById(`closeDetails${i}`).classList.add('invert');
        document.getElementById(`type1${i}`).innerHTML = `<img class="icon" src="img/ghost.png"><div>${currentPokemons[0][i]['types'][0]['type']['name']}</div>`;
    }
}


/**
 * This function will check Type 2 of the Pokemon
 * 
 * @param {*} i 
 */

function doesType2ExistAndIsGhost(i) {
    if (`${currentPokemons[0][i]['types']['1']}` == 'undefined') {
        type2doesNotExist(i);
    } else {
        if (currentPokemons[0][i]['types']['1']['type']['name'] == 'ghost') {
            document.getElementById(`type2${i}`).classList.add('background-purple');
            document.getElementById(`type2${i}`).innerHTML = `<img class="icon" src="img/ghost.png"><div>${currentPokemons[0][i]['types'][1]['type']['name']}</div>`;
        }
    }
}


/**
 * This function will let you know which class the pokemon belongs, it will change the backgrounds and it will tell you the class 
 * 
 * @param {*} i 
 */

function renderIcePokemon(i) {
    ifType1IsIce(i);
    doesType2ExistAndIsIce(i);
}


/**
 * This function will check Type 1 of the Pokemon
 * 
 * @param {*} i 
 */

function ifType1IsIce(i) {
    if (currentPokemons[0][i]['types']['0']['type']['name'] == 'ice') {
        document.getElementById(`pokedex${i}`).classList.add('background-turquoise');
        document.getElementById(`showDetails${i}`).classList.add('background-turquoise');
        document.getElementById(`detailsBox${i}`).classList.add('background-turquoise');
        document.getElementById(`type1${i}`).classList.add('background-turquoise');
        document.getElementById(`type1${i}`).innerHTML = `<img class="icon" src="img/ice.png"><div>${currentPokemons[0][i]['types'][0]['type']['name']}</div>`;
    }
}


/**
 * This function will check Type 2 of the Pokemon
 * 
 * @param {*} i 
 */

function doesType2ExistAndIsIce(i) {
    if (`${currentPokemons[0][i]['types']['1']}` == 'undefined') {
        type2doesNotExist(i);
    } else {
        if (currentPokemons[0][i]['types']['1']['type']['name'] == 'ice') {
            document.getElementById(`type2${i}`).classList.add('background-turquoise');
            document.getElementById(`type2${i}`).innerHTML = `<img class="icon" src="img/ice.png"><div>${currentPokemons[0][i]['types'][1]['type']['name']}</div>`;
        }
    }
}


/**
 * This function will let you know which class the pokemon belongs, it will change the backgrounds and it will tell you the class 
 * 
 * @param {*} i 
 */

function renderDragonPokemon(i) {
    ifType1IsDragon(i);
    doesType2ExistAndIsDragon(i);
}


/**
 * This function will check Type 1 of the Pokemon
 * 
 * @param {*} i 
 */

function ifType1IsDragon(i) {
    if (currentPokemons[0][i]['types']['0']['type']['name'] == 'dragon') {
        document.getElementById(`pokedex${i}`).classList.add('background-redorange');
        document.getElementById(`showDetails${i}`).classList.add('background-redorange');
        document.getElementById(`detailsBox${i}`).classList.add('background-redorange');
        document.getElementById(`type1${i}`).classList.add('background-redorange');
        document.getElementById(`type1${i}`).innerHTML = `<img class="icon" src="img/dragon.png"><div>${currentPokemons[0][i]['types'][0]['type']['name']}</div>`;
    }
}


/**
 * This function will check Type 2 of the Pokemon
 * 
 * @param {*} i 
 */

function doesType2ExistAndIsDragon(i) {
    if (`${currentPokemons[0][i]['types']['1']}` == 'undefined') {
        type2doesNotExist(i);
    } else {
        if (currentPokemons[0][i]['types']['1']['type']['name'] == 'dragon') {
            document.getElementById(`type2${i}`).classList.add('background-redorange');
            document.getElementById(`type2${i}`).innerHTML = `<img class="icon" src="img/dragon.png"><div>${currentPokemons[0][i]['types'][1]['type']['name']}</div>`;
        }
    }
}


/**
 * This function will let you know which class the pokemon belongs, it will change the backgrounds and it will tell you the class 
 * 
 * @param {*} i 
 */

function renderDarkPokemon(i) {
    ifType1IsDark(i);
    doesType2ExistAndIsDark(i);
}


/**
 * This function will check Type 1 of the Pokemon
 * 
 * @param {*} i 
 */

function ifType1IsDark(i) {
    if (currentPokemons[0][i]['types']['0']['type']['name'] == 'dark') {
        document.getElementById(`pokedex${i}`).classList.add('background-grey');
        document.getElementById(`showDetails${i}`).classList.add('background-grey');
        document.getElementById(`detailsBox${i}`).classList.add('background-grey');
        document.getElementById(`type1${i}`).classList.add('background-grey');
        document.getElementById(`type1${i}`).innerHTML = `<img class="icon" src="img/dark.png"><div>${currentPokemons[0][i]['types'][0]['type']['name']}</div>`;
    }
}


/**
 * This function will check Type 2 of the Pokemon
 * 
 * @param {*} i 
 */

function doesType2ExistAndIsDark(i) {
    if (`${currentPokemons[0][i]['types']['1']}` == 'undefined') {
        type2doesNotExist(i);
    } else {
        if (currentPokemons[0][i]['types']['1']['type']['name'] == 'dark') {
            document.getElementById(`type2${i}`).classList.add('background-grey');
            document.getElementById(`type2${i}`).innerHTML = `<img class="icon" src="img/dark.png"><div>${currentPokemons[0][i]['types'][1]['type']['name']}</div>`;
        }
    }
}


/**
 * This function will let you know which class the pokemon belongs, it will change the backgrounds and it will tell you the class 
 * 
 * @param {*} i 
 */

function renderSteelPokemon(i) {
    ifType1IsSteel(i);
    doesType2ExistAndIsSteel(i);
}


/**
 * This function will check Type 1 of the Pokemon
 * 
 * @param {*} i 
 */

function ifType1IsSteel(i) {
    if (currentPokemons[0][i]['types']['0']['type']['name'] == 'steel') {
        document.getElementById(`pokedex${i}`).classList.add('background-silver');
        document.getElementById(`showDetails${i}`).classList.add('background-silver');
        document.getElementById(`detailsBox${i}`).classList.add('background-silver');
        document.getElementById(`type1${i}`).classList.add('background-silver');
        document.getElementById(`type1${i}`).innerHTML = `<img class="icon" src="img/steel.png"><div>${currentPokemons[0][i]['types'][0]['type']['name']}</div>`;
    }
}


/**
 * This function will check Type 2 of the Pokemon
 * 
 * @param {*} i 
 */

function doesType2ExistAndIsSteel(i) {
    if (`${currentPokemons[0][i]['types']['1']}` == 'undefined') {
        type2doesNotExist(i);
    } else {
        if (currentPokemons[0][i]['types']['1']['type']['name'] == 'steel') {
            document.getElementById(`pokemonDetails1stContainer${i}`).classList.remove('center');
            document.getElementById(`type2${i}`).classList.add('background-silver');
            document.getElementById(`type2${i}`).innerHTML = `<img class="icon" src="img/steel.png"><div>${currentPokemons[0][i]['types'][1]['type']['name']}</div>`;
        }
    }
}