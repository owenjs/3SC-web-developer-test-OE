import React, { Component } from "react";

const config = {
  btnVariant: 'success',
  btnText:    'Favorite',
  disabled:   false
};

export default class Favorite extends Component {
  constructor(props) {
    super(props)

    this.config = config;
  }

  handleClick() {
    let { pokemon, globalProps } = this.props;

    globalProps.addFavorite(pokemon.name);
  }

  render() {
    let { pokemon, globalProps } = this.props,
        config = {...this.config};

    if(globalProps.favoritePokemon.includes(pokemon.name)) {
      config.disabled = true;
    }

    return (
      <button 
        className={`btn btn-${config.btnVariant}`}
        onClick={() => this.handleClick()}
        disabled={config.disabled}>
          {config.btnText}
      </button>
    );
  }
}
