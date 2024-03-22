//Set variable for the Pokemon Repository as well as the add and get all functions
let pokemonRepository = (function () {
    let pokemonList = [{name: 'Bulbasaur', 
        height: 0.7, 
        category: 'Seed',
        types: ['Grass', 'Poison'],
    },
    {name: 'Ivysaur', 
        height: 2, 
        category: 'Seed',
        types: ['Grass', 'Poison']
    },
    {name: 'Venusaur', 
        height: 2, 
        category: 'Seed',
        types: ['Grass', 'Poison']
    },
    {name: 'Charmander', 
        height: 1, 
        category: 'Lizard',
        types: ['Fire']
    },
    {name: 'Charmeleon', 
        height: 1.1, 
        category: 'Flame',
        types: ['Fire']
    },
    {name: 'Charizard', 
        height: 3, 
        category: 'Flame',
        types: ['Fire', 'Flying']
    },
    {name: 'Squirtle', 
        height: 0.5, 
        category: 'Tiny Turtle',
        types: ['Water']
    },
    {name: 'Wartortle', 
        height: 1, 
        category: 'Turtle',
        types: ['Water']
    },
    {name: 'Blastois', 
        height: 1.6, 
        category: 'Shellfish',
        types: ['Water']
    }];

    return {
        add: function (pokemon) {

            let inputType = typeof (pokemon);

            if (inputType === "object" ) {
                pokemonList.push(pokemon);
            } else {
                return console.log("You must enter correct pokemon data in object form!");
            }
            
        },
        getAll: function () {
            return pokemonList;
        }
    };
})()

//Get all pokemon and add a single card for each in the grid container
pokemonRepository.getAll().forEach (function(pokemon){

    let element = document.getElementsByClassName("pokedex-grid-container")[0];

    //Build the indivdual Pokemon cards
    let html = `<div class="pokedex-grid-item">
                <img class="pokemonImage" src="../img/pokemonImages/${pokemon.name}.png" alt="Image of the ${pokemon.name} pokemon.">
                <div class="pokemon-data">Name: ${pokemon.name}<br>Height: ${pokemon.height}<br>Category: ${pokemon.category}</div>
                <div class="pokemon-types-container">`;

    //Iterate through types to build tag for each type
    pokemon.types.forEach (function(type){

        html += `<div class="pokemon-type ${type.toLowerCase()}">${type}</div>`;
        });

    html += '</div></div>';
                
    element.innerHTML += html;
});

//monitor search input for a value
let searchBox = document.getElementById('sValue');
let searchParam = '';

searchBox.addEventListener('input', function() {
    searchParam = searchBox.value;
});

searchBox.addEventListener()

//search for user entered search input
function pokemonSearch () {
    
    if (searchParam === '') {

        searchError('Nothing entered');

    } else {
        
        let pokemonList = pokemonRepository.getAll();
        let result = pokemonList.filter((pokemonList) => pokemonList.name  === searchParam);

        if (result.length === 0) {
            
            searchError('There are no results for your search');

        } else {
            result.forEach(function(pokemon){
                pokemonResult (pokemon.name, pokemon.height, pokemon.category, pokemon.types);
            });
        }
    }
};

//construct and present pokemon search result
function pokemonResult (name,height,category,types) {

    let element = document.getElementsByClassName("pokedex-grid-container")[0];
    
    //Build the Pokemon profile card
    let html = `<div class="pokedex-grid-item profile-item">
                <div class="main-profile">
                    <div>
                        <img class="pokemon-profile-image" src="../img/pokemonImages/${name}.png" alt="Image of the ${name} pokemon.">
                    </div>
                    <div class="pokemon-profile-data">
                        Name: ${name}<br>
                        Height: ${height}<br>
                        Category: ${category}
                    </div>
                </div>
                <div class="pokemon-types-container">`;

    //Iterate through types to build tag for each type
    types.forEach (function(type){

        html += `<div class="pokemon-type-profile ${type.toLowerCase()}">${type}</div>`;
        });

    html += `</div></div>`;

    //change styling of current grid to allow Pokemon profile to show
    element.classList.add(`pokemon-profile-result`);
                
    element.innerHTML = html;

};

//construct and present error message
function searchError (message) {

    //get main grid container
    let element = document.getElementsByClassName("pokedex-grid-container")[0];
    
    //change styling of current grid to allow error message to show
    element.classList.add('search-error');

    //show error message
    element.innerHTML = `<p class="search-error">${message}</p>`;
};
