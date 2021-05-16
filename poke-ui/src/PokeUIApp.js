import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import PokemonList from "./app/PokemonList";
import PokemonDetail from "./app/PokemonDetail";

/**
 * @returns The JSX to render the Home Page
 */
const HomePage = () => {
  return (
    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
      <h1>Welcome to <span className="text-primary">Poke UI!</span></h1>
      <p className="h5 mb-4">By Owen Evans - May 2021</p>
      <h2>Start by viewing the <Link to="/pokemon">Pokemon</Link></h2>
    </div>
  );
}

/** @class Structure for the App */
export default class PokeUIApp extends Component {
  constructor(props) {
    super(props)

    // Get Favorite Pokemon from local Host
    let favoritePokemon = JSON.parse(localStorage.getItem('pokeui-favoritePokemon')) || [];

    this.state = {
      viewPokemon: null,
      comparePokemon: null,
      favoritePokemon: favoritePokemon
    };

    // Public Methods and Properties which can be made available to all components
    this.globalProps = {
      updateComparePokemon: (pokemonName) => this.updateComparePokemon(pokemonName),
      removeComparePokemon: () => this.removeComparePokemon(),
      addFavorite: (pokemonName) => this.addFavorite(pokemonName),
      removeFavorite: (pokemonName) => this.removeFavorite(pokemonName)
    }
  }

  /**
   * @returns JSX for the Structure of the App
   */
  render() {
    return (
      <div className="vh-100 d-flex flex-column">
        <div>
          <nav className="navbar navbar-expand-sm navbar-dark bg-primary col-auto">
            <div className="container-fluid">
              <span className="navbar-brand">Poke UI</span>
              <div className="collapse show navbar-collapse">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/pokemon">View Pokemon</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div className="col position-relative">
          <div className="position-absolute h-100 w-100" style={{top: 0, left: 0, right: 0, bottom: 0}}>
            <div className="container-fluid h-100 py-3">
              <Route path="/pokemon">
                <div className="row h-100">
                  <div className="col-4 h-100">
                    <PokemonList globalProps={this.getGlobalProps()} />
                  </div>
                  <div className="col-8 h-100">
                    <Route path="/pokemon/:id" render={({ match }) => {
                      if(this.state.viewPokemon !== match.params.id) {
                        this.setState({ viewPokemon: match.params.id});
                      }

                      return <PokemonDetail globalProps={this.getGlobalProps()} />;
                    }} />
                  </div>
                </div>
              </Route>

              <Route path="/" exact component={HomePage} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Returns the Current state and Global Props in one Object
   * 
   * @returns {Object}
   */
  getGlobalProps() {
    return {
      ...this.state,
      ...this.globalProps
    }
  }

  /**
   * Update the State for the pokemon currently being compared
   */
  updateComparePokemon(pokemonName) {
    if(this.state.comparePokemon !== pokemonName) {
      this.setState({ comparePokemon: pokemonName});
    }
  }

  /**
   * Remove the compare pokemon from the state
   */
  removeComparePokemon() {
    this.setState({ comparePokemon: null});
  }

  /**
   * Add a Pokemon to the favorites list
   * 
   * @param {String} pokemonName The name of the pokemon to add
   */
  addFavorite(pokemonName) {
    let newFavoritePokemon = [...this.state.favoritePokemon, pokemonName];
    this.updateFavorites(newFavoritePokemon);
  }

  /**
   * Remove a Pokemon from the favorites list
   * 
   * @param {String} pokemonName The name of the pokemon to remove
   */
  removeFavorite(pokemonName) {
    let newFavoritePokemon = [...this.state.favoritePokemon];
    
    newFavoritePokemon.splice(newFavoritePokemon.indexOf(pokemonName), 1);

    this.updateFavorites(newFavoritePokemon);
  }

  /**
   * Update the State and reset the local storage for the favorites list
   * 
   * @param {Array} newFavoritePokemon New Array of Favorite Pokemon
   */
  updateFavorites(newFavoritePokemon) {
    this.setState({ favoritePokemon: newFavoritePokemon});

    // Local Host set
    localStorage.setItem('pokeui-favoritePokemon', JSON.stringify(newFavoritePokemon));
  }
}
