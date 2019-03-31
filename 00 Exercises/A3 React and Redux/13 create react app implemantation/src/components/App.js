import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchInitialDataAsync } from '../actions/data';
import ConnectedTodos from './Todos';
import ConnectedGoals from './Goals';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchInitialDataAsync());
  }

  render() {
    return (
      <React.Fragment>
        <ConnectedTodos />
        <ConnectedGoals />
      </React.Fragment>
    );
  }
}

export default connect()(App);
