import React, { Component, Fragment }  from 'react';
import Form from './Form';
import ItemsList from './ItemsList';
import InputText from './InputText';
import Button from './Button';

class ShoppingList extends Component {

    state = {
      value: '',
      items: [],
    };

    handleChange = event => {
      this.setState({ value: event.target.value });
    };

    addItem = event => {
      event.preventDefault();
      this.setState(oldState => ({
        items: [...oldState.items, this.state.value],
      }));
    };

    deleteLastItem = event => {
      this.setState(prevState => ({ items: this.state.items.slice(0, -1) }));
    };

    inputIsEmpty = () => {
      return this.state.value === '';
    };

    noItemsFound = () => {
      return this.state.items.length === 0;
    };

    render() {
        return (
              <Fragment>
                  <h2>Shopping List</h2>
                  <Form onSubmit={this.addItem}>
                    <InputText
                      placeholder="Enter New Item"
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                    <Button disabled={this.inputIsEmpty()}>Add</Button>
                  </Form>

                  <Button onClick={this.deleteLastItem} disabled={this.noItemsFound()}>
                    Delete Last Item
                  </Button>

                  <p className="items">Items</p>
                  <ItemsList
                    list={this.state.items}
                    type={'ordered'}
                  />
                </Fragment>
          )
      }
}

export default ShoppingList;