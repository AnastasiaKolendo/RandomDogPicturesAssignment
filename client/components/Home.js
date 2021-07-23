import React from "react";
import axios from "axios";
 
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: {},
      stringToMatch: '',
      filteredObj: {}
    }
 
     this.handleClick = this.handleClick.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
 
  handleClick(dog) {
    this.props.history.push('/dogs/dog');
  }
 
  handleSubmit(event) {
    event.preventDefault();
    let str = this.state.stringToMatch.slice();
    
    let filteredDogs = Object.keys(this.state.dogs);

    let newObj = {};
    for(let i = 0; i < filteredDogs.length; i++){
      if(str.indexOf(filteredDogs[i]) >= 0){
        newObj[filteredDogs[i]] = this.state.dogs[filteredDogs[i]]
      }
    }

    this.setState({filteredObj: newObj})
 
  }
 
 
  async componentDidMount() {
    try {
      const res = await axios.get("https://dog.ceo/api/breeds/list/all");
      const dogs = res.data;
 
      this.setState({
        dogs: dogs.message,
        filteredObj: dogs.message
      });
    } catch (err) {
      console.error(err.message);
    }
  }
 
  render() {
    const dogs = this.state.filteredObj;
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
                        if (index !== dogs[dog].length - 1) {
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
          <label htmlFor="name">Enter dogs breeds to filter:</label>
          <input id="name" name="stringToMatch" type="text" required
            onChange={this.handleChange}
            value={this.stringToMatch}
          />
          <button type="button" onClick={this.handleSubmit}>
            filter
          </button>
        </form>
        </div>
      </div>
    );
  }
}

