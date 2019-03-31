import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from './List';
import Loading from './Loading';
import { actionToAddGoalAsync, actionToRemoveGoalAsync } from '../actions/goals';
import { setInputOnSuccessAsync, setInputOnFailAsync } from '../utils/asyncEvents';

class Goals extends Component {
  addItem = (event) => {
    event.preventDefault();

    const name = this.goalName.value;

    this.props.dispatch(actionToAddGoalAsync(
      name,
      setInputOnSuccessAsync(this.goalName),
      setInputOnFailAsync(this.goalName, name),
    ));
  }

  removeItem = (item) => {
    this.props.dispatch(actionToRemoveGoalAsync(item));
  }

  render() {
    const { goals, isLoading } = this.props;

    return (
      <section>
        <h2>Goals</h2>
        <input
          type="text"
          placeholder="Add goal"
          ref={input => this.goalName = input}
        />
        <button type="button" onClick={this.addItem}>Add goal</button>
        {isLoading ? (
          <Loading />
        ) : (
          <List
            items={goals}
            remove={this.removeItem}
          />
        )}
      </section>
    );
  }
}

export default connect(storeState => ({
  goals: storeState.goals,
  isLoading: storeState.loading
}))(Goals);
