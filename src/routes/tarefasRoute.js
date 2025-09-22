import express from "express";
import { getAllTarefas, getById, createTarefa, deleteTarefa, updateTarefa, getByStatus } from "../controllers/tarefasController.js";

const router = express.Router();

router.get("/", getAllTarefas);
router.get("/:id", getById);
router.post("/", createTarefa);
router.delete("/:id", deleteTarefa);
router.put("/:id", updateTarefa);
router.get("/", getByStatus);

export default router;