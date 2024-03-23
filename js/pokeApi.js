//Set variable for the Pokemon Repository as well as the add and get all functions
let pokemonRepository = (function () {
    
    let pokemonList = [];
    let pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';
        
        

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

        loadList: function () {
          return fetch(pokeApiUrl)
        
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON response
          })
          .then(data => {
            // Handle the data retrieved from the API
            pokemonList = data.results
            return pokemonList
          })
          .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Error fetching data:', error);
          });
        }
      }
  })();

  pokemonRepository.loadList().then(function (fetchedData) {

    return pokemonList
});
console.log(pokemonList);





