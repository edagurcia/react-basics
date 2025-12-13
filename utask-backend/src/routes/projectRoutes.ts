import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post(
  "/",
  body("projectName")
    .notEmpty()
    .withMessage("Nombre del proyecto es obligatorio."),
  body("clientName")
    .notEmpty()
    .withMessage("Nombre del cliente es obligatorio."),
  body("description").notEmpty().withMessage("Descripción es obligatorio."),
  handleInputErrors,
  ProjectController.createProject
);
router.get("/", ProjectController.getAllProjects);
router.get(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  ProjectController.getProjectById
);
router.put(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  body("projectName")
    .notEmpty()
    .withMessage("Nombre del proyecto es obligatorio."),
  body("clientName")
    .notEmpty()
    .withMessage("Nombre del cliente es obligatorio."),
  body("description").notEmpty().withMessage("Descripción es obligatorio."),
  handleInputErrors,
  ProjectController.updateProject
);
router.delete(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  ProjectController.deleteProject
);

export default router;
