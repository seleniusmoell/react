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
    const style = {
        width: '60%',
        textAlign: 'center',
        border: '1px solid #eee',
        padding: '8px'
    }

    return (
      <div className="App"
      style={style}>
        <UserInput
        username={this.state.username}
        changed={this.nameEventHandler}
        />
        <UserOutput
        username={this.state.username}
        changed={this.nameEventHandler}
        />
      </div>
    );
  }
}

export default App;
