const mongoose = require('mongoose')

const RegisterationSchema = new mongoose.Schema(
	{
		user: {type: mongoose.Schema.Types.ObjectId, required: true},
		fullName: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String, },
		address: { type: String, required: true },
		category: { type: String, default: 'N/A'},
		size: { type: String, default: 'N/A'},
		accommodation: { type: String, default: 'N/A'},
		location: { type: String, default: 'N/A' },
		lodging: { type: String, default: 'N/A' },
		amount: { type: String, required: true },
		delegates: { type : Array , "default" : [] }
	},
	{ collection: 'registeration' },
	{timestamps:true}
)

const Registeration = mongoose.model('RegisterationSchema', RegisterationSchema)

module.exports = Registeration