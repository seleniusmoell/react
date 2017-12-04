import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {
  state = {
    people: [
      {name: 'Tove', age: 32},
      {name: 'Manuel', age: 29},
      {name:'Steffi', age: 26}
    ]
  }

switchNameHandler = (newName) => {
 // console.log('Was clicked!');
 this.setState({
   people: [
    {name: newName, age: 32},
    {name: 'Manuel', age: 29},
    {name:'Steffi', age: 26}
   ]
 })
}

nameChangedHandler = (event) => {
  this.setState({
    people: [
     {name: 'Tove', age: 32},
     {name: event.target.value, age: 29},
     {name:'Steffi', age: 26}
    ]
  })
}

  render() {
    const style = {
        backgroundColor: 'white',
        font: 'inherit',
        border: '1px solid blue',
        padding: '8px',
        cursor: 'pointer'
    };
    return (
      <div className="App">
        <h1>Hi, I'm a React App </h1>
        <p>This is really working!</p>
        <button 
          style={style}
          onClick={() => this.switchNameHandler('August')}>Switch name</button>
        <Person 
          name={this.state.people[0].name}
          age={this.state.people[0].age}/>
        <Person 
          name={this.state.people[1].name}
          age={this.state.people[1].age}
          click={this.switchNameHandler.bind(this, 'Henry')}
          changed={this.nameChangedHandler}> My Hobbies: Racing </Person> 
        <Person 
          name={this.state.people[2].name}
          age={this.state.people[2].age}/>
      </div>
    );
    // return React.createElement('div', null, React.createElement('h1', {className: 'App'}, 'Does this work now?'));
  }
}

export default App;
