import React, { Component } from "react";
import API from "../../api";
import { withRouter } from "react-router-dom";

class PokemonDetail extends Component {
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
    if(state.pokemonName === props.match.params.id ) {
      // We are rendering the same pokemon - not need to update state
      return state; 
    }

    // The Pokemon name has changed, reset the state with the new name
    return {
      ...state,
      pokemonName: props.match.params.id,
      pokemonDetails: null
    };
  }

  render() {
    if(!this.state.pokemonDetails) {
      return (<span>Loading...</span>);
    }

    return <code>{this.props.match.params.id}{JSON.stringify(this.state.pokemonDetails)}</code>;
  }

  handleFetch() {
    API.getPokemonDetail(this.props.match.params.id).then(data => {
      this.setState({ pokemonDetails: data });
    });
  }
}

export default withRouter(PokemonDetail)