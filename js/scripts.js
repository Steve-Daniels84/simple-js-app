let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  const closeButton = document.querySelector("#close-button");

  function clearList() {
    pokemonList = [];
  }

  function add(item) {
    let pokemon = {
      name: item.name,
      detailUrl: item.detailUrl,
    };
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailUrl: item.url,
          };

          loadDetails(pokemon);
          add(pokemon);
          addListItem(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //Get an individual pokemons details
  function loadDetails(item) {
    let url = item.detailUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.name = details.name;
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.stats = details.stats;
        item.largeImage = details.sprites.other.dream_world.front_default;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //Create cards in the sidebar for each pokemon
  function addListItem(pokemon) {
    let element = $(".pokemon-list");
    let card = cardBuilder(pokemon);
    element.append(card);
  }

  return {
    clearList: clearList,

    add: add,

    getAll: getAll,

    addListItem: addListItem,

    loadList: loadList,

    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {});
});

let searchBox = document.getElementById("sValue");
let searchParam = "";
let searchFocus = false;
let searchReset = document.getElementById("search-reset");

//monitor search input for a value
searchBox.addEventListener("input", function () {
  searchParam = searchBox.value;
});

//monitor for enter key press whilst input is in focus
searchBox.addEventListener("keydown", function (event) {
  if ((searchFocus = true && event.key === "Enter")) {
    pokemonSearch();
  }
});

//monitor focus state of input
searchBox.addEventListener("focus", function () {
  searchFocus = true;
});

//monitor blur state of input
searchBox.addEventListener("blur", function () {
  searchFocus = false;
});

//reset search box and main container to start state
searchReset.addEventListener("click", function () {
  //Reset pokemon list and input
  pokemonRepository.clearList();
  searchBox.value = "";
  //let element = document.querySelector('pokemon-list');
  let children = document.querySelectorAll("li");
  children.forEach(function (child) {
    child.remove();
  });
  pokemonRepository.loadList();
});

//Search Function
function pokemonSearch() {
  if (searchParam === "") {
    headerWarning("Nothing entered");
  } else {
    let pokemonList = pokemonRepository.getAll();
    let result = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchParam.toLowerCase())
    );

    if (result.length === 0) {
      headerWarning("Your search returned no results");
    } else {
      let children = document.querySelectorAll("li");
      children.forEach(function (child) {
        child.remove();
        pokemonRepository.clearList();
      });

      result.forEach(function (result) {
        pokemonRepository.addListItem(result);
      });
    }
  }
}

//construct and present search error message
function headerWarning(message) {
  //get main grid container
  document.getElementById("search-error").innerHTML = message;

  setTimeout(function () {
    document.getElementById("search-error").innerHTML = "";
  }, 5000);
}

function cardBuilder(pokemon) {
  const card = $('<li class="list-group-item d-flex p-2 sidebar-card"></li>');

  //Create card child elements
  let button = $('<button type="button" class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#detailModal">GO!</button>'); 
  let buttonContainer = $('<div></div>'); 
  let cardTitle = $('<h4 class="card-title h4">' + pokemon.name + '</h4>'); 
  let cardTitleContainer = $('<div class="container"></div>'); 
  let pokemonImageContainer = $('<div class="container-fluid"></div>'); 
  let pokemonImage = $('<img class="img-thumbnail"></img>');



  pokemonImageContainer.append(pokemonImage);
  cardTitleContainer.append (cardTitle);

  buttonContainer.append(button);

  //get 
  pokemonRepository.loadDetails(pokemon).then(function () {
    pokemonImage.attr('src', pokemon.imageUrl);
  });

  //Add everything to the sidebar card
  card.append(pokemonImageContainer);
  card.append(cardTitleContainer);
  card.append(buttonContainer);

  button.on('click', function (event){
  modalBuilder(pokemon)
  })



  return card;
}

function modalBuilder (pokemon) {

  //reset types container
  const element = $('#types');
  element.empty();

  const height = $('#height');
  const weight = $('#weight');

  height.text('Height: ' + pokemon.height);
  weight.text('Weight: ' + pokemon.weight);

  const modal = $('#detailModalLabel');
  const stats = $(pokemon.stats);
  const types = $(pokemon.types);

  //capitalise first letter of pokemon name and add it as modal title
  const name = pokemon.name;
  const title = name.charAt(0).toUpperCase() + name.slice(1);
  modal.text(title);

  //set the main pokemon image source
  $('#pokemon-image').attr('src', pokemon.largeImage);

  //add stats
  stats.each(function (index, item){
    const element = $('#' + item.stat.name);
    const parent = $('.' + item.stat.name);

    parent.attr('aria-valuenow',item.base_stat);
    element.text(item.base_stat);
    element.attr('style','width:' + (item.base_stat/255) * 100 + '%');
  })

  //add types cards
  types.each(function (index, item) {
    const element = $('#types');
    const type = $('<div class="type-card ' + item.type.name + '">' + item.type.name + '</div>');

    //change type container background color
    const computedStyle = getComputedStyle(document.documentElement);
    const typeVar = computedStyle.getPropertyValue('--' + item.type.name);
    type.css('background-color', typeVar);

    element.append(type);
  })
}


