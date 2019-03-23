import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import MovieCardList from './components/MovieCardList';
import data from './data/data-index';
/*
Display a list of movies where each movie contains a list of users that favorited it.

For detailed instructions, refer to instructions.md.
*/

class App extends Component {
  render() {
    return (
      <Fragment>
          <header className="ant-layout-header">
            <div className="ant-row-flex ant-row-flex-center">
                <figure>
                <img src={logo} className="app-logo" alt="logo" />
                </figure>
                <h2 className="app-title">ReactND - Coding Practice</h2>
            </div>
          </header>
          <main style={{padding: '36px'}}>
              <h2 style={{textAlign: 'center'}}>How Popular is Your Favorite Movie?</h2>
              <MovieCardList data={data}/>
          </main>
		</Fragment>
    );
  }
}

export default App;
