import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const config = {
  btnVariant: 'success',
  btnText:    'Favorite'
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
    let config = this.config;

    return (
      <button 
        className={`btn btn-${config.btnVariant}`}
        onClick={() => this.handleClick()}>
        {config.btnText}
      </button>
    );
  }
}
