import React from "react";
import axios from "axios";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: []
    }

    this.handleClick = this.handleClick.bind(this);
    this.filterDogs = this.filterDogs.bind(this);
  }

  filterDogs(index) {
    
  }

  handleClick(dog){
    this.props.history.push('/dogs/dog')
  }


  async componentDidMount() {
    try {
      const res = await axios.get("https://dog.ceo/api/breeds/list/all");
      const dogs = res.data;

      this.setState({
        dogs: dogs.message
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  render() {
    const dogs = this.state.dogs;
    return !dogs || dogs.length === 0 ? (
      <h1>No Dogs Available</h1>
      ) : (
        <div>
        <h1>All Dogs: </h1>
        <ul>
          {Object.keys(dogs).map((dog, index) => {
            return (
              <div key={index}>
                <li onClick={() => this.handleClick(dog)}>
                  <div>
                    <h3>{dog}</h3>
                    {dogs[dog].length > 0 ? (
                      <span>: {dogs[dog].map((subBreed, index) => {
                        if(index !== dogs[dog].length - 1){
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
        <button type="button" onClick={this.filterDogs}>
          Filter Dogs
        </button>
      </div>
    );
  }
}
