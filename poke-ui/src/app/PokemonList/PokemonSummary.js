import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class PokemonSummary extends Component {

  render() {
    let { name } = this.props.pokemon;

    return (
      <div>
        <div className="border rounded py-3 px-4">
          <p className="h4">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
          <Link className="btn btn-primary" to={`${this.props.match.url}/${name}`}>View Details</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(PokemonSummary)
