import React, { Component } from "react";
import API from "../api";

import DisplayPokemonSummary from './PokemonList/Display';
import UITabs from './UIComponents/Tabs';

const UITabComponent = (props) => {
  return (
    <div className="row g-4">
      {props.pokemanCards}
    </div>
  );
};

const UITabsInfo = [
  { text: 'All', id: 'all', tabComponent: UITabComponent },
  { text: 'Favorites', id: 'favorites', tabComponent: UITabComponent }
];

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
      activeTabId: 'all',
      viewFavorites: false
    };
  }

  componentDidMount() {
    this.handleFetch();
  }

  render() {
    let { pokemon, viewFavorites, searchQuery, activeTabId } = this.state;

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
      return <DisplayPokemonSummary globalProps={this.props.globalProps} key={key} pokemon={pokemonInfo} />;
    });

    return ( 
      <div className="h-100 d-flex flex-column">
        <div>
          <div className="input-group mb-3">
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Search List..." onChange={(e) => this.handleSearch(e)} />
          </div>
        </div>
        
        <UITabs 
          tabsInfo={UITabsInfo}
          activeTabId={activeTabId} 
          fnHandleTabChange={tabId => this.handleTabChange(tabId)}
          tabPaneProps={{pokemanCards: pokemanCards}} />

        <div className="d-flex justify-content-end pt-3 mt-auto">
          <div class="btn-group" role="group" aria-label="Pagination">
            <button type="button" className="btn btn-dark text-white" onClick={() => this.handlePrevious()}>{'<'}</button>
            <button type="button" className="btn btn-dark text-white" onClick={() => this.handleNext()}>{'>'}</button>
          </div>
        </div>
      </div>
    );
  }

  handleFetch() {
    API.getPokemon(this.queryData).then(data => {
      this.setState({ pokemon: data });
    });
  }

  handleTabChange(tabId) {
    this.setState({ viewFavorites: tabId === 'favorites' });
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
