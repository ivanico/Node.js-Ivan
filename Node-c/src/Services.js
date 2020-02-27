const models = require('./Models');
const fs = require('fs');


class Services {

    getInitialRoute ( req , res ) {
       res.status(200).send('You have reached the server!')
    }

    async getAllDocs (req, res) {
        try{
            // const books =await models.Book.find({year: {$gt: '2000'}})  //bi mozelo i so $regex /20*/    /\*20*/
            res.status(200).json(res.docs)
        }
        catch(err){
            res.status(500).json({massage: 'Server error'+ err})
        }
    }


    async getBooksByAuthor (req,res) {
        try{
            const books =await models.Book.find({ author:req.params.name })
            res.status(200).json(books)
        }
        catch(err){
            res.status(500).json({massage: 'Server error'+ err})
        }
    }

    //sejvuvanje kniga c8

    async createNewBook (req,res) {
        
        try{

            const data = req.body          //samo se stava se u data

            const found = await models.Book.findOne({ isbn: data.isbn })  //se srcha u datata seite isbn
            if(found){
                res.status(400).json({massage:'book alrady exists', book:found})           

                return
            }
            const newBook = models.Book(data)    // moze i posle ova .save
            const saved = await newBook.save()

            if(saved){
                res.status(201).json('Succesffully added a new book')
            }
            else{
                res.status(400).json('error in the data object')
            }
        }
        catch(err){
            res.status(500).json({massage: 'Server error'+ err})
        }
    }

    async createAuthor (req,res) {
        
        try{

            const data = req.body          //samo se stava se u data

            const found = await models.Author.findOne({ fistName: data.fistName })  //se srcha u datata seite isbn
            if(found){
                res.status(400).json({massage:'Author alrady exists', Author:found})           

                return
            }
            const newAuthor = models.Author(data)    // moze i posle ova .save
            const saved = await newAuthor.save()

            if(saved){
                res.status(201).json('Succesffully added a new book')
            }
            else{
                res.status(400).json('error in the data object')
            }
        }
        catch(err){
            res.status(500).json({massage: 'Server error'+ err})
        }
    }
    //c9
    async removeBook (req,res) {
        try{
            const deleted = await models.Book.deleteOne({isbn:req.params.isbn})
            if(deleted.deletedCount>0){
                res.status(201).json('Succesffully delted!')
            }
            else{
                res.status(400).json('general err')
            }
        }
        catch (err){
            res.status(500).json({massage: 'Server error'+ err})
        }
    }

    //c10
    getFile(req, res) {
        const file = fs.createReadStream('./storage/sample.pdf')
        const size = fs.statSync('./storage/sample.pdf').size
        
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Length': size
        })
        file.pipe(res)
    }

    writeFile(req, res) {

        const stream = fs.createWriteStream(
            './storage/new.txt', {flags: 'a'})
        stream.once('open', () =>{
            stream.write(req.body.data)   // \n e nova linija posle 'hi \n'
            stream.end()
        })
        res.status(200).send('OK')
    }
}

module.exports = new Services()