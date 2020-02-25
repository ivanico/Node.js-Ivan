const Services = require('./Services')
const middleWares = require('./middleWares')


function Routes (server){
    server.get( '/' , Services.getInitialRoute)

    server.get('/get-books',
    middleWares.getAllBooks,
    Services.getAllDocs)       //c7




    server.get('/get-books-by-author/:name',Services.getBooksByAuthor)

    server.post('/add-book', Services.createNewBook)              //c8 sejvuvanje kniga

    server.delete('/remove-book/:isbn',Services.removeBook)

    server.get('/get-authors',
    middleWares.getAuthors,
    Services.getAllDocs)

    server.post('/add-author', Services.createAuthor)
}


module.exports = Routes;