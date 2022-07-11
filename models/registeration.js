const mongoose = require('mongoose')

const RegisterationSchema = new mongoose.Schema(
	{
		user: {type: mongoose.Schema.Types.ObjectId, required: true},
		fullName: { type: String, required: true },
		email: { type: String, required: true, unique: true},
		phone: { type: Number, },
		address: { type: String, required: true },
		category: { type: String, default: 'N/A'},
		size: { type: String, default: 'N/A'},
		accomodation: { type: String, default: 'N/A'},
		delegates: [
			{
				fullName: { type: String, required: true },
				email: { type: String, required: true, unique: true},
				phone: { type: Number, },
				address: { type: String, required: true },
				category: { type: String, required: true },
				size: { type: String, default: 'N/A'},
				accomodation: { type: String, default: 'N/A'}
			}
		]
	},
	{ collection: 'registeration' }
)

const Registeration = mongoose.model('RegisterationSchema', RegisterationSchema)

module.exports = Registeration