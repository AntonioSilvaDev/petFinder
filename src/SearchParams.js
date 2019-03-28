import React from "react";
import SearchBox from "./SearchBox";
import { navigate } from "@reach/router";

class SearchParams extends React.Component {
  handleSearchSubmit() {
    //now when they click search, it will navigate to / from reach router
    navigate("/");
  }
  render() {
    return (
      <div className="search-params">
        <SearchBox search={this.handleSearchSubmit} />
      </div>
    );
  }
}

export default SearchParams;
