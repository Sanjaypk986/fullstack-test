import express from 'express'
import restaurantRouter from './restaurantRoutes.js'
const apiRouter = express.Router()

// v1 router
apiRouter.use('/restaurant',restaurantRouter)

export default apiRouter