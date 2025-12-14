import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { TaskController } from "../controllers/taskController";
import { handleInputErrors } from "../middleware/validation";
import { projectExists } from "../middleware/project";
import { taskExists, taskBelongsToProject } from "../middleware/task";

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

//* ROUTES para las tareas
router.param("projectId", projectExists);

router.post(
  "/:projectId/tasks",
  param("projectId").isMongoId().withMessage("ID no válido"),
  body("taskName").notEmpty().withMessage("Nombre de tarea es obligatorio."),
  body("description").notEmpty().withMessage("descripción es obligatorio."),
  handleInputErrors,
  TaskController.createTask
);

router.get(
  "/:projectId/tasks",
  param("projectId").isMongoId().withMessage("ID no válido"),
  TaskController.getProjectTasks
);

router.param("taskId", taskExists);
router.param("taskId", taskBelongsToProject);

router.get(
  "/:projectId/tasks/:taskId",
  param("projectId").isMongoId().withMessage("ID no válido"),
  param("taskId").isMongoId().withMessage("ID no válido"),
  TaskController.getTaskById
);

router.put(
  "/:projectId/tasks/:taskId",
  param("projectId").isMongoId().withMessage("ID no válido"),
  param("taskId").isMongoId().withMessage("ID no válido"),
  body("taskName").notEmpty().withMessage("Nombre de tarea es obligatorio."),
  body("description").notEmpty().withMessage("descripción es obligatorio."),
  handleInputErrors,
  TaskController.updateTask
);

router.delete(
  "/:projectId/tasks/:taskId",
  param("projectId").isMongoId().withMessage("ID no válido"),
  param("taskId").isMongoId().withMessage("ID no válido"),
  TaskController.deleteTask
);

router.post(
  "/:projectId/tasks/:taskId/status",
  param("projectId").isMongoId().withMessage("ID no válido"),
  param("taskId").isMongoId().withMessage("ID no válido"),
  body("status").notEmpty().withMessage("Estado de tarea es obligatorio."),
  handleInputErrors,
  TaskController.updateTaskStatus
);

export default router;
