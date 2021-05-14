import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

import PokemonList from "./app/PokemonList";
import PokemonDetail from "./app/PokemonList/PokemonDetail";

function Home() {
  return <h2>Home</h2>;
}

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/pokemon">Fetch Pokemon</Link>
              </li>
            </ul>
          </nav>

          <div className="row">
            <div className="col-4">
              <Route path="/pokemon" component={PokemonList} />
            </div>
            <div className="col-8">
              <Route path="/pokemon/:id" children={<PokemonDetail />} />
            </div>
          </div>

          <Route path="/" exact component={Home} />
        </div>
      </Router>
    );
  }
}
