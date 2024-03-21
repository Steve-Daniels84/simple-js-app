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

//search for user entered search parameter
function pokemonSearch () {
    
    if (searchParam === '') {
        //error message if no search paramater defined
        let element = document.getElementsByClassName("pokedex-grid-container")[0];
        
        //change styling of current grid to allow error message to show
        element.classList.add('search-error');

        element.innerHTML = '<p class="search-error">You do not appear to have entered any search criteria, please add something and try again</p>';

    } else {
        //search data for name
        console.log(searchParam);
        //if no data exists remove all cards and show message

        //if it does exist show the card in the middle of the screen
    }
};

