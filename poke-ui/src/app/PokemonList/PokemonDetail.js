import React, { Component } from "react";
import API from "../../api";

export default class PokemonDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonName: null,
      pokemonDetails: null
    };
  }

  componentDidMount() {
    this.handleFetch();
  }

  componentDidUpdate() {
    if(!this.state.pokemonDetails) {
      this.handleFetch();
    }
  }

  static getDerivedStateFromProps(props, state) {
    if(state.pokemonName === props.displayPokemon ) {
      // We are rendering the same pokemon - no need to update state
      return state; 
    }

    // The Pokemon name has changed, reset the state with the new name
    return {
      ...state,
      pokemonName: props.displayPokemon,
      pokemonDetails: null
    };
  }

  render() {
    if(!this.state.pokemonDetails) {
      return (<div className="col"><span>Loading...</span></div>);
    }

    return <div className="col"><code>{this.state.pokemonName}{/*JSON.stringify(this.state.pokemonDetails)*/}</code></div>;
  }

  handleFetch() {
    API.getPokemonDetail(this.state.pokemonName).then(data => {
      this.setState({ pokemonDetails: data });
    });
  }
}
