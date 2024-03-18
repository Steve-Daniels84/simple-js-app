let pokemonList = [
    {name: 'bulbasaur', 
    height: 0.7, 
    category: 'seed',
    types: ['grass', 'poison']
    },
    {name: 'ivysaur', 
    height: 2, 
    category: 'seed',
    types: ['grass', 'poison']
    },
    {name: 'venusaur', 
    height: 2, 
    category: 'seed',
    types: ['grass', 'poison']
    },
    {name: 'charmander', 
    height: 1, 
    category: 'lizard',
    types: ['fire']
    },
    {name: 'charmeleon', 
    height: 1.1, 
    category: 'flame',
    types: ['fire']
    },
    {name: 'charizard', 
    height: 3, 
    category: 'flame',
    types: ['fire', 'flying']
    },
    {name: 'squirtle', 
    height: 0.5, 
    category: 'tiny turtle',
    types: ['water']
    },
    {name: 'wartortle', 
    height: 1, 
    category: 'turtle',
    types: ['water']
    },
    {name: 'blastois', 
    height: 1.6, 
    category: 'shellfish',
    types: ['water']
    }
    ];



//Original attempt at writing a function for this, I wanted to place the items in a grid but was unable to get the items to show.
// function getPokemonGrid () {
//     let element = document.getElementsByClassName("pokedex-grid-container")

//     for (let i = 0; i < pokemonList.length; i++) {
//         if (pokemonList[i].height > 2)
//             {
//                 element.innerHTML = "'<div class="pokedex-grid-item"><img class="pokemonImage" src="../img/${pokemonList[i].name}.png" alt+"Image of the ${pokemonList[i].name} pokemon."><div class="pokemon-data"> Name: ${pokemonList[i].name}<br>Height: ${pokemonList[i].height}m</div><p class="pokemon-comment">Wow thats big!</p><div class="pokemon-types-container">`;
            
//                 for (let j = 0; j < pokemonList[i].types.length; j++) {
//                     element.innerHTML = `<div class="pokemon-type ${pokemonList[i].types[j]}"> ${pokemonList[i].types[j]}</div>`; 
//                 }
//                 element.innerHTML = `</div></div>`;
//             } else {
//                 document.write (`<div class="pokedex-grid-item"><img class="pokemonImage" src="../img/${pokemonList[i].name}.png" alt+"Image of the ${pokemonList[i].name} pokemon."><div class="pokemon-data">Name: ${pokemonList[i].name}<br>Height: ${pokemonList[i].height}m </div><p class="pokemon-comment"></p><div class="pokemon-types-container">`);
    
//                 for (let j = 0; j < pokemonList[i].types.length; j++) {
//                     document.write (`<div class="pokemon-type ${pokemonList[i].types[j]}"> ${pokemonList[i].types[j]} </div>`);
//                 }
//                 document.write ("</div></div>");
//             }
//         }
//     }
    
//     getPokemonGrid ();

// I debugged with chat GPT and can see that 
function getPokemonGrid(list) {
    let element = document.getElementsByClassName("pokedex-grid-container")[0];

    for (let i = 0; i < list.length; i++) {
        if (list[i].height > 2) {
            let html = `<div class="pokedex-grid-item">
                            <img class="pokemonImage" src="../img/${list[i].name}.png" alt="Image of the ${list[i].name} pokemon.">
                            <div class="pokemon-data"> 
                                Name: ${list[i].name}<br>
                                Height: ${list[i].height}m
                            </div>
                            <p class="pokemon-comment">Wow thats big!</p>
                            <div class="pokemon-types-container">`;
            
            for (let j = 0; j < list[i].types.length; j++) {
                html += `<div class="pokemon-type ${list[i].types[j]}">${list[i].types[j]}</div>`; 
            }
            html += `</div></div>`;
            element.innerHTML += html;
        } else {
            let html = `<div class="pokedex-grid-item">
                            <img class="pokemonImage" src="../img/${list[i].name}.png" alt="Image of the ${list[i].name} pokemon.">
                            <div class="pokemon-data">
                                Name: ${list[i].name}<br>
                                Height: ${list[i].height}m
                            </div>
                            <p class="pokemon-comment"></p>
                            <div class="pokemon-types-container">`;
    
            for (let j = 0; j < list[i].types.length; j++) {
                html += `<div class="pokemon-type ${list[i].types[j]}">${list[i].types[j]}</div>`;
            }
            html += `</div></div>`;
            element.innerHTML += html;
        }
    }
}

getPokemonGrid(pokemonList);
