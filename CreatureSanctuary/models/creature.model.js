import { model, Schema } from 'mongoose';

const BookSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required."],
            minlength: [2, "Title must be at least 2 characters long."],
            maxlength: [255, "Title must be less than 255 characters long."]
        },
        author: {
            type: String,
            required: [true, "Author is required."],
            minlength: [5, "Author must be at least 5 characters long."],
            maxlength: [255, "Author must be less than 255 characters long"]
        },
        pages: {
            type: Number,
            required: [true, "Page count is required."],
            min: [1, "Book must have at least 1 page."]
        },
        isAvailable: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const Book = model("Book", BookSchema);

export default Book;




import mongoose from 'mongoose';
import { getDBConnection } from '../config/db.config.js';
import BookSchema from './schemas/BookSchema.js'; // Assuming you've defined your schema separately

// This tells the model which db to use (parameter in)
const connection = getDBConnection('BookDB');
const Book = connection.model('Book', BookSchema);

export default Book;