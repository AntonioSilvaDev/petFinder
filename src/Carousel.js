import React from "react";

class Carousel extends React.Component {
  state = {
    //now that babel is configured, we don't need the constructor
    photos: [],
    active: 0
  };

  static getDerivedStateFromProps({ media }) {
    let photos;

    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    console.log(photos);
    return { photos };
  }

  handleIndexClick = event => {
    console.log(event.target.dataset);
    this.setState({
      active: +event.target.dataset.index
    });
  };

  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img
          src={
            photos[0] ? photos[active].value : "http://placecorgi.com/300/300"
          }
          alt="primary animal"
        />
        <div className="carousel-smaller">
          {photos[0] ? (
            photos.map((
              photo,
              index //need to refactor to be a img inside a button
            ) => (
              /* eslint-disable-next-line */
              <img
                key={photo.value}
                data-index={index}
                src={photo.value}
                className={index === active ? "active" : ""}
                alt="animal thumbnail"
                onClick={this.handleIndexClick}
              />
            ))
          ) : (
            <h1>No Photos Available</h1>
          )}
        </div>
      </div>
    );
  }
}

export default Carousel;
