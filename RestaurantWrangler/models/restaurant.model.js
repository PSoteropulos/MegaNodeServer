import { model, Schema } from 'mongoose';
import { getDBConnection } from '../../config/db.config.js';

const RestaurantSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Restaurant name is required."],
            minlength: [3, "Restaurant name must be at least 3 characters long."],
            maxlength: [100, "Restaurant name must be at most 100 characters long."],
            trim: true
        },
        // cuisine: {
        //     type: String,
        //     required: [true, "Restaurant cuisine is required."],
        //     minlength: [3, "Restaurant cuisine must be at least 3 characters long."],
        //     maxlength: [100, "Restaurant cuisine must be at most 100 characters long."],
        //     trim: true
        // },
        number: {
            type: Number,
            required: [true, "Restaurant number is required."],
            min: [1, "Restaurant number must be greater than 0."],
            trim: true,
            validate: {
                validator: v => ![1049, 36, 245, 20937, 4].includes(v),
                message: props => `${props.value} is a banned restaurant number!`
            }
        },
        isOpen: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

const connection = getDBConnection('restaurantDB');
const Restaurant = connection.model('Restaurant', RestaurantSchema);

export default Restaurant;