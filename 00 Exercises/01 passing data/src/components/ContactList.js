import React, {Fragment} from 'react';
import CardContainer from './CardContainer';
import Card from './Card';

const ContactList = ({...props}) => (
	<CardContainer {...props}>
        {({data: {profiles, users, movies}}) => (
            <Fragment>
                {profiles.map(({id, userID, favoriteMovieID}) => (
                    <Card 
                      key={id}			
                      name={users[userID]['name']}
                      userName={users[userID]['userName']}
                      favoriteMovieName={movies[favoriteMovieID]['name']}
                    />)
                )}
            </Fragment>
        )}
    </CardContainer>
)

export default ContactList;