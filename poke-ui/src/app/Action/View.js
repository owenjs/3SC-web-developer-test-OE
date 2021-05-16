import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// Config for the Button
const config = {
  btnVariant: 'primary',
  btnText:    'View Details'
};

/** @class 'View' Action and Button */
class View extends Component {
  constructor(props) {
    super(props)

    this.config = config;
  }

  /**
   * The View Action adds the pokemon's name to the URL removing the compare 
   * pokemon part of the URL if present
   */
  handleClick() {
    let { history, match, pokemon, globalProps } = this.props;

    history.push(`${match.path}/${pokemon.name}`);

    // When the user Views a Pokemon's Details, the compare pokemon is removed
    globalProps.removeComparePokemon();
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
export default withRouter(View);
