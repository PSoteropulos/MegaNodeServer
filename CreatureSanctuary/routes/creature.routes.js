import { Router } from "express"
import CreatureController from "../controllers/creature.controller.js"
const creatureRouter = Router()

creatureRouter.route("/creatures")
    .get(CreatureController.getAllCreatures)
    .post(CreatureController.createCreature)

creatureRouter.route("/creatures/:id")
    .get(CreatureController.getOneCreature)
    .put(CreatureController.updateOneCreature)
    .delete(CreatureController.deleteOneCreature)

export default creatureRouter