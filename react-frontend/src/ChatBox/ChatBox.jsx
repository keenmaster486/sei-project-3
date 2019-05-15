import React, {Component} from 'react';

import "./ChatBox.css";

class ChatBox extends Component
{
	constructor()
	{
		super();
		this.state =
		{
			//STUFF
			messages: []
		};
	}



	handleChange = (e) =>
	{
		e.preventDefault();
		this.setState(
		{
			[e.currentTarget.name]: e.currentTarget.value
		});
	}

	addMsg = (e) =>
	{
		e.preventDefault();
		const msgText = this.state.msgText;
		let msgImage = null;
		if (this.state.msgImage) {msgImage = this.state.msgImage;}
		
		const newMsg =
		{
			userid: null,
			userdisplayname: 'Person 1',
			text: msgText,
			image: msgImage,
			video: null,
			url: null
		};

		//Right here is where we should make a POST request to
		//the Express API to add the message to the current
		//group's message array

		this.setState(
		{
			msgText: '',
			msgImage: '',
			messages: [...this.state.messages, newMsg]
		});

		document.getElementById('msgtextbox').value = '';
		document.getElementById('imgtextbox').value = '';

	}

	render()
	{
		return(
			<div>
				<div className='chatboxcontainer'>
					<div className='chatbox'>
						<div className='spancontainer'>
							{
								this.state.messages.map((msg, index) =>
								{
									return(
										<span key={index} className='yourmsg'>
											<b>{msg.userdisplayname}:</b> {msg.text}
											{msg.image ? <div className='imgInsideMsgContainer'><a href={msg.image}><img className='imgInsideMsg' src={msg.image}></img></a></div> : ''}
										</span>
									);
								})
							}
						</div>
					</div>
				<form onSubmit={this.addMsg}>
					<textarea id='msgtextbox' onChange={this.handleChange} rows='5' cols='67' type='text' name='msgText' placeholder='Your message here'></textarea><br/>
					<input id = 'imgtextbox' onChange={this.handleChange} name='msgImage' placeholder='You can put an image link here'></input>
					<button type='submit'>Send</button>
				</form>
				</div>

				

			</div>
		);
	}
}





/*
<span className='person2'><b>Person 2:</b> Four score and seven years ago, our fathers brought forth upon this continent a new nation</span>
<span className='person1'><b>Person 1:</b> ksjdkfjdskfj</span>
<span className='person2'><b>Person 2:</b> yo</span>
<span className='person1'><b>Person 1:</b> hey</span>
<span className='person2'><b>Person 2:</b> yo</span>
<span className='person1'><b>Person 1:</b> hey</span>
<span className='person2'><b>Person 2:</b> yo</span>
<span className='person1'><b>Person 1:</b> hey</span>
<span className='person2'><b>Person 2:</b> yo</span>
<span className='person1'><b>Person 1:</b> hey</span>
<span className='person2'><b>Person 2:</b> yo</span>
<span className='person1'><b>Person 1:</b> hey</span>
<span className='person2'><b>Person 2:</b> yo</span>
<span className='person1'><b>Person 1:</b> hey</span>
*/





export default ChatBox;