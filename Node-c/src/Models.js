const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    // Book model templet
    isbn:Number,
    title:String,
    author:String,
    year:String
});

const Book = mongoose.model( 'Book' , bookSchema );

module.exports = {
    Book: Book
}