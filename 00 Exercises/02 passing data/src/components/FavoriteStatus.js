import React from 'react';
import FavoriteIcon from './FavoriteIcon';

function setAnswerByFans(amount) {
  	const amountAnswerType = amount >= 2 ? 'n' : amount
	return {
    	0: 'no fan like it yet',
      	1: `${amount} fan of this movie`,
      	n: `${amount} fans fo this movie`
    }[amountAnswerType]
}

const FavoriteStatus = ({amount}) => (
	<p>
        <FavoriteIcon />
  		<span>{setAnswerByFans(amount)}</span>
	</p>
)

export default FavoriteStatus;