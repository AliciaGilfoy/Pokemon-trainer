import store from "../store.js";
import Pokemon from "../Models/Pokemon.js"

// @ts-ignore
let _pokeApi = axios.create({
  baseURL: "//pokeapi.co/api/v2/pokemon",
  timeout: 4000
})

// @ts-ignore
let _sandboxApi = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/Alicia/pokemon",
  timeout: 3000
})


class PokemonsService {
  getApiPokemons() {
    _pokeApi.get("")
      .then(res => {
        store.commit("pokemons", res.data.results)
      }).catch(error => {
        console.error(error);
      });
  }
  getPokemonById(url) {
    _pokeApi.get(url)
      .then(res => {
        let poke = new Pokemon(res.data)
        store.commit("activePokemon", poke)
      }).catch(error => {
        console.error(error);
      });
  }
  getAllMyPokemons() {
    _sandboxApi.get("")
      .then(res => {
        let newPoke = res.data.data
        let myPokemons = [...store.State.myPokemons, ...newPoke];
        store.commit("myPokemons", myPokemons);
        console.log("my pokemon store", store.State.myPokemons)
        // let myPokemons = res.data.data.map(p => new Pokemon(p))
        // store.commit("myPokemons", myPokemons)
      }).catch(error => {
        console.error(error);
      });
  }
  selectMyPokemon(id) {
    let poke = store.State.myPokemons.find(p => p._id = id);
    let newPoke = new Pokemon(poke)
    store.commit("activePokemon", newPoke)
    console.log(store.State.activePokemon)
  }

  release(id) {
    _sandboxApi.delete(id)
      .then(res => {
        let filteredPokemon = store.State.myPokemons.filter(p => p._id != id)
        store.commit("myPokemons", filteredPokemon)
        store.commit("activePokemon", null)
      }).catch(error => {
        console.error(error);
      });
  }
  catch() {
    _sandboxApi.post("", store.State.activePokemon)
      .then(res => {
        let newPoke = res.data.data
        let myPokemon = [...store.State.myPokemons, newPoke];
        store.commit("myPokemons", myPokemon);
        console.log(res)
        // let newPoke = new Pokemon(res.data.data)
        console.log(store.State.myPokemons)
        // debugger
        // store.commit('myPokemons', poke.data.data.map(pokemonData => new Pokemon(pokemonData)))
        // store.State.myPokemons.push(newPoke)
        // store.commit("myPokemons", store.State.myPokemons)
      }).catch(error => {
        console.error(error);
      });
  }



}

const service = new PokemonsService();
export default service;