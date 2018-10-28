import React from 'react';

const InputText = ({placeholder, value, onChange}) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
  	onChange={onChange}
  />
)

export default InputText;