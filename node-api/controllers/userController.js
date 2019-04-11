const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getusers = async (req, res) => {
    const user = await User.find()
    res.json(user);
}

exports.getuserByEmail = async (req, res) => {
    const user = await User.findOne({email: req.params.email})
    res.json(user);
}

exports.updateUser = async (req, res) => {
    const user = await User.findOneAndUpdate({ email: req.params.email }, req.body, {
        new: true,
        runValidators: true
    }).exec();
     res.json(user);
}

exports.deleteUser = async (req, res) => {
     await User.findOneAndRemove({email: req.params.email}).exec();
     res.json({message: 'User sucessfully deleted'});
}


exports.validateRegister = (req, res, next) => {
    req.sanitizeBody('name');
    req.checkBody('name', 'You must supply a name!').notEmpty();
    req.checkBody('email', 'That Email is not valid!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'password cannot be blank').notEmpty();
    req.checkBody('password_confirm', 'Confirm password cannot be blank').notEmpty();
    req.checkBody('password_confirm', 'passwords do not match'
    ).equals(req.body.password);
    const errors = req.validationErrors();
    if (errors) {
        console.log(errors)
        res.status(400).json(errors);
        return false
    }
    next()
};
