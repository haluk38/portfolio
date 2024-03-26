const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    pseudo:{
        type: String,
        required: [true, "un user est requis"],
    },
    password: {
        type: String,
        required: [true, "le mot de passe est requis",]
    },
})

const userModel = mongoose.model('users', userSchema)
module.exports = userModel