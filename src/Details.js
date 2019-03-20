import React from "react";
import pf from "petfinder-client";
import { navigate } from "@reach/router";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Details extends React.Component {
  state = {
    loading: true
  }; //now you don't

  componentDidMount() {
    petfinder.pet
      .get({
        output: "full",
        id: this.props.id
      })
      .then(data => {
        const pet = data.petfinder.pet;
        let breed;
        if (Array.isArray(pet.breeds.breed)) {
          breed = pet.breeds.breed.join(", ");
        } else {
          breed = pet.breeds.breed;
        }
        console.log(pet.description);

        this.setState({
          name: pet.name,
          animal: pet.animal,
          location: `${pet.contact.city}, ${pet.contact.state}`,
          description: pet.description,
          media: pet.media,
          breed,
          id: pet.id,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ error: err });
        navigate("/");
      });
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading.....</h1>;
    }
    const { animal, name, breed, description, location, id } = this.state;
    return (
      <div className="details">
        <div>
          <h1>
            {name} - {id}
          </h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          <p>{description ? description : "No description available"}</p>
        </div>
      </div>
    );
  }
}

export default Details;
