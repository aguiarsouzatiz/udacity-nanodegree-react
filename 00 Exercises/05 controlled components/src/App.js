import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function setTextNotEmptyBy(value, defaultEmpty='...') {
	return value.length > 0 ? value : defaultEmpty
}

const initialText = 'This should mirror the text you typed into the input field'

class App extends Component {

  state = {
    inputMirror: initialText
  }

  mirrorTyping = (event) => {
	const value = setTextNotEmptyBy(event.target.value, initialText)
    this.setState({inputMirror: value})
  }

  render() {

    const { inputMirror } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactND - Coding Practice</h1>
        </header>
        <div className="container">
          <input type="text" placeholder="Say Something" onChange={this.mirrorTyping}/>
          <p className="echo">Echo:</p>
          <p>{inputMirror}</p>
          <p></p>
        </div>
      </div>
    );
  }
}

export default App;
