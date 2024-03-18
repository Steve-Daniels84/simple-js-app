let pokemonList = [
    {name: 'charmander', 
    height: 1, 
    types: ['fire']
    },
    {name: 'bulbasaur', 
    height: 2, 
    types: ['grass', 'poison']
    },
    {name: 'charizard', 
    height: 3, 
    types: ['fire', 'flying']
    },
    {name: 'beedrill', 
    height: 1, 
    types: ['bug', 'poison']
    }
];

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 2)
    {
        document.write (`<div class="grid-item"><img class="pokemonImage" src=" ../img/${pokemonList[i].name}.png" alt+"Image of the ${pokemonList[i].name} pokemon."><div class="pokemon-data"> Name: ${pokemonList[i].name}<br>Height: ${pokemonList[i].height} mtrs</div><p class="pokemon-comment">Wow thats big!</p><div class="pokemon-types-container">`);
        
        for (let j = 0; j < pokemonList[i].types.length; j++) {
            document.write (`<div class="pokemon-type ${pokemonList[i].types[j]}"> ${pokemonList[i].types[j]}</div>`); 
        }
        document.write ("</div></div>");
    } else {
        document.write (`<div class="grid-item"><img class="pokemonImage" src=" ../img/${pokemonList[i].name}.png" alt+"Image of the ${pokemonList[i].name} pokemon."><div class="pokemon-data">Name: ${pokemonList[i].name}<br>Height: ${pokemonList[i].height} mtrs </div><p class="pokemon-comment"></p><div class="pokemon-types-container">`);

        for (let j = 0; j < pokemonList[i].types.length; j++) {
            document.write (`<div class="pokemon-type ${pokemonList[i].types[j]}"> ${pokemonList[i].types[j]} </div>`);
        }
        document.write ("</div></div>");
    }
}

