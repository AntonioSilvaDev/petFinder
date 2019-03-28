import React from "react";

const SearchContext = React.createContext({
  location: "San Diego, CA",
  animal: "",
  breed: "",
  breeds: [],
  handleAnimalChange() {},
  handleBreedChange() {},
  handleLocationChange() {},
  getBreeds() {}
}); //these are not doing anything, can be used for testing purposes and for typescript

export const Provider = SearchContext.Provider;
export const Consumer = SearchContext.Consumer;
