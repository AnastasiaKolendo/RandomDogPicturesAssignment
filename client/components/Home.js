import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breeds: {},
      stringToMatch: '',
      filteredBreeds: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let enteredBreeds = this.state.stringToMatch.slice().toLowerCase().split(',').join(' ').split(' ').filter(function (i) { return i });
    const copyBreeds = Object.assign(this.state.breeds);
    const newFilteredBreeds = {};

    if (enteredBreeds.length === 0) {
      this.setState({ filteredBreeds: copyBreeds });
    } else {
      enteredBreeds.forEach(breed => {
        if (this.state.breeds[breed]) {
          newFilteredBreeds[breed] = this.state.breeds[breed];
        }
      })
      this.setState({ filteredBreeds: newFilteredBreeds });
    }
  }

  async componentDidMount() {
    try {
      const res = await axios.get("https://dog.ceo/api/breeds/list/all");
      const breeds = res.data;

      this.setState({
        breeds: breeds.message,
        filteredBreeds: breeds.message
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  render() {
    const breeds = this.state.filteredBreeds;

    return !breeds || breeds.length === 0 ? (
      <h1>Loading...</h1>
    ) : (
      <div className="cotainer">
        <h1 id="name">List All Breeds: </h1>
        <ul>
          {Object.keys(breeds).map((breed, index) => {
            return (
              <div key={index}>
                <li>
                  <div>
                    <h3><Link to={{
                      pathname: "/single_breed",
                      params: {
                        dog: breed
                      },
                    }} >{breed}</Link></h3>
                    {breeds[breed].length > 0 ? (
                      <span>: {breeds[breed].map((subBreed, index) => {
                        if (index !== breeds[breed].length - 1) {
                          return (
                            subBreed + ', '
                          )
                        } else {
                          return (
                            subBreed
                          )
                        }

                      })}
                      </span>
                    ) : (
                      <h3></h3>
                    )}
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Enter dog's breeds to filter or nothing to see the whole list: </label>
            <input id="name" name="stringToMatch" type="text" required
              onChange={this.handleChange}
              value={this.stringToMatch}
            />
            <button type="button" onClick={this.handleSubmit}>
              Filter
            </button>
          </form>
        </div>
      </div>
    );
  }
}

