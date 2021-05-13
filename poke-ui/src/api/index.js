let API = {
  // "Private" Methods
  _baseURL: "https://pokeapi.co/api/v2/",

  _fetch: function(infix) {
    return new Promise((resolve, reject) => {
      fetch(this._baseURL + infix)
        .then(res => res.json())
        .then(data => resolve(data));
    })
  },

  // "Public" Methods
  getPokemon: function() {
    return this._fetch('pokemon');
  }
}

export default API;