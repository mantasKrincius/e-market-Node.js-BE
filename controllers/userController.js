const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User =require('../models/userModel')
const Session = require('../models/sessionModel')

const signUp = async (req, res) => {
    try {
        const user = new User({
            userName: req.body.userName,
            password: req.body.password,
        })

        let newUser = await user.save();
        res.send(newUser);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};

const signIn = async (req, res) => {
    console.log(User)
    console.log(req.body);
    try {
        let user = await User.findOne({
            userName: req.body.userName,
        });

        if (!user)
            throw {
                message: 'Wrong user name',
            };
        let passwordMatch = bcrypt.compareSync(req.body.password, user.password);

        console.log(passwordMatch, req.body.password, user.password);
        if (!passwordMatch)
            throw {
                message: 'Wrong user password',
            };

        let token = jwt.sign(
            {
                id: user._id,
                role: 'user',
            },
            process.env.JWT_PASSWORD,
        );

        let session = new Session({
            sessionToken: token,
            expires: new Date().setMonth(new Date().getMonth() + 1),
        });

        await session.save();

        res.header('userauth', token).send(user);
        console.log(user)
    } catch (e) {
        res.status(400).send(e);
    }
};

const logOut = async (req, res) => {
    try {
        let token = req.sessionToken;
        await token.remove();
        res.send({
            message: 'Success',
        });
    } catch (e) {
        res.status(400).send({
            message: 'Something went wrong',
        });
    }
};

const currentUser = (req, res) => {
    res.send(req.user);
};

module.exports = {
    signUp,
    signIn,
    currentUser,
    logOut
};