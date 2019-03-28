import React from "react";
import pf from "petfinder-client";
import { Consumer } from "./SearchContext";
import Pet from "./Pet";
import SearchBox from "./SearchBox";

const petfinder = pf({
  //API(client) Library that btholt created for this workshop
  secret: process.env.API_SECRET,
  key: process.env.API_KEY,
  version: 2
});

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: [],
      loading: true
    };
  }
  componentDidMount() {
    this.search();
  }

  search = () => {
    petfinder.pet
      .find({
        output: "full",
        location: this.props.searchParams.location,
        animal: this.props.searchParams.animal,
        breed: this.props.searchParams.breed
      })
      .then(data => {
        let pets;

        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        this.setState({
          //shallow merge
          pets,
          loading: false
        });
      });
  };

  render() {
    if (this.state.loading) {
      return <h1>Loading.....</h1>;
    }
    return (
      <div className="search">
        <SearchBox search={this.search} />
        {this.state.pets.map(pet => {
          let breed;

          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(", ");
          } else {
            breed = pet.breeds.breed;
          }

          return (
            <Pet
              key={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={breed}
              description={pet.description}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
              id={pet.id}
            />
          );
        })}
      </div>
    );
  }
}

export default function ResultsWithContext(props) {
  return (
    <Consumer>
      {context => <Results {...props} searchParams={context} />}
    </Consumer>
  );
}
