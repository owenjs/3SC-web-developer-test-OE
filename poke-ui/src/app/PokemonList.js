import React, { Component } from "react";
import API from "../api";

export default class PokemonList extends Component {
  constructor(props) {
    super(props);

    this.queryData = {
      offset: 0,
      limit: 20
    };

    this.state = {
      pokemon: null
    };
  }

  componentDidMount() {
    this.handleFetch();
  }

  render() {
    if(!this.state.pokemon) {
      return (<span>Loading...</span>);
    }

    return ( 
      <div>
        <button className="btn btn-secondary" onClick={() => this.handlePrevious()}>Previous</button>
        <code>{JSON.stringify(this.state.pokemon)}</code>
        <button className="btn btn-primary" onClick={() => this.handleNext()}>Next</button>
      </div>
    );
  }

  handleFetch() {
    API.getPokemon(this.queryData).then(data => {
      this.setState({ pokemon: data });
    });
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
