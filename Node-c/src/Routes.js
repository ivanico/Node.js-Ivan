function Routes (server, localStorage) {
    /*request i reponse se dvata parametri na callbackot  na rutata */
    server.get(`/`, (request, response) => {
        /*tuka se obrabotuva requestot sto stiga na rutata */
        response.status(200).send(`You have reached server!`)
    })
    
    //search by name  so query
    server.get(`/users`, function (request, response) {
        
        try{
        const array = [`petko`,`stanko`,`pero`,`jovance`,`draganco`]
    
        const name = request.query.name
    
        if(name && array.includes(name)) {
            response.status(200).send(name)
        }
        else{
            response.status(200).send(array)
        }
        }
        catch (error){
            console.error(error)
            response.status(500).send(`error`)
        }
    })
    //search by id
    server.get(`/users/:id`, function (request, response) {
    
        const array = [`petko`,`stanko`,`pero`]
        //the route param value is in the request object
        const id = request.params.id
    
        if (array[id]) {
            response.status(200).json(array[id]);
        }
        else{
            response.status(200).json(`No data!`);
        }
    
    })
    //search by name
    server.get(`user/:name` , (request,response) => {
        const array = [`petko`,`stanko`,`pero`]
    
        const name = request.params.name.toUpperCase()
    
        const found = array.find((element) => element.toUpperCase() === name)
    
        if (found) {
            response.status(200).json(found);
        }
        else{
            response.status(200).json(`No data!`);
        }
    })


    server.post(`/books/new` , (req,res) => {
        //prima info za nova kniga
        const data = req.body //ovde treba da ima objekt so nesto vnatre {...}
        if (!data) {
            console.log(data)
            res.status(400).json(`Bad request, no data found.`)
        }
        else{
            localStorage.push(data)
            console.log(localStorage)
            res.status(201).json(`Succesfully created the entry`)
        }
    })
}



//so ova se exportira funkcijata od gore moze i povekje funkcii 
module.exports = {
    Routes: Routes
}
