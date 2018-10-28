import React from 'react';
import { extractUsersFansBy } from '../selectors/data-selectors';
import RenderMovieFansIf from './RenderMovieFansIf';

const MovieCard = ({movieData: {id, name}, 
                    fansData: {profiles, users}}) => (
		<div className="ant-card">
			<div className="ant-card-head">
				<h4 className="ant-card-head-title" style={{marginBottom: '0'}}>{name}</h4>
			</div>
			<div className="ant-card-body">
				<RenderMovieFansIf dataMatchTo={extractUsersFansBy({id, profiles, users})}/>
			</div>
		</div>
)

export default MovieCard