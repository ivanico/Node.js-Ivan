const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    // Book model templet
    isbn:{type:Number,required:true},
    title:{type:String,required:true},
    author:{type:String,required:true},
    year:String
});

const authorSchema = new mongoose.Schema({
    // Book model templet
    firstName:{type:String,required:true},
    lastName:{type:String,required:false},
    yearOfBirth:{type:Date,required:false},
    yearOfPassing:{type:Date,required:false}
});


const Author = mongoose.model( 'Author', authorSchema)
const Book = mongoose.model( 'Book' , bookSchema );

module.exports = {
    Book: Book,
    Author: Author
}