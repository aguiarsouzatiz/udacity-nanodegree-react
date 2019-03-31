import React from 'react';

export default ({ items = [], remove, toggle }) => (
  <ul>
    {items.map(item => (
      <li
        key={item.id}
      >
        <span
          style={item.complete ? { textDecoration: 'line-through' } : null}
          onClick={() => toggle && toggle(item.id)}
        >
          {item.name}
        </span>
        <button type="button" onClick={() => remove(item)}>x</button>
      </li>
    ))}
  </ul>
);
