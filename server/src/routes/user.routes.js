import { Router } from "express";

const router = Router();

router.route("/test").get((req, res) => {
    res.send("Test Route check");
});

export default router

