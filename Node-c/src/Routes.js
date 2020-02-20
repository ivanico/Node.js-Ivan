const Services = require('./Services')


function Routes (server){
    server.get( '/' , Services.getInitialRoute)

    server.get('/get-books',Services.getAllBooks)
}


module.exports = Routes;