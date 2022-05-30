// IIFE to wrap array

let pokemonRespository = (function () {
  let pokemonList = [{name:'Bulbasaur', height: 7, types:['grass', 'poison']},
                    {name:'Ivysaur', height: 1, types:['grass', 'poison']},
                    {name: 'Venusaur', height: 2, types: ['grass', 'poison']}
  ];
  // method to return arrary pokemonList
  function getAll() {
    return pokemonList;
  }

  // method to add a pokemon to pokemonList
  // check if keys are correct
  function add(pokemon) {
    if (typeof pokemon === 'object' 
    && Object.keys(pokemon)[0]=='name' && Object.keys(pokemon)[1] == 'height' && Object.keys(pokemon[2] == 'types')) {
      return pokemonList.push(pokemon);
    }
  }

  // method to filter pokemon out of pokemonList with matching name
  function filterPokemon(pokemonName) {
    return pokemonList.filter(pokemon => pokemon.name === pokemonName);
  }

  // method to add a pokemon as a list item
  // create the listItem, create the cutton
  // fill the button with the parameter name
  // append button to list item
  // append listitem to pokemon list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button =  document.createElement('button');
  
    button.innerHTML = ''+pokemon.name;
    button.classList.add('buttonStyle');
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  
    listItem.appendChild(button);
  
    pokemonList.appendChild(listItem);
  }

  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  return {
    getAll: getAll,
    add: add,
    filterPokemon: filterPokemon,
    addListItem: addListItem
  };

})();

// Retrieve array from IIFE
// iterate over the array of objects
// adding each object as a list item
pokemonRespository.getAll().forEach(function(pokemon) {

  pokemonRespository.addListItem(pokemon);

});





