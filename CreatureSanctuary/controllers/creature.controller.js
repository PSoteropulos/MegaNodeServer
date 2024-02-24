import Book from "../models/book.model.js"

const BookController = {

    createBook: async (req, res) => {
        try {
            const newBook = await Book.create(req.body)
            res.json(newBook)
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    getAllBooks: async (req, res) => {
        try {
            const allBooks = await Book.find()
            res.json(allBooks)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },

    getOneBook: async (req, res) => {
        try {
            const foundBook = await Book.findById(req.params.id)
            res.json(foundBook)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },

    updateOneBook: async (req, res) => {
        const options = {
            new: true,
            runValidators: true,
        };
        try {
            const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, options);
            res.json(updatedBook);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    deleteOneBook: async (req, res) => {
        try {
            const deletedBook = await Book.findByIdAndDelete(req.params.id);
            res.json(deletedBook);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    }
}

export default BookController