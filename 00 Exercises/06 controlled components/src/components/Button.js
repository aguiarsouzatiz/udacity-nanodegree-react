import React from 'react';

const Button = ({onClick, disabled, children}) => (
	<button onClick={onClick} disabled={disabled}>
		{children}
	</button>
)

export default Button;