import express from "express";
import { paraphraseText } from "../controllers/paraphraseController.js";

const router = express.Router();

// POST /api/paraphrase
router.post("/paraphrase", paraphraseText);

export default router;