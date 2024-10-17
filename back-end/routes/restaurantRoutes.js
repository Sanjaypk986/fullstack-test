import express from 'express'
import { calculateTotalRevenue, getAllRestaurants, restaurantCreate } from '../controllers/RestaurantController.js'

const router = express.Router()


router.post('/create',restaurantCreate)
router.get('/get-restaurants',getAllRestaurants)
router.post('/calculate-revenue', calculateTotalRevenue);

export default router