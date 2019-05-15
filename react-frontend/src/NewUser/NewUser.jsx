import React, {Component} from 'react';

import NewUserForm from './NewUserForm/NewUserForm';

import './NewUser.css';

class NewUser extends Component
{
	constructor()
	{
		super();
		this.state =
		{
			//STUFF
		};
	}

	handleSubmit = (input, e) =>
	{
		e.preventDefault();
		//console.log("handleSubmit on NewUser was called");
		//console.log(input);


		//here's where we make the POST request to create a new user:

		const submitURL = this.props.apiURL + "/users";
		
		fetch(submitURL, {
			method: 'POST',
			body: JSON.stringify(input),
		    headers: {"Content-Type": "application/json"}
		});
	}

	render()
	{
		return(
			<div className="newUserContainer">
				<h3>Register</h3>
				<NewUserForm handleSubmit={this.handleSubmit}></NewUserForm>
			</div>
		);
	}
}

export default NewUser;