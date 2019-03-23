function getComparableMovieAndUserData({id, currentProfile}) {
	return {
    	movieId: id.toString(),
		currentMovieIdFavorited: currentProfile['favoriteMovieID'],
		currentProfileUserId: currentProfile['userID']
    }
}

function getUserFanIn(currentProfileUserId, users) {
	return {name: users[currentProfileUserId]['name'],
            id: currentProfileUserId}
}

function extractUsersFansBy({id, profiles, users}) {
  return profiles.reduce((result, currentProfile) => {
    const {movieId, currentMovieIdFavorited, currentProfileUserId} = getComparableMovieAndUserData({id, currentProfile})

    return movieId === currentMovieIdFavorited ? (
      			result.concat(getUserFanIn(currentProfileUserId, users))
    		  ) : (
      			result
    		  )
  }, [])
}

export {
	getComparableMovieAndUserData,
	getUserFanIn,
	extractUsersFansBy
}