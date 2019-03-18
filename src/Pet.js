import React from "react";

const Pet = props => {
  //functional component
  //   return React.createElement("div", {}, [
  //     React.createElement("h5", {}, props.animal),
  //     React.createElement("h2", {}, props.name),
  //     React.createElement("h2", {}, props.breed),
  //     React.createElement("h3", {}, props.likes),
  //     React.createElement("h4", {}, props.dislikes)
  //   ]);

  return (
    <div>
      <h1>{props.animal}</h1>
      <h2>{props.name}</h2>
      <h3>{props.breed}</h3>
      <h4>{props.likes}</h4>
      <h5>{props.dislikes}</h5>
    </div>
  );
};

export default Pet;
