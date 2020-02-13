import PokemonService from "../Services/PokemonsService.js"
import store from "../store.js";

//Private
function _draw() {
  let pokemon = store.State.pokemons;
  let template = "";
  pokemon.forEach(p => {
    template += `<li onclick="app.pokemonsController.getPokemonById('${p.url}')">${p.name}</li>`
  })
  document.getElementById("pokemon-list").innerHTML = template
}

function _drawActivePokemon() {
  if (store.State.activePokemon) {
    document.getElementById("pokemonCard").innerHTML = store.State.activePokemon.Template
  } else {
    document.getElementById("pokemonCard").innerHTML = ""
  }
}

function _drawMyPokemon() {
  let pokemon = store.State.myPokemons
  let template = ""
  pokemon.forEach(p => {
    template += `<li onclick="app.pokemonsController.setMyPokemon('${p._id}')">${p.name}</li>`
  })
  document.getElementById("myPokemon-list").innerHTML = template
}

//Public
export default class PokemonsController {
  constructor() {
    store.subscribe("pokemons", _draw);
    store.subscribe("activePokemon", _drawActivePokemon);
    store.subscribe("myPokemons", _drawMyPokemon);

    // PokemonService.getApiPokemons();
    PokemonService.getAllMyPokemons();


  }

  getPokemonById(url) {
    PokemonService.getPokemonById(url)
  }

  catch() {
    let found = store.State.myPokemons.find(p => p.name == store.State.activePokemon.name);
    if (found) {
      alert("you already have this pokemon");
      return;
    }
    PokemonService.catch()
  }

  setMyPokemon(id) {
    PokemonService.setMyPokemon(id)
  }

  release(id) {
    PokemonService.release(id)
  }

  searchByClass(event) {
    event.preventDefault();
    let form = document.getElementById("typeSelector");
    let result = form.options[form.selectedIndex].value;
    PokemonService.getApiPokemonByType(result)

    // let value =
    //   PokemonService.searchByClass(value)
  }
}