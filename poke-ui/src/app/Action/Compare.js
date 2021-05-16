import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const config = {
  btnVariant: 'secondary',
  btnText:    'Compare'
};

class Compare extends Component {
  constructor(props) {
    super(props)

    this.config = config;
  }

  handleClick() {
    let { history, match, pokemon, globalProps } = this.props;

    history.push(`${match.path}/${globalProps.viewPokemon}/${pokemon.name}`);
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

export default withRouter(Compare);
