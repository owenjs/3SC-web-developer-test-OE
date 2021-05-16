import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import PokemonList from "./app/PokemonList";
import PokemonDetail from "./app/PokemonDetail";

function Home() {
  return <h2>Home</h2>;
}

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

    this.globalProps = {
      updateComparePokemon: (pokemonName) => this.updateComparePokemon(pokemonName),
      removeComparePokemon: () => this.removeComparePokemon(),
      addFavorite: (pokemonName) => this.addFavorite(pokemonName),
      removeFavorite: (pokemonName) => this.removeFavorite(pokemonName)
    }
  }

  render() {
    return (
      <div className="container-fluid vh-100 d-flex flex-column">
        <nav className="col-auto">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pokemon">Fetch Pokemon</Link>
            </li>
          </ul>
        </nav>

        <div className="col position-relative">
          <div className="position-absolute h-100 w-100" style={{top: 0, left: 0, right: 0, bottom: 0}}>
            <div className="row h-100">
              <div className="col-4 h-100">
                <Route path="/pokemon" render={() => <PokemonList globalProps={this.getGlobalProps()} />} />
              </div>
              <div className="col-8">
                <Route path="/pokemon/:id" render={({ match }) => {
                  if(this.state.viewPokemon !== match.params.id) {
                    this.setState({ viewPokemon: match.params.id});
                  }

                  return <PokemonDetail globalProps={this.getGlobalProps()} />;
                }} />
              </div>
            </div>
          </div>
        </div>

        <Route path="/" exact component={Home} />
      </div>
    );
  }

  getGlobalProps() {
    return {
      ...this.state,
      ...this.globalProps
    }
  }

  updateComparePokemon(pokemonName) {
    if(this.state.comparePokemon !== pokemonName) {
      this.setState({ comparePokemon: pokemonName});
    }
  }

  removeComparePokemon() {
    this.setState({ comparePokemon: null});
  }

  addFavorite(pokemonName) {
    let newFavoritePokemon = [...this.state.favoritePokemon, pokemonName];
    this.updateFavorites(newFavoritePokemon);
  }

  removeFavorite(pokemonName) {
    let newFavoritePokemon = [...this.state.favoritePokemon];
    
    newFavoritePokemon.splice(newFavoritePokemon.indexOf(pokemonName), 1);

    this.updateFavorites(newFavoritePokemon);
  }

  updateFavorites(newFavoritePokemon) {
    this.setState({ favoritePokemon: newFavoritePokemon});

    // Local Host set
    localStorage.setItem('pokeui-favoritePokemon', JSON.stringify(newFavoritePokemon));
  }
}
