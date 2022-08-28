const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sendMail = require('../util/sendMail')

const handleNewUser = async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) return res.status(400).json({ 'message': 'All fields are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ email }).exec();
    if (duplicate) return res.status(409).json({ 'message': 'This email is already registered' }); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        const result = await User.create({
            "fullName": fullName,
            "email": email,
            "password": hashedPwd
        });

        console.log(result);

        sendMail(email, "Welcome to APEN", `You have successfully created an account on APEN portal. Here are your login details: Email: ${email} Password: ${password}`)
        res.status(201).json({ 'success': `New user ${fullName} created!` });
        

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return res.sendStatus(401).json({ 'message': 'Invalid login credentials' }); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            { "email": foundUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        console.log(refreshToken);
        // Saving refreshToken with current user
        let user = await User.findOneAndUpdate({ email }, { refreshToken }, { new: true });
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ user });
    } else {
        res.sendStatus(401).json({ 'message': 'Invalid login credentials' });
    }
}

module.exports = { handleLogin, handleNewUser };