import React, { Component } from 'react';
import './App.css';
import President from '../president/president'


class App extends Component {
  constructor(props) {
    super(props)
    this.onUpdate = this.onUpdate.bind(this);
    this.state = {data: []}

}

  onUpdate = (val) => {
   this.setState({
     data: val
   })
  };

  fetchData = () => {
  fetch("http://localhost:5000/fetch_presidents", {
    method: "GET",
    dataType: "JSON",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((resp) => {
    return resp.json()
  })
  .then((data) => {
    this.setState({ data: data.result.data })
  })
  .catch((error) => {
    console.log(error, "catch the hoop")
  })
}


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Presidents of USA </h1>
        </header>
        <div>
        <button onClick={() => this.fetchData()} className="button-align">click here to load presidents data</button>
        <President data = {this.state.data} onUpdate={this.onUpdate}/>
        </div>
      </div>
    );
  }
}

export default App;
