import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {

  state = {
    boxText: "Type anything here",
    textLength: 18,
    charComponents: [{id: 0, char: ''}],
    showCharComponents: false
  }

  textBoxEventHandler = ( event ) => {
    const newText = event.target.value;
    let len = newText.length;
    let charArray = newText.split();
    let charComps = [...this.state.charComponents];
    let currentIndex = this.state.charComponents[this.state.charComponents.length -1].id;

    charArray.forEach(element => {
      currentIndex += 1; 
      charComps.push([{id:currentIndex, char: element}]);
    });

    this.setState({boxText:newText});
    this.setState({textLength:len});
    this.setState({charComponents:charComps});
    
    if(currentIndex > 0){
      this.setState({showCharComponents:true});
    }
  }

  deleteCharComponentHandler = ( index ) => {
    const charComps = [...this.charComponents];
    if (index > 0){
      charComps.splice(index, 1);
      this.setState({charComponents:charComps});
    }
  }

  render() {

    let textLength = null;

    textLength = (
      <div>
        {this.state.textLength}
        </div>
    );

    let charComponents = null;

    if(this.state.showCharComponents){
      charComponents = (
        <div>
          {this.state.charComponents.map((component, index) => {
          return <CharComponent
          click={() => {this.deleteCharComponentHandler(index)}}
          letter={component.char}
          />
          })}
        />
        </div>
      )
    }

    return (
      <div className="App">

        <UserInput
        currentText={this.state.boxText}
        changed={this.textBoxEventHandler}
        />

        {textLength}

        <ValidationComponent 
        len ={this.state.textLength}
        />

        {charComponents}

          <h1 className="App-title">Assignment 2</h1>
          <ol>
            <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
            <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
            <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
            <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
            <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
            <li>When you click a CharComponent, it should be removed from the entered text.</li>
          </ol>
          <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
        </div>
    );
  }
}

export default App;
