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

            let element = document.querySelector(".pokemon-list");
            let card = cardBuilder (pokemon);
            let listItem = document.createElement('li');
            
            listItem.appendChild (card);

            element.appendChild (listItem);
        },

        showDetails: function (pokemon) {
            console.log (pokemon);
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


//construct and present search error message
function headerWarning (message) {

    //get main grid container
    document.getElementById('search-error').innerHTML = message;

    setTimeout (function () {
        document.getElementById('search-error').innerHTML = "";
    }, 5000)
};

function cardBuilder (pokemon) {
    let card = document.createElement('div'); //set card variable
    
    card.classList.add ('sidebar-card');

    //Create card child elements
    let button = document.createElement ('button');
    let cardTitle = document.createElement ('p');
    let pokemonImageContainer = document.createElement ('div');
    let pokemonImage = document.createElement ('img');

    pokemonImage.src = 'https://placehold.co/40x40';
    pokemonImage.classList.add ('card-image')

    //Add card image container and image
    pokemonImageContainer.classList.add ('card-image-container');
    pokemonImageContainer.appendChild (pokemonImage);

    //Add card title content and class
    cardTitle.classList.add ('card-title');
    cardTitle.innerText = `${pokemon.name}`;
    
    //Add card button content and class
    button.innerText = `GO!`;
    button.classList.add ('go-button');

    //Add everything to the card
    
    card.appendChild (pokemonImageContainer);
    card.appendChild (cardTitle);
    card.appendChild (button);

    //Event handler for card button
    button.addEventListener ('click', function(){
        pokemonRepository.showDetails (pokemon);
    })

    return card
}

fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20').then (
    function(response) {
        return response.json();
    }).then (function (pokemonList){
        
    })
    .catch (function (){
    });
    
