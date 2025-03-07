import express from "express";
const router: express.Router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.json({ message: "Support Ticketing System API is up and running." });
});
router.get("/ok", (req, res) => {
  res.json({ message: "ok" });
});

export default router;
