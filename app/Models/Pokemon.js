export default class Pokemon {
  constructor(data) {
    this._id = data._id || "";
    this.name = data.name;
    this.description = ""
    this.img = ""
    this.types = [];

    if (this.types) {
      data.types.forEach(elem => {
        this.types.push(elem.type.name)
      })
    } else {
      this.types = data.types
    }

    if (this._id) {
      this.description = data.description
      this.img = data.img
    } else {
      this.description = data.stats[0].base_stat;
      this.img = data.sprites.front_default;
    }

  }

  getButton() {
    if (this._id) {
      return `<button class="btn" onclick="app.pokemonsController.release('${this._id}')"><img src="./pokemon-ball-open-png-2.png" height="75" width="150"></button>`
    } else {
      return `<button class="btn" onclick="app.pokemonsController.catch()"><img src="./pokeball.png" height="60" width="60"></button>`
    }
  }

  get Template() {
    return `
          <div class="card shadow p-3 mb-5 rounded" style="width: 18rem;">
          <div>
            <h5 class="card-title">${this.name}
              <span class="float-right h6">HP ${this.description} </span>
            </h5>
          </div>
          <img src="${this.img}" class="card-img-top">
          <div class="card-body">
          <p class="card-text">Class: ${this.types.join(", ")}</p>
          ${this.getButton()}
          </div></div>
 `
  }
}