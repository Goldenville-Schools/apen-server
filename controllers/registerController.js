const User = require('../models/users');
const Registeration = require('../models/registeration');

const sendMail = require('../util/sendMail')

const handleRegisteration = async (req, res) => {
    let { user } = req;
    
    try {
        
        user =  await User.findOne({ email: user });
        const registeration = await Registeration.findOne({ user: user._id });

        console.log(registeration);

        res.status(200).json({ registeration });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const handleRegister = async (req, res) => {
    let { user } = req;
    const { fullName, email, phone, address } = req.body;
    const category = req.body.category ? req.body.category : 'N/A';
    const size = req.body.size ? req.body.size : 'N/A';
    const accommodation = req.body.accommodation ? req.body.accommodation : 'N/A';
    let delegates = req.body.delegates ? req.body.delegates : [];
    if (!fullName || !email || !phone || !address) return res.status(400).json({ 'message': 'These fields are required.' });
    
    delegates.map(delegate => {
        delegate.fullName = delegate.fullName
        delegate.email = delegate.email
        delegate.phone = delegate.phone
        delegate.address = delegate.address
        delegate.category = delegate.category ? delegate.category : 'N/A';
        delegate.size = delegate.size ? delegate.size : 'N/A';
        delegate.accommodation = delegate.accommodation ? delegate.accommodation : 'N/A';
    })
    
    try {
        
        user =  await User.findOne({ email: user });

        //create and store the new registeration
        const result = await Registeration.create({
            "user": user._id,
            "fullName": fullName,
            "email": email,
            "phone": phone,
            "address": address,
            "category": category,
            "size": size,
            "accommodation": accommodation,
            "delegates": delegates
        });
        console.log(result);
        await User.findOneAndUpdate({ email: user.email }, { isRegistered: true });

        res.status(201).json({ 'success': `Registeration created!` });
        // sendMail(email, "APEN Conference Registeration", `Thank you for registering for this year's APEN conference. We look forward to meet you.`)
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}


module.exports = { handleRegisteration, handleRegister };