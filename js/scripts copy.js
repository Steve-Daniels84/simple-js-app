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
        category: 'Flame',
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
        category: 'Turtle',
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
        },

        addListItem: function (pokemon) {

            let element = document.querySelector(".pokemon-list"); //get pokemon list
            let listItem = document.createElement('li'); //create list item
            let category = pokemon.category.toLowerCase(); // make category lowercase so can be reconigsed as class
            
            let card = document.createElement('div'); //set card variable
            card.innerText = `${pokemon.name}`; //add pokemon name to card
            card.classList.add ('sidebar-card') // add class
            card.classList.add (category); // add class   
            listItem.appendChild (card); 

            element.appendChild (listItem);
        }

    };
})()

function renderPokemonRepository () {
    
    pokemonRepository.getAll().forEach (function(pokemon){
    
        pokemonRepository.addListItem(pokemon);

});
}

renderPokemonRepository ()

let searchBox = document.getElementById('sValue');
let searchParam = '';
let searchFocus = false;
let searchReset = document.getElementById('search-reset');

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

//monitor focus state of input
searchBox.addEventListener('focus', function(){
    searchFocus = true;
})

//monitor blur state of input
searchBox.addEventListener('blur', function () {
    searchFocus = false;
})

//reset search box and main container to start state
searchReset.addEventListener('click', function(){
    
    //let element = document.querySelector('pokemon-list');
    let children = document.querySelectorAll ('li');
    children.forEach (function (child) {
        child.remove();
    })
    renderPokemonRepository ()
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
            
            let element = document.querySelector('pokemon-list');
            let children = document.querySelectorAll ('li');
            children.forEach (function (child) {
                child.remove();
            })
            

            result.forEach(function(pokemon){
                pokemonRepository.addListItem (pokemon);
            });
        }
    }
};


//construct and present header warning message
function headerWarning (message) {

    //get main grid container
    document.getElementById('search-warning').innerHTML = message;

    setTimeout (function () {
        document.getElementById('search-warning').innerHTML = "";
    }, 5000)
};

document.querySelector('.close-menu').addEventListener ('click', function () {
    let sidebar = document.querySelector ('.sidebar');
    sidebar.classList.remove ('open');
    sidebar.classList.add ('closed');
})

document.querySelector('.open-menu').addEventListener ('click', function () {
    let sidebar = document.querySelector ('.sidebar');
    sidebar.classList.remove ('closed');
    sidebar.classList.add ('open');
} )