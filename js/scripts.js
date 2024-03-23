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


let searchBox = document.getElementById('sValue');
let searchParam = '';
let searchFocus = false;

//monitor search input for a value
searchBox.addEventListener('input', function() {
    searchParam = searchBox.value;
});

//monitor for enter key press whilst input is in focus
searchBox.addEventListener('keydown', function(event){
    if (searchFocus = true && event.key === 'Enter'){
        pokemonSearch()
    }
})

//montior focus state of input
searchBox.addEventListener('focus', function(){
    searchFocus = true;
})

//monitor blur state of input
searchBox.addEventListener('blur', function () {
    searchFocus = false;
})

//search for user entered search input
function pokemonSearch () {
    
    if (searchParam === '') {

        headerWarning('Nothing entered');

    } else {
        
        let pokemonList = pokemonRepository.getAll();
        
        let result = pokemonList.filter(pokemon => (pokemon.name.toLowerCase()).includes(searchParam.toLowerCase()));

        if (result.length === 0) {
            
            headerWarning ('Your search returned no results');

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
    
    //Build the indivdual Pokemon cards
    let html = `<div class="pokedex-grid-item">
                <img class="pokemonImage" src="../img/pokemonImages/${name}.png" alt="Image of the ${name} pokemon.">
                <div class="pokemon-data">Name: ${name}<br>Height: ${height}<br>Category: ${category}</div>
                <div class="pokemon-types-container">`;

    //Iterate through types to build tag for each type
    types.forEach (function(type){

        html += `<div class="pokemon-type ${type.toLowerCase()}">${type}</div>`;
        });

    html += '</div></div>';
                
    element.innerHTML += html;

};

//construct and present header warning message
function headerWarning (message) {

    //get main grid container
    document.getElementById('header-warning').innerHTML = message;

    setTimeout (function () {
        document.getElementById('header-warning').innerHTML = "";
    }, 5000)
};

        
