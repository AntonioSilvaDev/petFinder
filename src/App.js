import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import Results from "./Results";
import Details from "./Details";

class App extends React.Component {
  //class component
  render() {
    return (
      <div>
        <header>
          <Link to="/">Adopt Me Please!</Link>
        </header>
        <Router>
          <Details path="/details/:id" />
          <Results path="/" />
        </Router>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
