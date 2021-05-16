import React, { Component } from "react";
import { Route } from "react-router-dom";
import DisplayPokemonDetail from "./PokemonDetail/Display";

export default class PokemonDetail extends Component {
  render() {
    let { globalProps } = this.props;

    return (
      <div className="row h-100">
        <DisplayPokemonDetail displayPokemon={globalProps.viewPokemon} />
        
        <Route path={`/pokemon/${globalProps.viewPokemon}/:id`} render={({ match }) => {
          if(globalProps.comparePokemon !== match.params.id) {
            globalProps.updateComparePokemon(match.params.id);
          }

          return <DisplayPokemonDetail displayPokemon={match.params.id} />;
        }} />
      </div>
    );
  }
}
