import React, { Component } from 'react';
import './App.css';
import users from './data/users';
import movies from './data/movies';
import profiles from './data/profiles';
import Header from './components/Header';
import ContactList from './components/ContactList';
/*
Use React and the data below to display a list of users alongside their favorite movies.

For detailed instructions, refer to instructions.md.
*/
// console.log(users)

 //   id: 1,
//    userID: '1',
 //   favoriteMovieID: '1',

// const Profile = () => ()


class App extends Component {
  render() {
    return (
      <div className="uk-background-muted">
		<Header />
        <h2 className="uk-text-lead uk-text-uppercase uk-title uk-text-center">Favorite Movies</h2>
		<section className="uk-container">
			<ContactList data={{profiles, users, movies}} />
		</section>
      </div>
    );
  }
}

export default App;
