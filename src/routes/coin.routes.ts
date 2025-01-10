import { Router } from "express";
import { fetchStatsOfGivenCoin } from "../controller/coin.controller";
const router = Router();

router.get("/stats", fetchStatsOfGivenCoin);

export default router;
