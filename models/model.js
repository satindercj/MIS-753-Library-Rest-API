const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: String
    },
    genre: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    numberOfPages: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('Books', bookSchema)