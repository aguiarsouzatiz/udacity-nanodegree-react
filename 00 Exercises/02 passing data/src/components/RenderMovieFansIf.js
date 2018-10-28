import React, { Fragment } from 'react';
import FavoriteStatus from './FavoriteStatus';
import NoFanStatus from './NoFanStatus';
import MovieFansList from './MovieFansList';

const RenderMovieFansIf = ({dataMatchTo}) => (
  dataMatchTo.length === 0 ? (
    	<Fragment>
    		<FavoriteStatus amount={dataMatchTo.length} />
       		<NoFanStatus />
  		</Fragment>
	) : (
    	<Fragment>
    		<FavoriteStatus amount={dataMatchTo.length} />
       		<MovieFansList fans={dataMatchTo} />
  		</Fragment>
    )
)

export default RenderMovieFansIf;