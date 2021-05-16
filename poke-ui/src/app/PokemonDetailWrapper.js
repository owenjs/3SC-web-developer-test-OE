import React, { Component } from "react";
import { Route } from "react-router-dom";
import PokemonDetail from "./PokemonList/PokemonDetail";

export default class PokemonDetailWrapper extends Component {
  render() {
    let { globalProps } = this.props;

    return (
      <div className="row">
        <PokemonDetail displayPokemon={globalProps.viewPokemon} />
        
        <Route path={`/pokemon/${globalProps.viewPokemon}/:id`} render={({ match }) => {
          if(globalProps.comparePokemon !== match.params.id) {
            globalProps.updateComparePokemon(match.params.id);
          }

          return <PokemonDetail displayPokemon={match.params.id} />;
        }} />
      </div>
    );
  }
}
