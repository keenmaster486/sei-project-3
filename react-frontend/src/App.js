import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import NewUser from './NewUser/NewUser';
import Login from './Login/Login';

import ChatBox from './ChatBox/ChatBox';

class App extends Component
{
	constructor()
	{
		super();
		this.state =
		{
			apiURL: "http://localhost:9000",
			loggedIn: {success: false}
		}
		this.getTest();
		//this.loginStatus();
	}

	getTest = async () =>
	{
		const test = await fetch('http://localhost:9000/');
		const testjson = await test.json();
		//console.log(await test.json());
		console.log(await testjson.text);

		this.setState(
		{
			text: await testjson.text
		});
	}

	// loginStatus = async () =>
	// {
	// 	const temp = await fetch(this.state.apiURL + "/auth/status");
	// 	if (temp == 'status: logged in')
	// 	{
	// 		this.setState(
	// 		{
	// 			loggedIn: 'logged in'
	// 		});
	// 	}
	// 	else
	// 	{
	// 		this.setState(
	// 		{
	// 			loggedIn: 'not logged in'
	// 		});
	// 	}
	// }

	changeState = (input, e) =>
	{
		this.setState(input);
	}

	logState = () =>
	{
		console.log(this.state);
	}

	logOut = (e) =>
	{
		e.preventDefault();
		this.setState(
		{
			loggedIn: {success: false}
		});
	}

	render()
	{
		return (
			<div className="App">
				<h1 onClick={this.logState}>ChatMeister 5000</h1>
				{this.state.loggedIn.success ?
					(
						<div>
							<ChatBox></ChatBox>
							<br/>
						</div>
					)
					:
					(
						<div>
						<b>Status:</b> {this.state.text}<br/>
							<div className="notLoggedInContainer">
								<NewUser apiURL={this.state.apiURL} changeState={this.changeState}></NewUser>
								<Login apiURL={this.state.apiURL} changeState={this.changeState}></Login>
							</div>
						</div>
					)
				}
				<div align='center' className='footer'>
					{this.state.loggedIn.success ? <div><button className="medFont" onClick={this.logOut}>Log Out</button></div> : ''}
					<i>This app was made using nothing but IBM Selectric typewriters</i>
				</div>
			</div>
		);
	}
}

export default App;
