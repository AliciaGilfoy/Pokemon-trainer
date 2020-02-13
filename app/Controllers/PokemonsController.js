import PokemonService from "../Services/PokemonsService.js"
import store from "../store.js";

//Private
function _draw() {
  let pokemon = store.State.pokemons
  let template = ""
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
    template += `<li onclick="app.pokemonsController.selectMyPokemon('${p._id}')">${p.name}</li>`
  })
  document.getElementById("myPokemon-list").innerHTML = template
}

//Public
export default class PokemonsController {
  constructor() {
    store.subscribe("pokemons", _draw);
    store.subscribe("myPokemons", _drawMyPokemon);
    store.subscribe("activePokemon", _drawActivePokemon);

    PokemonService.getApiPokemons();
    PokemonService.getAllMyPokemons();


  }

  getPokemonById(url) {
    PokemonService.getPokemonById(url)
  }

  catch() {
    PokemonService.catch()
  }

  selectMyPokemon(id) {
    PokemonService.selectMyPokemon(id)
  }

  release(id) {
    PokemonService.release(id)
  }
}