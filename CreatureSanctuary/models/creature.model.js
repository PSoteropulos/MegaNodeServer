import { model, Schema } from 'mongoose';
import { getDBConnection } from '../../config/db.config.js';
import uniqueValidator from 'mongoose-unique-validator';


const CreatureSchema = new Schema({

    name: {
        type: String,
        required: [true, "Creature name is required."],
        minLength: [3, "Creature name must be longer than 2 characters."],
        maxLength: [25, "Creature name can not exceed 25 characters."],
        trim: true,
        // unique: true,
        uniqueCaseInsensitive: true
    },

    creatureType: {
        type: String,
        required: [true, "Creature type is required."],
        minLength: [3, "Creature type must be longer than 2 characters."],
        maxLength: [20, "Creature type can not exceed 20 characters."],
        trim: true,
        // enum:[
        //     "Amphibian",
        //     "Bird",
        //     "Cat",
        //     "Dog",
        //     "Fish",
        //     "Insect/Arachnid",
        //     "Livestock",
        //     "Reptile",
        //     "Rodent",
        //     "Other"
        // ]
    },

    description: {
        type: String,
        required: [true, "Creature description is required."],
        minLength: [3, "Creature description must be longer than 2 characters."],
        trim: true
        // maxLength:[100," Creature description can not exceed 100 characters."],
    },

    skill1: {
        type: String,
        required: false,
        trim: true
        // minLength:[3, "Creature skills must be longer than 2 characters."],
    },

    skill2: {
        type: String,
        trim: true
        // minLength:[3, "Creature skills must be longer than 2 characters."],
    },

    skill3: {
        type: String,
        trim: true
        // minLength:[3, "Creature skills must be longer than 2 characters."],
    },

    likeCount: {
        type: Number,
    },

    image: {
        type: String,
    }

}, { timestamps: true });

// CreatureSchema.plugin(uniqueValidator, { message: 'Creature name must be unique.' })

// This tells the model which db to use (parameter)
const connection = getDBConnection('creatureDB');
const Creature = connection.model('Creature', CreatureSchema);

export default Creature;