import { Router } from "express"
import RestaurantController from "../controllers/restaurant.controller.js"
const restaurantRouter = Router()

restaurantRouter.route("/restaurants")
    .get(RestaurantController.getAllRestaurants)
    .post(RestaurantController.createRestaurant)

restaurantRouter.route("/restaurants/open")
    .get(RestaurantController.getAllOpenRestaurants)

restaurantRouter.route("/restaurants/closed")
    .get(RestaurantController.getAllClosedRestaurants)

restaurantRouter.route("/restaurants/:id")
    .get(RestaurantController.getOneRestaurant)
    .put(RestaurantController.updateOneRestaurant)
    .delete(RestaurantController.deleteOneRestaurant)

export default restaurantRouter