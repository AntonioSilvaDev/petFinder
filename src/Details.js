import React from "react";
import pf from "petfinder-client";
import { navigate } from "@reach/router";
import Carousel from "./Carousel";
import Modal from "./Modal";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Details extends React.Component {
  state = {
    loading: true,
    showModal: false
  }; //now you don't need a constructor since we are using class properties

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  componentDidMount() {
    petfinder.pet
      .get({
        id: this.props.id,
        output: "basic"
      })
      .then(data => {
        const pet = data.petfinder.pet;
        console.log(pet);
        let breed;
        if (Array.isArray(pet.breeds.breed)) {
          breed = pet.breeds.breed.join(", ");
        } else {
          breed = pet.breeds.breed;
        }
        console.log(data);

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
    const {
      animal,
      name,
      breed,
      description,
      location,
      id,
      media,
      showModal
    } = this.state;

    console.log(description);
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>
            {name} - {id}
          </h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          <button onClick={this.toggleModal}>Adopt {name}!</button>
          <p>{description ? description : "No description available"}</p>
          {showModal ? (
            <Modal>
              <h1>Would you like to adopt {name}?</h1>
              <div className="buttons">
                <button onClick={this.toggleModal}>YES</button>
                <button onClick={this.toggleModal}>Hell YES</button>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Details;
