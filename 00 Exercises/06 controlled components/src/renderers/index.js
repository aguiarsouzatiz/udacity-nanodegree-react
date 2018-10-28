import React from 'react'

function rendeEachItemIn(list) {
	return ({byTag: (name) => list.map((item, index) => (
    	React.createElement(name, {key: index}, item)
    ))})
}

export {
	rendeEachItemIn
}