let pokemonList = [
    {name: 'Bulbasaur', 
    height: 0.7, 
    category: 'seed',
    types: ['grass', 'poison'],
    },
    {name: 'Ivysaur', 
    height: 2, 
    category: 'seed',
    types: ['grass', 'poison']
    },
    {name: 'Venusaur', 
    height: 2, 
    category: 'seed',
    types: ['grass', 'poison']
    },
    {name: 'Charmander', 
    height: 1, 
    category: 'lizard',
    types: ['fire']
    },
    {name: 'Charmeleon', 
    height: 1.1, 
    category: 'flame',
    types: ['fire']
    },
    {name: 'Charizard', 
    height: 3, 
    category: 'flame',
    types: ['fire', 'flying']
    },
    {name: 'Squirtle', 
    height: 0.5, 
    category: 'tiny turtle',
    types: ['water']
    },
    {name: 'Wartortle', 
    height: 1, 
    category: 'turtle',
    types: ['water']
    },
    {name: 'Blastois', 
    height: 1.6, 
    category: 'shellfish',
    types: ['water']
    }
    ];

//using for()

// function getPokemonGrid(list) {
//     let element = document.getElementsByClassName("pokedex-grid-container")[0];

//     for (let i = 0; i < list.length; i++) {
//         if (list[i].height > 2) {
//             let html = `<div class="pokedex-grid-item">
//                             <img class="pokemonImage" src="../img/${list[i].name}.png" alt="Image of the ${list[i].name} pokemon.">
//                             <div class="pokemon-data"> 
//                                 Name: ${list[i].name}<br>
//                                 Height: ${list[i].height}m
//                             </div>
//                             <p class="pokemon-comment">Wow thats big!</p>
//                             <div class="pokemon-types-container">`;
            
//             for (let j = 0; j < list[i].types.length; j++) {
//                 html += `<div class="pokemon-type ${list[i].types[j]}">${list[i].types[j]}</div>`; 
//             }
//             html += `</div></div>`;
//             element.innerHTML += html;
//         } else {
//             let html = `<div class="pokedex-grid-item">
//                             <img class="pokemonImage" src="../img/${list[i].name}.png" alt="Image of the ${list[i].name} pokemon.">
//                             <div class="pokemon-data">
//                                 Name: ${list[i].name}<br>
//                                 Height: ${list[i].height}m
//                             </div>
//                             <p class="pokemon-comment"></p>
//                             <div class="pokemon-types-container">`;
    
//             for (let j = 0; j < list[i].types.length; j++) {
//                 html += `<div class="pokemon-type ${list[i].types[j]}">${list[i].types[j]}</div>`;
//             }
//             html += `</div></div>`;
//             element.innerHTML += html;
//         }
//     }
// }

// getPokemonGrid(pokemonList);

//using forEach()

let element = document.getElementsByClassName("pokedex-grid-container")[0];

pokemonList.forEach (function(pokemon){
        
    let html = `<div class="pokedex-grid-item">
                <img class="pokemonImage" src="../img/${pokemon.name}.png" alt="Image of the ${pokemon.name} pokemon.">
                <div class="pokemon-data">Name: ${pokemon.name}<br>Height: ${pokemon.height}</div>
                <p class="pokemon-comment"></p>
                <div class="pokemon-types-container">`;

    pokemon.types.forEach (function(type){
        html += `<div class="pokemon-type ${type}">${type}</div>`;
        });

    html += '</div></div>';
                
    element.innerHTML += html;
})

Object.keys(pokemonList).forEach(function(property){
    console.log(pokemonList[property]);
})