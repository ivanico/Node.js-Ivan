const Services = require('./Services')


function Routes (server){
    server.get( '/' , Services.getInitialRoute)

    server.get('/get-books',Services.getAllBooks)       //c7

    server.get('/get-books-by-author/:name',Services.getBooksByAuthor)

    server.post('/add-book', Services.createNewBook)              //c8 sejvuvanje kniga

    server.delete('/remove-book/:isbn',Services.removeBook)
}


module.exports = Routes;