const models = require('./Models');


class Middlewares{
    async getAllBooks (req, res, next) {
        const books =await models.Book.find()
        res.docs = books
        next()
    }


    async getAuthors( req, res , next) {
        const authors = await models.Author.find()
        res.docs= authors
        next()
    }
}

module.exports = new Middlewares()