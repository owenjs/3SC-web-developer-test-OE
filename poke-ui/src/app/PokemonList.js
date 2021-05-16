import React, { Component } from "react";
import API from "../api";
import PokemonSummary from './PokemonList/PokemonSummary';

export default class PokemonList extends Component {
  constructor(props) {
    super(props);

    this.queryData = {
      offset: 0,
      limit: 20
    };

    this.state = {
      pokemon: null,
      searchQuery: "",
      viewFavorites: false
    };
  }

  componentDidMount() {
    this.handleFetch();
  }

  render() {
    let { pokemon, viewFavorites, searchQuery } = this.state;

    if(!pokemon) {
      return (<span>Loading...</span>);
    }

    let pokemonToDisplay = pokemon.results;

    // Display Favorite Pokemon?
    if(viewFavorites) {
      pokemonToDisplay = pokemonToDisplay.filter((pokemonInfo) => this.props.globalProps.favoritePokemon.includes(pokemonInfo.name))
    }

    // Filter the List by the Search Query
    if(searchQuery.length > 0) {
      pokemonToDisplay = pokemonToDisplay.filter((pokemonInfo) => pokemonInfo.name.startsWith(searchQuery))
    }

    let pokemanCards = pokemonToDisplay.map((pokemonInfo, key) => {
      return <PokemonSummary globalProps={this.props.globalProps} key={key} pokemon={pokemonInfo} />;
    });

    return ( 
      <div>
        <div className="input-group mb-3">
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Search List..." onChange={(e) => this.handleSearch(e)} />
        </div>

        <div>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className={"nav-link" + (!viewFavorites ? ' active' : '')} onClick={() => this.handleTabChange(false)}>All</a>
            </li>
            <li className="nav-item">
              <a className={"nav-link" + (viewFavorites ? ' active' : '')} onClick={() => this.handleTabChange(true)}>Favorites</a>
            </li>
          </ul>
        </div>

        <div className="row g-4">
          {pokemanCards}
        </div>
        <code>{JSON.stringify(pokemon)}</code>
        <button className="btn btn-secondary" onClick={() => this.handlePrevious()}>Previous</button>
        <button className="btn btn-primary" onClick={() => this.handleNext()}>Next</button>
      </div>
    );
  }

  handleFetch() {
    API.getPokemon(this.queryData).then(data => {
      this.setState({ pokemon: data });
    });
  }

  handleTabChange(favoritesTab) {
    this.setState({ viewFavorites: favoritesTab });
  }

  handleSearch(e) {
    this.setState({ searchQuery: e.target.value.toLowerCase() });
  }

  handleNext() {
    // Add the limit to the offset to find the next Pokemon
    this.queryData.offset += this.queryData.limit;

    // TODO: What if the offset is larger than all the possible pokemon?

    this.handleFetch();
  }

  handlePrevious() {
    if(this.queryData.offset - this.queryData.limit < 0) {
      return;
    }

    // Minus the limit from the offset to find the previous Pokemon
    this.queryData.offset -= this.queryData.limit;
    
    this.handleFetch();
  }
}
