const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema(
{
	user: {type: Schema.Types.ObjectId, ref: 'User'}
	text: {type: String, required: true},
	image: String,
	video: String,
	url: String
});

const Message = new mongoose.model('Message', messageSchema);

module.exports = Message;