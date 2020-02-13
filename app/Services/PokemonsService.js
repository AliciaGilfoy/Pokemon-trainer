import store from "../store.js";
import Pokemon from "../Models/Pokemon.js"

// @ts-ignore
let _pokeApi = axios.create({
  baseURL: "//pokeapi.co/api/v2",
  timeout: 4000
})

// @ts-ignore
let _sandboxApi = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/Alicia/pokemon",
  timeout: 3000
})


class PokemonsService {
  getApiPokemonByType(result) {
    store.State.pokemons = []
    let string = "type/" + result + "/?limit=20&offset=20";
    _pokeApi.get(string)
      .then(res => {
        let newPokeList = res.data.pokemon
        for (let i = 0; i < 21; i++) {
          let newPokemon = newPokeList[i].pokemon;
          store.State.pokemons.push(newPokemon)
          console.log(store.State.pokemons)
          store.commit("pokemons", store.State.pokemons);
        }
      }).catch(error => {
        console.error(error);
      });
  }
  getApiPokemons() {
    _pokeApi.get("pokemon")
      .then(res => {
        store.commit("pokemons", res.data.results)
        console.log(res.data.results)
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
        // let newPoke = res.data.data
        // let myPokemons = [...store.State.myPokemons, ...newPoke];
        // store.commit("myPokemons", myPokemons);
        // console.log("my pokemon store", store.State.myPokemons)
        let myPoke = res.data.data.map(p => new Pokemon(p));
        store.commit("myPokemons", myPoke);
      }).catch(error => {
        console.error(error);
      });
  }

  getMyPokemonbyId(id) {
    _sandboxApi.get(id)
      .then(res => {
        let poke = new Pokemon(res.data.data);
        store.commit("activePokemon", poke);
      }).catch(error => {
        console.error(error);
      });
  }

  setMyPokemon(id) {
    let poke = store.State.myPokemons.find(p => p._id == id);
    // let newPoke = new Pokemon(poke);
    store.commit("activePokemon", poke);
    // console.log(store.State.activePokemon);
  }

  release(id) {
    _sandboxApi.delete(id)
      .then(res => {
        let filteredPokemon = store.State.myPokemons.filter(p => p._id != id);
        store.commit("myPokemons", filteredPokemon);
        store.commit("activePokemon", null);
      }).catch(error => {
        console.error(error);
      });
  }
  catch() {
    _sandboxApi.post("", store.State.activePokemon)
      .then(res => {
        let newPoke = new Pokemon(res.data.data);
        store.State.myPokemons.push(newPoke);
        store.commit("myPokemons", store.State.myPokemons)
        // let newPoke = res.data.data
        // let myPokemon = [...store.State.myPokemons, newPoke];
        // store.commit("myPokemons", myPokemon);
        // console.log(res)
        // console.log(store.State.myPokemons)
        // debugger
        // store.commit('myPokemons', poke.data.data.map(pokemonData => new Pokemon(pokemonData)))
      }).catch(error => {
        console.error(error);
      });
  }



}

const service = new PokemonsService();
export default service;