let API = {

  // "Private" Methods / Properties

  // The Base URL for the API
  _baseURL: "https://pokeapi.co/api/v2/",

  /**
   * GET the JSON from a PokeAPI's endpoint
   * 
   * @param {String} suffix The end part of the URL needed, for example /pokemon
   * @param {Object} QueryData Defaults Given 
   * @returns 
   */
  _fetch: function(suffix, { offset = 0, limit = 20 } = {}) {
    // Build Query String
    let queryString = `?offset=${offset}&limit=${limit}`;

    return new Promise((resolve, reject) => {
      fetch(this._baseURL + suffix + queryString)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(() => {
          reject(404);
        });
    })
  },


  // "Public" Methods / Properties

  /**
   * GET all Pokemon from the API
   * Using limit and offset query data
   * 
   * @param {Object} queryData for the API call
   * @returns A Promise Object for the API call 
   */
  getPokemon: function(queryData) {
    return this._fetch('pokemon', queryData);
  },

  /**
   * GET the Pokemon's Statistics
   * 
   * @param {String} pokemonName 
   * @returns A Promise Object for the API call 
   */
  getPokemonDetail: function(pokemonName) {
    return pokemonName 
      ? this._fetch(`pokemon/${pokemonName}`)
      : new Promise((resolve, reject) => reject('no-name'));
  }
}

export default API;
