import React from 'react';
import { setListTagBy } from '../selectors';
import { rendeEachItemIn } from '../renderers';

const ItemsList = ({list, type}) => (
  React.createElement(
    setListTagBy(type),
    {className:"item-list"},
    rendeEachItemIn(list).byTag('li')
  )
)

export default ItemsList;