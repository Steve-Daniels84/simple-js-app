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
        document.write (`<div class="grid-item"><img class="pokemonImage" src=" ../img/${pokemonList[i].name}.png" alt+"Image of the ${pokemonList[i].name} pokemon.">Name: ${pokemonList[i].name} <br> Height: ${pokemonList[i].height} mtrs<br><br>Wow thats big! </div>`);
    } else {
        document.write (`<div class="grid-item"><img class="pokemonImage" src=" ../img/${pokemonList[i].name}.png" alt+"Image of the ${pokemonList[i].name} pokemon.">Name: ${pokemonList[i].name} <br> Height: ${pokemonList[i].height} mtrs </div>`);
    }
}

