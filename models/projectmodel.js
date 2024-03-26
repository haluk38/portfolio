const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Le Nom du projet est requis"],
    },
    url: {
        type: String,
        required: [true, "une URL est requis",]
    },
    urlGithub: {
        type: String,
        required: [true, "une URL github est requis",]
    },
    image: {
        type: String,
        default:""
    },
})

const projectModel = mongoose.model('projects', projectSchema)
module.exports = projectModel