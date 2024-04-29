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
    let element = document.querySelector(".pokemon-list");
    let card = cardBuilder(pokemon);
    let listItem = document.createElement("li");

    listItem.appendChild(card);

    element.appendChild(listItem);
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
  const card = document.createElement("div"); //set card variable

  card.classList.add("sidebar-card");

  //Create card child elements
  let button = document.createElement("button");
  let cardTitle = document.createElement("p");
  let pokemonImageContainer = document.createElement("div");
  let pokemonImage = document.createElement("img");

  pokemonImage.classList.add("card-image");

  //Add card image container and image
  pokemonImageContainer.classList.add("card-image-container");
  pokemonImageContainer.appendChild(pokemonImage);

  //Add card title content and class
  cardTitle.classList.add("card-title");
  cardTitle.innerText = `${pokemon.name}`;

  //Add card button content and class
  button.innerText = `GO!`;
  button.classList.add("go-button");

  pokemonRepository.loadDetails(pokemon).then(function () {
    pokemonImage.src = pokemon.imageUrl;
  });

  //Add everything to the card
  card.appendChild(pokemonImageContainer);
  card.appendChild(cardTitle);
  card.appendChild(button);

  //Event handler for card button
  button.addEventListener("click", function () {
    pokemonRepository.loadDetails(pokemon).then(function () {
      detailModalBuilder(pokemon);
    });
  });

  return card;
}

function detailModalBuilder (item) {

const element = document.querySelector ('main');
element.innerText = '';

  //Create modal container
  const modalContainer = document.createElement ('div');
  modalContainer.id = 'modal-container';
  modalContainer.classList.add ('isOpen');
  element.appendChild (modalContainer);

  //Create modal box
  const modal = document.createElement ('div');
  modal.classList.add ('modal-box');
  modalContainer.appendChild (modal);

  //Create modal button
  const modalButton = document.createElement ('button');
  modalButton.id = 'close-button';
  modalButton.innerText = 'Close';
  modal.appendChild (modalButton);

  //Create modal header
  const modalHeader = document.createElement ('div');
  modalHeader.classList.add ('modal-header');
  modal.appendChild (modalHeader);

  //Create container and image
  const modalImageContainer = document.createElement ('div');
  modalImageContainer.classList.add ('modal-image-container');
  modalHeader.appendChild (modalImageContainer);

  const modalImage = document.createElement ('img');
  modalImage.classList.add ('modal-image');
  modalImage.src = item.largeImage;
  modalImageContainer.appendChild (modalImage);

  //Create title
  const modalTitle = document.createElement ('h1');
  modalTitle.innerText = item.name;
  modalHeader.appendChild (modalTitle);

  const modalContentContainer = document.createElement ('div');
  modalContentContainer.classList.add ('modal-content-container');
  modal.appendChild (modalContentContainer);

  //Create content boxes
  function createContentBoxes (name, container) {
    const content = document.createElement ('div');
    const contentTitle = document.createElement ('h2');
    contentTitle.innerText = name;
    content.classList.add ('modal-content');
    content.id = (name);
    content.appendChild (contentTitle);
    container.appendChild (content);

    if (name === 'General'){

      const generalContent = document.createElement ('p');
      
      generalContent.innerText = `Height: ${item.height} 
      Weight: ${item.weight}`;
      content.appendChild (generalContent);

    } else if (name === 'Stats') {
      item.stats.forEach(function (item) {
          const barContainer = document.createElement('div');
          barContainer.classList.add('progress');
          barContainer.id = item.stat.name;
  
          const barLabel = document.createElement('label');
          barLabel.for = item.stat.name;
          barLabel.classList.add('stat-label');
          barLabel.innerText = item.stat.name;
  
          const bar = document.createElement('div');
          bar.classList.add('progress-bar');
          bar.style.backgroundColor = '#dc3545'
          bar.role = 'progressbar'; 
          bar.style.width = '0%'; 
          bar.ariaValueNow = 0; 
          bar.ariaValueMax = 255;
          bar.ariaValueMin = 0;
          bar.innerText = item.base_stat;
  
          // Animate the progress bar width from 0% to the desired value
          let width = 0;
          const animationDuration = 500; // Animation duration in milliseconds (1 second)
          const frameRate = 10; 
          const increment = item.base_stat / (animationDuration / frameRate);
          const id = setInterval(frame, frameRate);
  
          function frame() {
              if (width >= item.base_stat / 255 * 100) {
                  clearInterval(id);
              } else {
                  width += increment;
                  bar.style.width = width + '%';
                  bar.ariaValueNow = Math.round(width);
              }
          }
  
          content.appendChild(barLabel);
          content.appendChild(barContainer);
          barContainer.appendChild(bar);
      });
      
    } else if (name === 'Types') {
      item.types.forEach (function (item) {
        const generalContent = document.createElement ('div');
        generalContent.innerText = item.type.name;
        generalContent.classList.add ('type-card');
        generalContent.style.backgroundColor = `var(--${item.type.name})`
        content.appendChild (generalContent);
      })
    }
  }

  createContentBoxes ('General', modalContentContainer);
  createContentBoxes ('Stats', modalContentContainer);
  createContentBoxes ('Types', modalContentContainer);

  modalButton.addEventListener("click", function () {
    const element = document.querySelector ('#modal-container');
      element.classList.remove ('isOpen');
      const sidebar = document.querySelector ('.sidebar');
      sidebar.scrollIntoView();
  });

  document.addEventListener ('keydown', (key) => {
    if (key.key === 'Escape'){
      const element = document.querySelector ('#modal-container');
      element.classList.remove ('isOpen');
      const sidebar = document.querySelector ('.sidebar');
      sidebar.scrollIntoView();
    }
  })

  modalContainer.addEventListener ('click', function (){
    const element = document.querySelector ('#modal-container');
      element.classList.remove ('isOpen');
      const sidebar = document.querySelector ('.sidebar');
      sidebar.scrollIntoView();
  })

  const main = document.querySelector ('main');
  main.scrollIntoView();
 
}
