import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import PokemonList from "./app/PokemonList";
import PokemonDetail from "./app/PokemonList/PokemonDetail";
import PokemonDetailWrapper from "./app/PokemonDetailWrapper";

function Home() {
  return <h2>Home</h2>;
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      viewPokemon: null,
      comparePokemon: null,
      favoritePokemon: []
    };

    this.globalProps = {
      updateComparePokemon: (pokemonName) => this.updateComparePokemon(pokemonName),
      removeComparePokemon: () => this.removeComparePokemon(),
      addFavorite: (pokemonName) => this.addFavorite(pokemonName)
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pokemon">Fetch Pokemon</Link>
            </li>
          </ul>
        </nav>

        <div className="row">
          <div className="col-4">
            <Route path="/pokemon" render={() => <PokemonList globalProps={this.getGlobalProps()} />} />
          </div>
          <div className="col-8">
            <Route path="/pokemon/:id" render={({ match }) => {
              if(this.state.viewPokemon !== match.params.id) {
                this.setState({ viewPokemon: match.params.id});
              }

              return <PokemonDetailWrapper globalProps={this.getGlobalProps()} />;
            }} />
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
    this.setState({ favoritePokemon: [...this.state.favoritePokemon, pokemonName]});
  }
}
