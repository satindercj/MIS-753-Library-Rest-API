const express = require('express');

const Model = require('../models/model');

const router = express.Router();

/**
 * @swagger
 * /v1/api/addBook:
 *   post:
 *     parameters:
 *      - in: body
 *        name: Book
 *        description: New book
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *              require: true
 *            author:
 *              type: string
 *              require: true
 *            genre:
 *              type: string
 *              require: true
 *            description:
 *              type: string
 *              require: true
 *            numberOfPages:
 *              type: integer
 *              require: true
 *     responses:
 *       200:
 *         description: Added Book to MongoDB
 *       400:
 *         description: Error message
 */

//Add Book to collection
router.post('/addBook', async (req, res) => {
    const data = new Model({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        description: req.body.description,
        numberOfPages: parseFloat(req.body.numberOfPages)
    });

    try {
        const valToSave = await data.save();
        res.status(200).json(valToSave)
    }
    catch (err) {
        res.status(400).json({message: err.message})
    }

})

/**
 * @swagger
 * /v1/api/getBooks:
 *   get:
 *     description: All Books
 *     responses:
 *       200:
 *         description: Returns all the Books in our Library
 *       400:
 *         description: Error message
 */
router.get('/getBooks', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

/**
 * @swagger
 * /v1/api/findById/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The Book ID.
 *     description: Finds Book by ID 
 *     responses:
 *       200:
 *         description: Returns the requested book
 *       400:
 *         description: Error message
 */
router.get('/findById/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.status(200).json(data)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})


/**
 * @swagger
 * /v1/api/findByTitle/{title}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: title
 *        required: true
 *        type: string
 *        description: The Book Title.
 *     description: Find Books by Title 
 *     responses:
 *       200:
 *         description: Returns the requested books
 *       400:
 *         description: Error message
 */
router.get('/findByTitle/:title', async (req, res) => {
    try{
        const data = await Model.find({title: {$regex: req.params.title}});
        res.status(200).json(data)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})


/**
 * @swagger
 * /v1/api/findByAuthor/{author}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: author
 *        required: true
 *        type: string
 *        description: The Book's Author.
 *     description: Find Books by Author 
 *     responses:
 *       200:
 *         description: Returns the requested books
 *       400:
 *         description: Error message
 */
router.get('/findByAuthor/:author', async (req, res) => {
    try{
        const data = await Model.find({author: {$regex: req.params.author}});
        res.status(200).json(data)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})


/**
 * @swagger
 * /v1/api/findByGenre/{genre}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: genre
 *        required: true
 *        type: string
 *        description: The Book's Genre.
 *     description: Find Books by Genre 
 *     responses:
 *       200:
 *         description: Returns the requested books
 *       400:
 *         description: Error message
 */
router.get('/findByGenre/:genre', async (req, res) => {
    try{
        const data = await Model.find({genre: {$regex: req.params.genre}});
        res.status(200).json(data)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})


/**
 * @swagger
 * /v1/api/findByDescription/{description}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: description
 *        required: true
 *        type: string
 *        description: The Book's Description or partial description.
 *     description: Find Books by partial or full description 
 *     responses:
 *       200:
 *         description: Returns the requested books
 *       400:
 *         description: Error message
 */
router.get('/findByDescription/:description', async (req, res) => {
    try{
        const data = await Model.find({description: {$regex: req.params.description}});
        res.status(200).json(data)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})


/**
 * @swagger
 * /v1/api/findByPageNumber/{pageNumbers}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: Page Numbers
 *        required: true
 *        type: integer
 *        description: The Book's Page Numbers
 *     description: Find Books with equal or greater number of pages
 *     responses:
 *       200:
 *         description: Returns the requested books
 *       400:
 *         description: Error message
 */
router.get('/findByPageNumber/:pageNumbers', async (req, res) => {
    try{
        const data = await Model.find({numberOfPages: {$gte: req.params.pageNumbers}});
        res.status(200).json(data)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})


/**
 * @swagger
 * /v1/api/update/{id}:
 *   patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The book ID.
 *      - in: body
 *        name: book
 *        description: Update book
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *            author:
 *              type: string
 *            genre:
 *              type: string
 *            description:
 *              type: string
 *            numberOfPages:
 *              type: integer
 *     responses:
 *       200:
 *         description: Updated Book with new Data
 *       400:
 *         description: Error message
 */
router.patch('/update/:id', async (req, res) => {
    try {
        const newData = req.body;

        const result = await Model.findByIdAndUpdate(
            req.params.id, newData, { new: true }
        )

        res.status(200).send(result)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

/**
 * @swagger
 * /v1/api/delete/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The book ID.
 *     description: Delete a Book from the library by id
 *     responses:
 *       200:
 *         description: Returns Deleted requested Book message
 *       400:
 *         description: Error message
 */
router.delete('/delete/:id', async (req, res) => {
    try {
        const data = await Model.findByIdAndDelete(req.params.id);

        res.status(200).send(`${data.title} has been deleted from the Collection`)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})


module.exports = router;