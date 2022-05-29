const pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (pokemon.name && pokemon.detailsUrl) {
      pokemonList.push(pokemon);
    } else {
      console.log('Pokemon is not correct!');
    }
  }

  // update pokemonList with the input given
  let nameInput = document.querySelector('input');
  nameInput.addEventListener('input', updateList);

  function updateList(pokemonName) {
    let letters = pokemonName.target.value;
    console.log(''+pokemonName.target.value);
    console.log(typeof pokemonName.target.value);

    console.log(pokemonList);
    let pokemonListNew = pokemonList.filter(pokemon => String(pokemon.name).includes(letters));
    console.log(pokemonListNew);

    let ul = document.querySelector('ul');
    ul.innerHTML = '';

    pokemonListNew.forEach(function(pokemon) {
      addListItem(pokemon);
    });
  }


  function addListItem(pokemon) {
    // select List & create list item
    let ul = document.querySelector('ul');
    let listItem = document.createElement('li');
    listItem.classList.add('col-lg-2','col-md-4', 'col-12');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.addEventListener('click', (event) => {
      showDetails(pokemon);
      event.target.blur();
    });
    //Add classes & attributes to list item
    button.classList.add('buttonStyle');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '.modal');

    // Add item to list
    listItem.appendChild(button);
    ul.appendChild(listItem);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      showModal(pokemon);
      //modal.show(pokemon.name, pokemon.height, pokemon.types, pokemon.svgUrl);
    });
  }

  function showModal(pokemon) {
    // Get Node Elements
    let modalBody = document.querySelector('.modal-body');
    let modalTitle = document.querySelector('.modal-title');
    
    // Clear previous content
    modalBody.innerHTML = '';
    modalTitle.innerHTML ='';

    // Create Pokemon Elements
    let pokemonName = document.createElement('h1');
    pokemonName.innerText = pokemon.name;

    let pokemonImage = document.createElement('img');
    pokemonImage.classList.add('modal-img,mx-auto');
    pokemonImage.setAttribute('src', pokemon.svgUrl);

    let pokemonHeight = document.createElement('p');
    pokemonHeight.classList.add('ml-4,mt-3,mb-0');
    pokemonHeight.innerText ='Height: '+ pokemon.height;

    let pokemonWeight = document.createElement('p');
    pokemonWeight.classList.add('ml-4,mb-0');
    pokemonWeight.innerText = 'Weight: ' + pokemon.weight;

    // Append Pokemon Elements to modal body and modal title
    modalTitle.append(pokemonName);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
  }

  function loadList() {
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        json.results.forEach((item) => {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch((err) => console.log(err));
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then((res) => res.json())
      .then((details) => {
        //add details to item
        item.weight = details.weight;
        item.imageUrl = details.sprites.front_default;
        item.svgUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        let types = [];
        details.types.forEach((item) => types.push(item.type.name));
        item.types = types;
      })
      .catch((err) => console.log(err));
  }

  return {
    getAll,
    add,
    loadList,
    loadDetails,
    addListItem
  };
})();


// Create & display list of Pokemon
pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
      pokemonRepository.addListItem(pokemon);
    });
});