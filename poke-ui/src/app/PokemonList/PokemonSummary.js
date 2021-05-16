import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import View from '../Action/View';
import Compare from '../Action/Compare';
import Favorite from '../Action/Favorite';

class PokemonSummary extends Component {

  render() {
    let { pokemon } = this.props;

    return (
      <div>
        <div className="border rounded py-3 px-4">
          <p className="h4">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
          <View globalProps={this.props.globalProps} pokemon={pokemon} />
          <Compare globalProps={this.props.globalProps} pokemon={pokemon} />
          <Favorite globalProps={this.props.globalProps} pokemon={pokemon} />
        </div>
      </div>
    );
  }
}

export default withRouter(PokemonSummary)
