import React from "react";
import axios from "axios";

export default class SingleBreed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: []
    }
  }

  async componentDidMount() {
    const copyPictures = [];

    for (let i = 0; i < 4; i++) {
      try {
        const breed = this.props.location.params.dog;
        const res = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
        copyPictures.push(res.data.message);
      } catch (err) {
        console.error(err.message);
      }
    }

    this.setState({
      pictures: copyPictures
    });
  }

  render() {
    const pictures = this.state.pictures;
    const breed = this.props.location.params.dog.slice(0, 1).toUpperCase() + this.props.location.params.dog.slice(1);

    return !pictures || pictures.length === 0 ? (
      <h1>Loading...</h1>
    ) : (
      <div>
        <h1>{breed}</h1>
        <ul>
          {pictures.map((picture, index) => {
            return (
              <div key={index}>
                <ol>
                  <div>
                    <img src={picture} alt="image" />
                  </div>
                </ol>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}