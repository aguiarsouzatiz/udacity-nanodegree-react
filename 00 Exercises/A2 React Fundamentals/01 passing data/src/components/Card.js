import React from 'react';

const Card = ({name, userName, favoriteMovieName}) => (
	<div className="uk-grid-margin">
  		<div className="uk-card uk-card-hover uk-card-default">
           	<div className="uk-card-body">
                 <header className="uk-grid">
						<div className="uk-width-1-5@m">
                          <i className="far fa-user"></i>
                      	</div>
						<div className="uk-width-4-5@m uk-padding-remove-left">
                        	<h5 className="uk-width-1-1@m uk-margin-remove-bottom">{name}</h5>
                        	<p className="uk-text-meta uk-margin-remove-top">@{userName}</p>
                      	</div>
                </header>
				<hr className="uk-divider-icon" />
                <div className="uk-text-center">
                   <p className="uk-text-meta uk-text-small uk-margin-small-bottom">Favorite movie</p>
                   <p className="uk-text-lead uk-margin-remove-bottom uk-margin-small-top">{favoriteMovieName}</p>
                </div>
           	</div>
		</div>
  	</div>
)

export default Card;