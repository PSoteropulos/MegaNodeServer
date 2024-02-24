import { Router } from "express"
import StoreController from "../controllers/store.controller.js"
const storeRouter = Router()

storeRouter.route("/stores")
    .get(StoreController.getAllStores)
    .post(StoreController.createStore)

storeRouter.route("/stores/open")
    .get(StoreController.getAllOpenStores)

storeRouter.route("/stores/closed")
    .get(StoreController.getAllClosedStores)

storeRouter.route("/stores/:id")
    .get(StoreController.getOneStore)
    .put(StoreController.updateOneStore)
    .delete(StoreController.deleteOneStore)

export default storeRouter