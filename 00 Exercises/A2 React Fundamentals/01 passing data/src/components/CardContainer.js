import React from 'react';

const CardContainer = ({data, children}) => (
	<section className="uk-grid uk-grid-medium uk-child-width-1-3@s uk-flex-left">
		{children({data: data})}
	</section>
)

export default CardContainer;