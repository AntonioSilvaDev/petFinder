import React from "react";
import pf from "petfinder-client";
import Pet from "./Pet";

const petfinder = pf({
  //API(client) Library that btholt created for this workshop
  secret: process.env.API_SECRET,
  key: process.env.API_KEY
});

class Results extends React.Component {
  //class component
  constructor(props) {
    super(props);

    this.state = {
      pets: [],
      loading: true
    };
    //constructors are run first, then component mounts
  }

  componentDidMount() {
    //lifecycle method
    petfinder.pet
      .find({ location: "San Diego, CA", output: "full" })
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
        console.log(pets);

        this.setState({
          //shallow merge
          pets,
          loading: false
        });
      });
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading.....</h1>;
    }
    return (
      <div className="search">
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

export default Results;
