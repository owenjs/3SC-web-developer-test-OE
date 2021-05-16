import React, { Component } from "react";
import API from "../api";

import DisplayPokemonSummary from './PokemonList/Display';
import UITabs from './UIComponents/Tabs';

/**
 * The Listing has two tabs, one for all Pokemon and 
 * one for the user's favorites. Here is the component for those tabs
 * 
 * @param {Object} props for the Component
 * @returns JSX for a Tab Component
 */
const UITabComponent = (props) => {
  return (
    <div className="row g-4">
      {props.pokemanCards}
    </div>
  );
};

// Metadata for the Tabs in the Listing View
const UITabsInfo = [
  { text: 'All', id: 'all', tabComponent: UITabComponent },
  { text: 'Favorites', id: 'favorites', tabComponent: UITabComponent }
];

/** 
 * @class 
 * List of Pokemon with Search Box, Pagination and Favorite List within a tab
 */
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

  /**
   * Fetch initial Pokemon data after first render
   */
  componentDidMount() {
    this.handleFetch();
  }

  /**
   * @returns JSX For the Listing View
   */
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
            <input type="text" className="form-control form-control-lg" id="exampleFormControlInput1" placeholder="Search List..." onChange={(e) => this.handleSearch(e)} />
          </div>
        </div>
        
        <UITabs 
          tabsInfo={UITabsInfo}
          activeTabId={activeTabId} 
          fnHandleTabChange={tabId => this.handleTabChange(tabId)}
          tabPaneProps={{pokemanCards: pokemanCards}} />

        <div className="d-flex justify-content-end pt-3 mt-auto">
          <div class="btn-group" role="group" aria-label="Pagination">
            <button type="button" className="btn btn-outline-dark" onClick={() => this.handlePrevious()}>{'<'}</button>
            <button type="button" className="btn btn-outline-dark" onClick={() => this.handleNext()}>{'>'}</button>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Fetch the Pokemon from the API
   */
  handleFetch() {
    API.getPokemon(this.queryData).then(data => {
      this.setState({ pokemon: data });
    });
  }

  /**
   * Update State when a tab is changed. 
   * If it is the Favorites tab set viewFavorites as 'true'
   */
  handleTabChange(tabId) {
    this.setState({ viewFavorites: tabId === 'favorites' });
  }

  /**
   * Update State when the user changes the Search Query
   * 
   * @param {*} e the event Object
   */
  handleSearch(e) {
    this.setState({ searchQuery: e.target.value.toLowerCase() });
  }

  /**
   * When Next Pagination is clicked fetch the next List of Pokemon
   */
  handleNext() {
    // Add the limit to the offset to find the next Pokemon
    this.queryData.offset += this.queryData.limit;

    // ToDo: What if the offset is larger than all the possible pokemon?

    this.handleFetch();
  }

  /**
   * When Previous Pagination is clicked fetch the previous List of Pokemon
   */
  handlePrevious() {
    if(this.queryData.offset - this.queryData.limit < 0) {
      return;
    }

    // Minus the limit from the offset to find the previous Pokemon
    this.queryData.offset -= this.queryData.limit;
    
    this.handleFetch();
  }
}
