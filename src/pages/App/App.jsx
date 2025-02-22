import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import Landing from '../Landing/Landing'
import * as authService from '../../services/authService'
import ProfileList from '../ProfileList/ProfileList'
import ProfileDetails from '../ProfileDetails/ProfileDetails'
import * as profileAPI from '../../services/profileService'
import BookSearch from "../BookSearch/BookSearch";
import BookDetails from '../BookDetails/BookDetails'
// import * as bookAPI from '../../services/bookService'

class App extends Component {
	state = {
    user: authService.getUser(),
    userProfile: null
  }

  async componentDidMount() {
    if (!this.state.userProfile) {
      const userProfile = await profileAPI.getUserProfile()
      this.setState({userProfile})
    }
  }

	handleLogout = () => {
    authService.logout();
    this.setState({ user: null, userProfile: null });
		console.log(this.state)
    this.props.history.push("/");
  };

	async componentDidMount() {
    if (!this.state.userProfile) {
      const userProfile = await profileAPI.getUserProfile()
      this.setState({userProfile})
    }
  }

  handleSignupOrLogin = async () => {
    this.setState({ user: await authService.getUser(), userProfile: await profileAPI.getUserProfile()});
  };

	handleFriend = async (friendId) => {
    const updatedProfile = await profileAPI.friendAndUnfriend(friendId)
    this.setState({userProfile: updatedProfile})
  }

	handleAddBook = async (book,collection) => {
    const updatedProfile = await profileAPI.addBook(book,collection)
    this.setState({userProfile: updatedProfile})
  }

  handleRemoveBook = async (api_id,collection)=> {
    const updatedProfile = await profileAPI.removeBook(api_id,collection)
    this.setState({userProfile: updatedProfile})
  }

	render() {
		const { user, userProfile } = this.state
		return (
			<>
				<NavBar user={user} userProfile={userProfile} history={this.props.history} handleLogout={this.handleLogout} />
				<Route exact path='/'>
          <Landing user={user} />
        </Route>
				<Route exact path='/signup'>
          <Signup history={this.props.history} handleSignupOrLogin={this.handleSignupOrLogin}/>
        </Route>
				<Route exact path='/login'>
          <Login handleSignupOrLogin={this.handleSignupOrLogin} history={this.props.history}/>
        </Route>
				<Route exact path="/users" render={() =>
					authService.getUser() ?
					<ProfileList 
						userProfile={userProfile}
						// Pass the functions as props to this component
						handleFriend={this.handleFriend}
					/> : <Redirect to="/login" />
				}/>
				<Route exact path="/profile" render={({ location }) =>
					authService.getUser() ?
					<ProfileDetails 
						userProfile={userProfile}
						location={location}
					/> : <Redirect to="/login" />
				}/>
			 <Route
          exact
          path="/search/:query"
          render={({ match }) =>
            authService.getUser() ? (
              <BookSearch
                match={match}
                userProfile={userProfile}
                handleAddBook={this.handleAddBook}
              />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
				<Route exact path='/books/:id' render={({ match }) => 
          authService.getUser() ?
            <BookDetails 
              match={match}
              userProfile={userProfile}
							handleAddBook={this.handleAddBook}
							handleRemoveBook={this.handleRemoveBook}
							handleSelect={this.handleSelect}
            /> : <Redirect to='/login' />
        }/>
			</>
		)
	}
}

export default App
