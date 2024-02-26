import Creature from "../models/restaurant.model.js"

const CreatureController = {

    createCreature: async (req, res) => {
        try {
            // Check for an existing creature with the same name, case-insensitively
            const existingCreature = await Creature.findOne({
                name: { $regex: new RegExp("^" + req.body.name + "$", "i") }
            });
            if (existingCreature) {
                return res.status(400).json({ errors: { name: { message: 'Creature name must be unique.' } } });
            }
            const newCreature = await Creature.create(req.body);
            res.json(newCreature);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    getAllCreatures: async (req, res) => {
        try {
            const allCreatures = await Creature.find().sort({ petType: 1, name: 1, createdAt: 1 }).collation({ locale: "en", strength: 1 })
            res.json(allCreatures)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },

    getOneCreature: async (req, res) => {
        try {
            const foundCreature = await Creature.findById(req.params.id)
            res.json(foundCreature)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },

    updateOneCreature: async (req, res) => {
        const options = {
            new: true,
            runValidators: true
        };
        try {
            // If name is being updated, check for uniqueness
            if (req.body.name) {
                const existingCreature = await Creature.findOne({
                    _id: { $ne: req.params.id },
                    name: { $regex: new RegExp("^" + req.body.name + "$", "i") }
                });
                if (existingCreature) {
                    return res.status(400).json({ errors: { name: { message: 'Creature name must be unique.' } } });
                }
            }
            const updatedCreature = await Creature.findByIdAndUpdate(req.params.id, req.body, options);
            res.json(updatedCreature);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    deleteOneCreature: async (req, res) => {
        try {
            const deletedCreature = await Creature.findByIdAndDelete(req.params.id);
            res.json(deletedCreature);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    }
}

export default CreatureController