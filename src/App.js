import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import pf from "petfinder-client";
import { Provider } from "./SearchContext";
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  constructor(props) {
    //doing with constructor to make it easier
    super(props);

    this.state = {
      location: "San Diego, CA",
      animal: "",
      breed: "",
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    };
  }

  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    });
  };

  handleAnimalChange = event => {
    this.setState(
      {
        animal: event.target.value,
        breed: ""
      },
      this.getBreeds
    );
  };

  handleBreedChange = event => {
    this.setState({
      breed: event.target.value
    });
  };

  getBreeds() {
    if (this.state.animal) {
      petfinder.breed.list({ animal: this.state.animal }).then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({
            breeds: data.petfinder.breeds.breed
          });
        }
      });
    } else {
      this.setState({
        breeds: []
      });
    }
  }

  render() {
    return (
      <div>
        <header>
          <Link to="/">Adopt Me Please!</Link>
          <Link to="/search-params">
            <span aria-label="search" role="img">
              🐖
            </span>
          </Link>
        </header>
        <Provider value={this.state}>
          <Router>
            <SearchParams path="/search-params" />
            <Details path="/details/:id" />
            <Results path="/" />
          </Router>
        </Provider>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
