const passport = require('passport');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bodyParser = require('body-parser');


exports.register = async (req, res, next) => {
    const user = new User({ email: req.body.email, name: req.body.name, type: req.body.type });
    result = await User.register(user, req.body.password).then(
        async (user) => {
            console.log(user)
            next()
        }
    )
    res.json(result)
}

exports.login = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                message: 'Something is not right with your input'
            });
        }
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }
            req.login(user, { session: false }, (err) => {
                if (err) {
                    res.send(err);
                }
                // generate a signed son web token with the contents of user object and return it in the response
                const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, 'ILoveMoStore', {
                    expiresIn: 3600
                });
                return res.json({ user, token });
            });
        })(req, res);
    }
    catch (err) {
        console.log(err);
    }
};

exports.logout = (req, res) => {
    req.logout();
}

exports.isLoggedIn = (req, res, next) => {
    passport.authenticate('jwt', { session: false })
}