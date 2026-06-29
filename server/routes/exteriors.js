import express from "express"
import ExteriorController from "../controllers/exteriors.js"

const router = express.Router()

router.get("/", ExteriorController.getExteriors)
export default router