const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        unique: true,
        required: true,
    },
    userStatus: {
        type: Boolean,
        default: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password
            if (ret.profileImage) ret.profileImage = 'http://localhost:3000/' + ret.profileImage
        }
    }
})

userSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {

        let hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;
        next();
    } else {
        next();
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
