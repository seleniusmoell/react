import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let stuff;

function Banan(props) {
  return (
    <h3>{props.namn} är också bäst</h3>
  )
}

let Frukt = (props) => {
  return (
    <h2>{props.frukt} är {props.stuff}</h2>
  )
}

let Timer = (props) => {

  getSystemTime = () => {
    console.log("the time is", new.Date())
    new Date().getHours()
  }

  return (
    <div className="Timer-Container">
      <div>0 </div>
      <div>0 </div>
      <div>0 </div>
      <div>0 </div>
    </div>
  )
}

class Advanced extends React.Component {
  state = {}

  componentDidMount() {
    this.setState({
      name: "Tove",
      clicked: false
    })

  }

  clickMe = () => {
    console.log(this.state)

    if (this.state.clicked === true) {
      this.setState({
        name: "Birger"
      })
    } else {
      this.setState({
        name: "Viktor",
        clicked: true
      })
    }
 
  }

  render() {

    const name = this.state.name

    return (
      name ? 
      
      <div>
      <h1>Hello {name} </h1>   
      <button onClick={this.clickMe}>Tove är bäst</button>
      </div>
      : 
      <h1>Hello advanced</h1>
    )
  }

}



function App() {

  if (stuff && stuff.sub && stuff.sub.subsub) {

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Timer/>
        <p>
          Viktor är bäst
        </p>
        <Advanced/>
        <Banan namn="Birger"/>
        <Frukt frukt="Banan" stuff="gott"/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
