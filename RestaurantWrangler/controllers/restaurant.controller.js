import Restaurant from "../models/restaurant.model.js"

const RestaurantController = {

    createRestaurant: async (req, res) => {
        try {
            // Check for an existing restaurant with the same name, case-insensitively
            const existingRestaurant = await Restaurant.findOne({
                name: { $regex: new RegExp("^" + req.body.name + "$", "i") }
            });
            if (existingRestaurant) {
                return res.status(400).json({ errors: { name: { message: 'Restaurant name must be unique.' } } });
            }
            const newRestaurant = await Restaurant.create(req.body);
            res.status(201).json(newRestaurant);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    getAllRestaurants: async (req, res) => {
        try {
            const allRestaurants = await Restaurant.find()
            res.json(allRestaurants)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },

    getOneRestaurant: async (req, res) => {
        try {
            const foundRestaurant = await Restaurant.findById(req.params.id)
            res.json(foundRestaurant)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },

    updateOneRestaurant: async (req, res) => {
        const options = {
            new: true,
            runValidators: true
        };
        try {
            // If name is being updated, check for uniqueness
            if (req.body.name) {
                const existingRestaurant = await Restaurant.findOne({
                    _id: { $ne: req.params.id },
                    name: { $regex: new RegExp("^" + req.body.name + "$", "i") }
                });
                if (existingRestaurant) {
                    return res.status(400).json({ errors: { name: { message: 'Restaurant name must be unique.' } } });
                }
            }
            const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, options);
            res.json(updatedRestaurant);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    deleteOneRestaurant: async (req, res) => {
        try {
            const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
            res.json(deletedRestaurant);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    getAllOpenRestaurants: async (req, res) => {
        try {
            const allOpenRestaurants = await Restaurant.find({isOpen: true})
            res.json(allOpenRestaurants)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },

    getAllClosedRestaurants: async (req, res) => {
        try {
            const allClosedRestaurants = await Restaurant.find({isOpen: false})
            res.json(allClosedRestaurants)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
}

export default RestaurantController