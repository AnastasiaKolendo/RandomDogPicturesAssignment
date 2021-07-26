import React from "react";
import axios from "axios";

export default class SingleBreed extends React.Component {

  constructor(props) {
    super(props);
    let pictures = [];

    if (JSON.parse(window.localStorage.getItem('pictures'))) {
      pictures = JSON.parse(window.localStorage.getItem('pictures'))
    }

    let breed = '';
    if (JSON.parse(window.localStorage.getItem('breed'))) {
      breed = JSON.parse(window.localStorage.getItem('breed'));
    }


    this.state = {
      pictures: pictures,
      breed: breed
    }
  }

  async componentDidMount() {
    if (this.props.location.params !== undefined) {
      const copyPictures = [];

      for (let i = 0; i < 4; i++) {
        try {

          const breed = this.props.location.params.breed;

          window.localStorage.setItem('breed', JSON.stringify(breed));

          this.setState({
            breed: breed
          })

          const res = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
          copyPictures.push(res.data.message);
        } catch (err) {
          console.error(err.message);
        }
        window.localStorage.setItem('pictures', JSON.stringify(copyPictures));

        this.setState({
          pictures: copyPictures
        })
      }
    }
  }

  render() {
    const breed = this.state.breed.slice(0, 1).toUpperCase() + this.state.breed.slice(1);
    const pictures = this.state.pictures;

    return !pictures || pictures.length === 0 ? (
      <h1>Loading...</h1>
    ) : (
      <div>
        <h1>{breed}</h1>
        <ul>
          {pictures.map((picture, index) => {
            return (
              <div key={index}>
                <ol className='row'>
                  <div className='column'>
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