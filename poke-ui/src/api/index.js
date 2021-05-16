let API = {
  // "Private" Methods
  _baseURL: "https://pokeapi.co/api/v2/",

  _fetch: function(infix, { offset = 0, limit = 20 } = {}) {
    // Build Query String
    let queryString = `?offset=${offset}&limit=${limit}`;

    return new Promise((resolve, reject) => {
      console.log(this._baseURL + infix + queryString);
      
      fetch(this._baseURL + infix + queryString)
        .then(res => res.json())
        .then(data => resolve(data));
    })
  },

  // "Public" Methods
  getPokemon: function(queryData) {
    return this._fetch('pokemon', queryData);
  },

  getPokemonDetail: function(pokemonName) {
    return pokemonName 
      ? this._fetch(`pokemon/${pokemonName}`)
      : new Promise((resolve, reject) => reject());
  }
}

export default API;