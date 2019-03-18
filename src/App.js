import React from "react";
import { render } from "react-dom";
import pf from "petfinder-client";
import Pet from "./Pet";

const petfinder = pf({
  //API(client) Library that btholt created for this workshop
  secret: process.env.API_SECRET,
  key: process.env.API_KEY
});

class App extends React.Component {
  //class component
  constructor(props) {
    super(props);

    this.state = {
      pets: {}
    };
    //constructors are run first, then component mounts
  }

  componentDidMount() {
    //lifecycle method
    petfinder.pet
      .find({ output: "full", location: "San Diego, CA" })
      .then(data => {
        let pets;
        console.log("response data", data.petfinder.pets.pet);

        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }
      });
  }

  render() {
    return (
      <div>
        <h1>Adopt Me Please</h1>
        <Pet
          animal="Dog"
          name="Tom"
          breed="German Shepard"
          likes="Long Walks"
          dislikes="When no one plays with him"
        />
        <Pet
          animal="Dog"
          name="Bill"
          breed="Sheep Dog"
          likes="Long Walks"
          dislikes="When no one plays with him"
        />
        <Pet
          animal="Dog"
          name="Charlie"
          breed="Chihuahua"
          likes="Long Walks"
          dislikes="When no one plays with him"
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
