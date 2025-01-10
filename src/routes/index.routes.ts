import { Request, Response, Router } from "express";
import coinRoute from "./coin.routes";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello" });
});
router.use("/coin", coinRoute);

export default router;
