import React, { Fragment } from 'react';
import MovieFan from './MovieFan';

function renderConditionalCommaWith(index, allItems) {
  	const thisIndex = index + 1
    const total = allItems.length

	return thisIndex === total ? '' : ','
}

function renderFans({fans}) {
	return fans.map(({id, name}, index, allFans) => (
      	<Fragment>
      		<MovieFan key={id} name={name} />{renderConditionalCommaWith(index, allFans)}
		</Fragment>
    ))
}

const MovieFansList = ({fans}) => (
  <p>
  	{renderFans({fans})}
  </p>
)

export default MovieFansList;