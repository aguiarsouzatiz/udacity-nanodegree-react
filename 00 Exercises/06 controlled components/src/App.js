import React from 'react';
import Header from './components/Header'
import ShoppingList from './components/ShoppingList';
import './App.css';

const App = () => (
  <main className="App">
  	<Header title={'ReactND - Coding Practice'}/>
    <ShoppingList />
  </main>
)

export default App;
