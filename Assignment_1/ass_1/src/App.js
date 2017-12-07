import React, { Component } from 'react';
import './App.css';
import UserOutput from './UserOutput/UserOutput';
import UserInput from './UserInput/UserInput';

class App extends Component {

  state = {
    username: "Fool"
  }

  nameEventHandler = (event) =>{
    this.setState({username:event.target.value})
  }

  render() {
    

    return (
      <div className="App">
        <UserInput
        currentname={this.state.username}
        changed={this.nameEventHandler}
        />
        <UserOutput
        username={this.state.username}
        />
      </div>
    );
  }
}

export default App;
