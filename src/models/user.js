const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'user', 'customer']
        },
        default: 'user'
    }
}, {
    timestamps: true
})

const User = mongoose.model('user', userSchema);

module.exports = User;