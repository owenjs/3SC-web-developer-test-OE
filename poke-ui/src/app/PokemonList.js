import React, { Component } from "react";
import API from "../api";

export default class PokemonList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: null
    };
  }

  componentDidMount() {
    API.getPokemon().then(data => {
      this.setState({ pokemon: data });
    });
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

  handleNext() {
    if(!this.state.pokemon || !this.state.pokemon.next) {
      // No Next Page available
      return;
    }

    // TBD: Move this to API file
    fetch(this.state.pokemon.next)
      .then(res => res.json())
      .then(data => {
        this.setState({ pokemon: data });
      });
  }

  handlePrevious() {
    if(!this.state.pokemon || !this.state.pokemon.previous) {
      // No Previous Page available
      return;
    }

    // TBD: Move this to API file
    fetch(this.state.pokemon.previous)
      .then(res => res.json())
      .then(data => {
        this.setState({ pokemon: data });
      });
  }
}
