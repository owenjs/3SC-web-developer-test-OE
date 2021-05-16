import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// Config for the Button
const config = {
  btnVariant: 'secondary',
  btnText:    'Compare'
};

/** @class 'Compare' Action and Button */
class Compare extends Component {
  constructor(props) {
    super(props)

    this.config = config;
  }

  /**
   * The Compare Action adds the Pokemon's name to the URL after 
   * the View Pokemon's name
   */
  handleClick() {
    let { history, match, pokemon, globalProps } = this.props;

    history.push(`${match.path}/${globalProps.viewPokemon}/${pokemon.name}`);
  }

  /**
   * JSX for the Action's Button
   */
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

// https://reactrouter.com/web/api/withRouter
export default withRouter(Compare);
