import React from "react";

// const Pet = props => {
//functional component
//   return React.createElement("div", {}, [
//     React.createElement("h5", {}, props.animal),
//     React.createElement("h2", {}, props.name),
//     React.createElement("h2", {}, props.breed),
//     React.createElement("h3", {}, props.likes),
//     React.createElement("h4", {}, props.dislikes)
//   ]);

//   return (
//     <div>
//       <h1>Type: {props.animal}</h1>
//       <h2>Name: {props.name}</h2>
//       <h3>Breed: {props.breed}</h3>
//       <h4>Description: {props.description}</h4>
//       <h5>Id is: {props.id}</h5>
//     </div>
//   );
// };

class Pet extends React.Component {
  render() {
    const { name, animal, breed, media, location } = this.props;

    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    let imgSrc = `http://placecorgi.com/300/300`;
    if (photos[0] && photos[0].value) {
      imgSrc = photos[0].value;
    }
    return (
      <div className="pet">
        <div className="image-container">
          <img src={imgSrc} alt={name} />
        </div>
        <div className="info">
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
        </div>
      </div>
    );
  }
}

export default Pet;
