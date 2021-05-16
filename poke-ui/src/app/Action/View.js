import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const config = {
  btnVariant: 'primary',
  btnText:    'View Details'
};

class View extends Component {
  constructor(props) {
    super(props)

    this.config = config;
  }

  handleClick() {
    let { history, match, pokemon, globalProps } = this.props;

    history.push(`${match.path}/${pokemon.name}`);

    // When the user Views a Pokemon's Details, the compare pokemon is removed
    globalProps.removeComparePokemon();
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

export default withRouter(View);
