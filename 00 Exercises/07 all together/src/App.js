import React, { Component, Fragment } from 'react';
import Header from './components/Header';
//import UsersManager from './components/UsersManager';
// import './App.css';

/*
This exercise will help you put together and practice all of the concepts you've
learned thus far. It will also help you form a strong foundational knowledge of
React and prepare you for your first project.

The instructions for this project are located in the `instructions.md` file.
*/

const EmptyList = () => (
	<div className="center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
  		<h4 className="">Hi, there is no users registered yet</h4>
  		<p className="">Lets try to insert one.</p>
	</div>
)

const UserRow = ({
		data: { username, firstName, lastName, gamesPlayed },
		gamesPlayedStatus
	}) => (
      <tr>
          <td className="pv3 pr3 w3 bb b--black-20">
              <img src="https://tachyons.io/img/logo.jpg" className="br-100 pa1 ba b--black-10 h2 w2" alt="avatar" />
          </td>
          <td className="pv3 pr3 bb b--black-20">{firstName} {lastName}</td>
          <td className="pv3 pr3 bb b--black-20">{username}</td>
          {gamesPlayedStatus && <td className="pv3 pr3 bb b--black-20">{gamesPlayed}</td> }
      </tr>
)

const TableHeaderRow = ({gamesPlayedStatus}) => (
			<tr>
				<td className="fw6 bb b--black-20 tl pb3 pv3">Avatar</td>
				<td className="fw6 bb b--black-20 tl pb3 pv3">Name</td>
        <td className="fw6 bb b--black-20 tl pb3 pv3">Username</td>
        {gamesPlayedStatus && <td className="fw6 bb b--black-20 tl pb3 pv3"># games played</td> }
      </tr>
)

const UsersTable = ({data: users, gamesPlayedStatus: showStatus}) => (
	<table className="f6 w-100 center">
  		<thead>
			  <TableHeaderRow gamesPlayedStatus={showStatus}/>
  		</thead>
  		<tbody>
			{users.map( user =>
				<UserRow
             		key={user.id}
					data={user}
					gamesPlayedStatus={showStatus}
				/>)
			}
  		</tbody>
	</table>
)

const TableActions = ({openAddUserLightbox, handleGamesPlayedStatus}) => (
	<div className="flex justify-between items-center">
		<button
			className="f6 no-underline br-pill ph3 pv2 mb2 dib white bg-black"
			onClick={openAddUserLightbox}
		>
			Add user
		</button>
		<div className="flex items-center mb2">
			<label className="lh-copy mr2" htmlFor="games-played-visibility">show games played</label>
			<input
				id="games-played-visibility"
				className="mr2"
				type="checkbox"
				value="Show games played"
				onChange={()=>handleGamesPlayedStatus(true)}
			/>
		</div>
	</div>
)

const Input = ({...props}) => (
	<input
		className="input-reset ba br2 b--black-20 pa2 mb2 db w-100"
  		{...props}
   />
)

function checkAllTruthyFrom(arrayValues) {
	return arrayValues.every(value => value)
}

function getOpposityOf(validation) {
	return !validation
}

class AddUserLightbox extends Component {

	state = {
		isUniqueUsername: true,
      	inputValues: {
        	firstName: '', lastName: '', username: ''
        }
    }

	handleEscType = (handleOpen) => (event) => {
    	if (event.keyCode === 27) {
        	handleOpen(false)
        }
    }

	componentDidMount() {
    	document.addEventListener('keydown', this.handleEscType(this.props.handleOpen), false)
    }

	componentWillUnmount() {
    	document.removeEventListener('keydown', this.handleEscType(this.props.handleOpen), false)
    }

	updateAllInputFillState = (userField) => (event) => {
      	const inputValue = event.target.value
		this.updateSpecificInputOf(userField).by(inputValue)
      	if (userField === 'username') {
          	const { uniqueUsernames } = this.props
            uniqueUsernames.includes(inputValue) ? (
              	this.setState({isUniqueUsername: false})
            ) : (
            	this.setState({isUniqueUsername: true})
            )
        }
    }

	updateSpecificInputOf = (userField) => ({
      'by': (stateValue) => {
      	this.setState( previousState => ({
          inputValues: { ...previousState.inputValues, [userField]: stateValue }
        }))
      }
    })

	setNewUser = (event) => {
      	event.preventDefault()
		this.props.newUserData(this.state.inputValues)
        this.props.handleOpen(false)
    }

	render() {
		const { handleOpen } = this.props
		const { inputValues, isUniqueUsername } = this.state
		const untilIsBlockToAddUser = getOpposityOf(checkAllTruthyFrom(Object.values(inputValues).concat(isUniqueUsername)))

		return (
      <section className="absolute top-0 z-5 left-0 w-100 vh-100 bg-white">
        <form onSubmit={this.setNewUser} className="flex flex-column h-100 center justify-center mw6">
          <label htmlFor="name" className="f6 b db mb2">First Name</label>
          <Input
            id="firstName"
            type="text"
            placeholder="First name"
            onChange={this.updateAllInputFillState('firstName')}
          />
          <small className="f6 black-60 db mb2">Helper text for the form control.</small>
          <label htmlFor="lastName" className="f6 b db mt4 mb2">Last Name</label>
          <Input
            id="lastName"
            type="text"
            placeholder="Last name"
            onChange={this.updateAllInputFillState('lastName')}
          />
          <small className="f6 black-60 db mb2">Helper text for the form control.</small>
          <label htmlFor="username" className="f6 b db mt4 mb2">Last Name</label>
          <Input
            id="username"
            type="text"
            placeholder="username"
            onChange={this.updateAllInputFillState('username')}
          />
          { isUniqueUsername ? (
              <small className="f6 black-60 db mb2">Try some awesome username.</small>
            ) : (
              <small className="f6 black-60 db mb2">This usernames has already been taken.</small>
          )}
          <footer className="mt4">
            <button
              className="f6 no-underline br-pill ph3 pv2 mb2 dib black bg-white ba bw1"
              onClick={() => handleOpen(false)}
              type="button"
            >
              Cancel
            </button>
            <button disabled={untilIsBlockToAddUser}
              className="f6 no-underline br-pill ph3 pv2 mb2 dib white bg-black"
              type="submit"
            >
              Add user
            </button>
          </footer>
        </form>
      </section>
      )
    }
}

class UsersManager extends Component {

	state = {
		users: [],
    uniqueUserNames: [],
		showGamesPlayedStatus: true,
		showAddUserLightbox: false
	}

	componentDidMount() {
      const initialUsers = this.props.data
      const initialUniqueUserNames = this.updateUniqueUsernamesList(initialUsers)
    	this.setState({
      	users: initialUsers,
			  uniqueUserNames: initialUniqueUserNames
    	})
    }

	changeGamesPlayedStatus = () => {
		this.setState( previousState =>({
        	showGamesPlayedStatus: !previousState.showGamesPlayedStatus
        }))
	}

	handleOpenAddUserLightbox = (openState) => {
      const uniqueUserNamesToValidate = this.updateUniqueUsernamesList(this.state.users)
    	this.setState(previousState => ({
          showAddUserLightbox: openState,
          uniqueUserNames: uniqueUserNamesToValidate
        }))
    }

	setNewUser = (userData) => {
      const usersAmount = this.state.users.length
    	this.setState(previousState => ({
          users: previousState.users.concat(
            {...userData, gamesPlayed: 0, id: usersAmount + 1}),
        }))
    }

	updateUniqueUsernamesList = (users) => {
    	return users.map(({username}) => username)
    }

	render() {
          const { users, showAddUserLightbox, showGamesPlayedStatus, uniqueUserNames } = this.state

          return (
              <section className="w-80 center mt4">
                  { showAddUserLightbox &&
                    <AddUserLightbox
                      handleOpen={this.handleOpenAddUserLightbox}
                      newUserData={this.setNewUser}
                      uniqueUsernames={uniqueUserNames}
                    />
                  }
                  <TableActions
                    handleGamesPlayedStatus={this.changeGamesPlayedStatus}
                    openAddUserLightbox={this.handleOpenAddUserLightbox}
                  />
                  { users.length === 0 ? (
                      <EmptyList />
                    ) : (
                      <UsersTable
                        data={users}
                        gamesPlayedStatus={showGamesPlayedStatus}
                      />
                    )
                  }
              </section>
        )
	  }
}

const App = () =>  (
  <Fragment>
		<Header />
		<UsersManager data={[
  		{id: 0, username: 'uuid', firstName: 'name', lastName: 'endname', gamesPlayed: 0},
			{id: 1, username: 'uuidddd', firstName: 'namess', lastName: 'lost', gamesPlayed: 0}
		]}/>
  </Fragment>
);


export default App;
