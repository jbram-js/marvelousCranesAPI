const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    },
    emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,   
        unique: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
        set: (password) => bcrypt.hashSync(password, 10),
    },
});

usersSchema.methods.validatePassword = function validatePassword(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", usersSchema);

module.exports = User;