import React, { Component } from "react";

const config = {
  btnVariant: 'success',
  btnText:    'Favorite',
  btnAltText: 'Unfavorite'
};

export default class Favorite extends Component {
  constructor(props) {
    super(props)

    this.config = config;
  }

  handleClick(favorited) {
    let { pokemon, globalProps } = this.props;

    if(favorited) {
      globalProps.removeFavorite(pokemon.name);
    } else {
      globalProps.addFavorite(pokemon.name);
    }
  }

  render() {
    let { pokemon, globalProps } = this.props,
        config = this.config,
        favorited = globalProps.favoritePokemon.includes(pokemon.name);

    return (
      <button 
        className={`btn btn-${config.btnVariant}`}
        onClick={() => this.handleClick(favorited)}>
          {favorited ? config.btnAltText : config.btnText}
      </button>
    );
  }
}
