import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from './List';
import Loading from './Loading';
import { actionToAddTodoAsync, actionToRemoveTodoAsync, actionToToggleTodoAsync } from '../actions/todos';
import { setInputOnSuccessAsync, setInputOnFailAsync } from '../utils/asyncEvents';

class Todos extends Component {
  addItem = (event) => {
    event.preventDefault();

    const name = this.todoName.value;

    this.props.dispatch(
      actionToAddTodoAsync(
        name,
        setInputOnSuccessAsync(this.todoName),
        setInputOnFailAsync(this.todoName, name),
      ),
    );
  }

  removeItem = (item) => {
    this.props.dispatch(actionToRemoveTodoAsync(item));
  }

  toggleItem = (id) => {
    this.props.dispatch(
      actionToToggleTodoAsync(id),
    );
  }

  render() {
    const { todos, isLoading } = this.props;

    return (
      <section>
        <h2>To do list</h2>
        <input
          type="text"
          placeholder="Add todo"
          ref={input => this.todoName = input}
        />
        <button type="button" onClick={this.addItem}>Add todo</button>
        {isLoading ? (
          <Loading />
        ) : (
          <List
            items={todos}
            remove={this.removeItem}
            toggle={this.toggleItem}
          />
        )}
      </section>
    );
  }
}

export default connect(storeState => ({
  todos: storeState.todos,
  isLoading: storeState.loading,
}))(Todos);
