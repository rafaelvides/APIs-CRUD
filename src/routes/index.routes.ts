import dotenv from 'dotenv'
import { Router } from 'express'

import routerUser from "./user.routes"
dotenv.config()
const URL = process.env.URL

const routes = Router()

routes.use(`${URL}/user`, routerUser)
export default routes