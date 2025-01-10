import { Router } from "express";
import {
  fetchDeviationOfCoins,
  fetchStatsOfGivenCoin,
} from "../controller/coin.controller";
const router = Router();

router.get("/stats", fetchStatsOfGivenCoin);
router.get("/deviation", fetchDeviationOfCoins);

export default router;
