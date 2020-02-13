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
            const found = localStorage.find(element => {
                return data.isbn === element.isbn
            })

            if (found) {
                res.status(200).json("this isbn alrady exists")
                return
            }
            data.creationDate = new Date();
        
            localStorage.push(data)
            console.log(localStorage)
            res.status(201).json(`Succesfully created the entry`)
        }

    })

    server.get(`/books/get-todays-books`,(req,res) => {
        let newArray = []
        const today =new Date()
        const shortDate =today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear()
    for (i=0;i<localStorage.length;i++) {
        const longDate = localStorage[i].creationDate
        const bookDate = longDate.getDate() + '/' + longDate.getMonth() + '/' + longDate.getFullYear()

        if(shortDate === bookDate){
            newArray.push(localStorage[i])
        }
    }
        res.status(200).json(newArray)
    })

    server.get('/books/get-book-by-author/:author', (req , res) => {
        for (i=0;i<localStorage.length;i++) {
            let newAuthor = []

            newAuthor = localStorage.filter((element) =>{
                return element.author ===  req.params.author
            })
            res.status(200).json(newAuthor)
        }
    })






    server.delete('/books/remove/:isbn', (req, res) =>{
        const found = localStorage.findIndex((element) =>{
            element.isbn === req.params.isbn
        })

        if (found) {
            localStorage.splice(found, 1)
            res.status(200).json("Succesfully deleted")
        }
        else{
            res.status(400).json('Bad request, no data found!')
        }
    })

}



//so ova se exportira funkcijata od gore moze i povekje funkcii 
module.exports = {
    Routes: Routes
}
