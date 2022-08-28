const User = require('../models/users');
const bcrypt = require('bcrypt');

const getUser = async (req, res) => {
    const { email } = req.body;

    try{
        const user = await User.findOne({ email }).exec();
        if (!user) return res.status(401).json({ 'message': 'This user does not exist' }); 

        res.json({ user });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
    
}

const changePassword = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return res.status(401).json({ 'message': 'Email is not valid.' }); //Unauthorized 
    // evaluate password 
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        let user = await User.findOneAndUpdate({ email }, { password: hashedPwd }, { new: true });

        console.log(user);

        res.status(200).json({ 'success': `This user ${fullName} has successfully updated their password!` });
        

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { getUser, changePassword };