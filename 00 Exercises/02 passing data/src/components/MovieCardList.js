import React from 'react';
import MovieCard from './MovieCard';

function renderCardsBy({data: {movies, profiles, users}}) {
	return (
    	Object.values(movies).map(({id, name}) => (
              <article key={id} className="ant-col-8" style={{padding: '8px'}}>
                  <MovieCard
                      movieData={{id, name}}
                      fansData={{profiles, users}}
                  />
              </article>
          ))
    )
}

const MovieCardList = ({data}) => (
	<section className="ant-row-flex ant-row-flex-center ant-row-flex-middle">
  		{renderCardsBy({data})}
	</section>
)

export default MovieCardList;