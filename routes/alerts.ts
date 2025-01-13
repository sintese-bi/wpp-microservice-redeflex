import { Router } from "express"
import alertsController from "../src/Controllers/alertsController"
import stationRegionRepository from "../src/Repository/stationRegionRepository"
import alertsService from "../src/Services/alertsService"
const alertRoutes = Router()


alertRoutes.get('/teste', alertsService.alertsMLTTMP)

export default alertRoutes