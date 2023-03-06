function renderSearchPokedexTemplate(i, pokedex) {
    pokedex.innerHTML += `<div id="pokedex${i}" class="pokedex">
                                <h2 class="pokemonName">${currentPokemons[0][i]['name']}</h2>
                                <img class="pokeball" src="img/pokeball.png" id="pokeball${i}">
                                <img class="pokemonImg" onclick="showDetails(${i})" src="${currentPokemons[0][i]['sprites']['other']['home']['front_shiny']}" alt="">
                                <div id="pokemonInfo${i}" class="pokemonInfo"></div>
                            </div>`;
}


function renderPokemonInfoHtmlTemplate(i) {
    document.getElementById('showPokedex').innerHTML += `<div id="pokedex${i}" class="pokedex">
                                                            <h2 class="pokemonName">${currentPokemons[0][i]['name']}</h2>
                                                            <img class="pokeball" src="img/pokeball.png" id="pokeball${i}">
                                                            <img class="pokemonImg" onclick="showDetails(${i})" src="${currentPokemons[0][i]['sprites']['other']['home']['front_shiny']}" alt="">
                                                            <div id="pokemonInfo${i}" class="pokemonInfo"></div>
                                                        </div>`;
}


function renderfirstAbilityTemplate(i) {
    document.getElementById(`pokemonInfo${i}`).innerHTML += `<div>
                                                                <div><b>Abilities:</b></div>
                                                                <div id="abilities${i}" class="abilities"><div>1) ${currentPokemons[0][i]['abilities'][0]['ability']['name']}</div></div>
                                                                <button onclick="showDetails(${i})" class="showDetails" id="showDetails${i}">Show more</button>
                                                            </div>`
}


function rednerSecondAbilityTemplate(i) {
    document.getElementById(`abilities${i}`).innerHTML += `<div>2) ${currentPokemons[0][i]['abilities'][1]['ability']['name']}</div>`
}


function renderDetailsTemplate(i, details) {
    details.innerHTML += `<div class="detailsBox d-none" id="detailsBox${i}">
                            <div class="pokemonName detailsName">${currentPokemons[0][i]['name']}</div>
                            <img class="pokemonDetailsImg" src="${currentPokemons[0][i]['sprites']['other']['home']['front_shiny']}" alt="">
                            <img class="pokeballDetails" src="img/pokeball.png">
                            <img class="closeWindow" id="closeDetails${i}" src="img/cross.png" onclick="closeDetails(${i})">
                            <div class="pokemonDetails">
                                <div class="pokemonDetails1stContainer"  id="pokemonDetails1stContainer${i}">
                                    <div class="type" id="type1${i}"></div><div class="type" id="type2${i}"></div>
                                </div>
                                <div class="pokemonDetails2ndContainer">
                                    <div class="statNames">
                                        <div class="stat">${currentPokemons[0][i]['stats'][0]['stat']['name']}</div>
                                        <div class="stat">${currentPokemons[0][i]['stats'][1]['stat']['name']}</div>
                                        <div class="stat">${currentPokemons[0][i]['stats'][2]['stat']['name']}</div>
                                        <div class="stat">${currentPokemons[0][i]['stats'][3]['stat']['name']}</div>
                                        <div class="stat">${currentPokemons[0][i]['stats'][4]['stat']['name']}</div>
                                        <div class="stat">${currentPokemons[0][i]['stats'][5]['stat']['name']}</div>
                                    </div>
                                    <div class="statBase" id="statBase${i}">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>`
}


function showStatbar400pxTemplate(i, statBase) {
    statBase.innerHTML = `   <div class="wholeBar"> 
         <div class="startBar" style= width:${Math.round((152.99 / 255) * (currentPokemons[0][i]['stats'][0]['base_stat']))}px>
         ${currentPokemons[0][i]['stats'][0]['base_stat']}  / 255</div>
     </div>
     <div class="wholeBar">
         <div class="startBar" style= width:${Math.round((152.99 / 255) * (currentPokemons[0][i]['stats'][1]['base_stat']))}px>
         ${currentPokemons[0][i]['stats'][1]['base_stat']} / 255</div>
     </div>
     <div class="wholeBar"
         ><div class="startBar" style= width:${Math.round((152.99 / 255) * (currentPokemons[0][i]['stats'][2]['base_stat']))}px>
         ${currentPokemons[0][i]['stats'][2]['base_stat']} / 255</div>
     </div>
     <div class="wholeBar">
         <div class="startBar" style= width:${Math.round((152.99 / 255) * (loadedPokemonArray[i]['stats'][3]['base_stat']))}px>
         ${currentPokemons[0][i]['stats'][3]['base_stat']} / 255</div>
     </div>
     <div class="wholeBar">
         <div class="startBar" style= width:${Math.round((152.99 / 255) * (currentPokemons[0][i]['stats'][4]['base_stat']))}px>
         ${currentPokemons[0][i]['stats'][4]['base_stat']} / 255</div>
     </div>
     <div class="wholeBar">
         <div class="startBar" style= width:${Math.round((152.99 / 255) * (currentPokemons[0][i]['stats'][5]['base_stat']))}px>
         ${currentPokemons[0][i]['stats'][5]['base_stat']} / 255</div>
     </div>`
}


function showStatbar550pxTemplate(i, statBase) {
    statBase.innerHTML = `   <div class="wholeBar"> 
         <div class="startBar" style= width:${Math.round((242.8 / 255) * (currentPokemons[0][i]['stats'][0]['base_stat']))}px>
         ${currentPokemons[0][i]['stats'][0]['base_stat']}  / 255</div>
     </div>
     <div class="wholeBar">
         <div class="startBar" style= width:${Math.round((242.8 / 255) * (currentPokemons[0][i]['stats'][1]['base_stat']))}px>
         ${currentPokemons[0][i]['stats'][1]['base_stat']} / 255</div>
     </div>
     <div class="wholeBar"
         ><div class="startBar" style= width:${Math.round((242.8 / 255) * (currentPokemons[0][i]['stats'][2]['base_stat']))}px>
         ${currentPokemons[0][i]['stats'][2]['base_stat']} / 255</div>
     </div>
     <div class="wholeBar">
         <div class="startBar" style= width:${Math.round((242.8 / 255) * (currentPokemons[0][i]['stats'][3]['base_stat']))}px>
         ${currentPokemons[0][i]['stats'][3]['base_stat']} / 255</div>
     </div>
     <div class="wholeBar">
         <div class="startBar" style= width:${Math.round((242.8 / 255) * (currentPokemons[0][i]['stats'][4]['base_stat']))}px>
         ${currentPokemons[0][i]['stats'][4]['base_stat']} / 255</div>
     </div>
     <div class="wholeBar">
         <div class="startBar" style= width:${Math.round((242.8 / 255) * (currentPokemons[0][i]['stats'][5]['base_stat']))}px>
         ${currentPokemons[0][i]['stats'][5]['base_stat']} / 255</div>
     </div>`
}

function showStatBar650pxTemplate(i, statBase) {
    statBase.innerHTML = `   <div class="wholeBar"> 
            <div class="startBar" style= width:${Math.round((343.6 / 255) * (currentPokemons[0][i]['stats'][0]['base_stat']))}px>
            ${currentPokemons[0][i]['stats'][0]['base_stat']}  / 255</div>
        </div>
        <div class="wholeBar">
            <div class="startBar" style= width:${Math.round((343.6 / 255) * (currentPokemons[0][i]['stats'][1]['base_stat']))}px>
            ${currentPokemons[0][i]['stats'][1]['base_stat']} / 255</div>
        </div>
        <div class="wholeBar"
            ><div class="startBar" style= width:${Math.round((343.6 / 255) * (currentPokemons[0][i]['stats'][2]['base_stat']))}px>
            ${currentPokemons[0][i]['stats'][2]['base_stat']} / 255</div>
        </div>
        <div class="wholeBar">
            <div class="startBar" style= width:${Math.round((343.6 / 255) * (currentPokemons[0][i]['stats'][3]['base_stat']))}px>
            ${currentPokemons[0][i]['stats'][3]['base_stat']} / 255</div>
        </div>
        <div class="wholeBar">
            <div class="startBar" style= width:${Math.round((343.6 / 255) * (currentPokemons[0][i]['stats'][4]['base_stat']))}px>
            ${currentPokemons[0][i]['stats'][4]['base_stat']} / 255</div>
        </div>
        <div class="wholeBar">
            <div class="startBar" style= width:${Math.round((343.6 / 255) * (currentPokemons[0][i]['stats'][5]['base_stat']))}px>
            ${currentPokemons[0][i]['stats'][5]['base_stat']} / 255</div>
        </div>`
}


function showStatBarMoreThen650pxTemplate(i, statBase) {
    statBase.innerHTML = `   <div class="wholeBar"> 
        <div class="startBar" style= width:${Math.round((408 / 255) * (currentPokemons[0][i]['stats'][0]['base_stat']))}px>
        ${currentPokemons[0][i]['stats'][0]['base_stat']}  / 255</div>
    </div>
    <div class="wholeBar">
        <div class="startBar" style= width:${Math.round((408 / 255) * (currentPokemons[0][i]['stats'][1]['base_stat']))}px>
        ${currentPokemons[0][i]['stats'][1]['base_stat']} / 255</div>
    </div>
    <div class="wholeBar"
        ><div class="startBar" style= width:${Math.round((408 / 255) * (currentPokemons[0][i]['stats'][2]['base_stat']))}px>
        ${currentPokemons[0][i]['stats'][2]['base_stat']} / 255</div>
    </div>
    <div class="wholeBar">
        <div class="startBar" style= width:${Math.round((408 / 255) * (currentPokemons[0][i]['stats'][3]['base_stat']))}px>
        ${currentPokemons[0][i]['stats'][3]['base_stat']} / 255</div>
    </div>
    <div class="wholeBar">
        <div class="startBar" style= width:${Math.round((408 / 255) * (currentPokemons[0][i]['stats'][4]['base_stat']))}px>
        ${currentPokemons[0][i]['stats'][4]['base_stat']} / 255</div>
    </div>
    <div class="wholeBar">
        <div class="startBar" style= width:${Math.round((408 / 255) * (currentPokemons[0][i]['stats'][5]['base_stat']))}px>
        ${currentPokemons[0][i]['stats'][5]['base_stat']} / 255</div>
    </div>`
}