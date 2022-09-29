const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true },
		email: { type: String, required: true, unique: true},
		password: { type: String, required: true },
		isRegistered: {type: Boolean, default: false},
		refreshToken: {type: String}
	},
	{ collection: 'users' },
	{timestamps:true}
)

const Users = mongoose.model('UserSchema', UserSchema)

module.exports = Users