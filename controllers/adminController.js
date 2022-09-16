const User = require('../models/users');
const Registeration = require('../models/registeration');

const getUsers = async (req, res) => {
    // const { email } = req.body;

    try{
        const users = await User.find({}).exec();
        if (!users) return res.status(401).json({ 'message': 'There are currently no users on this platform' }); 

        res.json({ users });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
    
}

const getRegistrations = async (req, res) => {
    // const { email } = req.body;

    try{
        const registrations = await Registeration.find({}).exec();
        if (!registrations) return res.status(401).json({ 'message': 'No user is currently registered' }); 

        res.json({ registrations });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
    
}


module.exports = { getUsers, getRegistrations };