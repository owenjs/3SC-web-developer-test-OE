import React, { Component } from "react";

// Config for the Button
const config = {
  btnVariant: 'success',
  btnText:    'Favorite',
  btnAltText: 'Unfavorite'
};

/** @class 'Favorite' Action and Button */
export default class Favorite extends Component {
  constructor(props) {
    super(props)

    this.config = config;
  }

  /**
   * The Favorite Action adds or removes the pokemon from the Favorites List
   */
  handleClick(favorited) {
    let { pokemon, globalProps } = this.props;

    if(favorited) {
      globalProps.removeFavorite(pokemon.name);
    } else {
      globalProps.addFavorite(pokemon.name);
    }
  }

  /**
   * JSX for the Action's Button
   */
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
