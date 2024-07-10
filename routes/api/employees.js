const express = require("express");
const router = express.Router();
const employeeController = require("../../controllers/employeController");
const ROLE_LIST = require("../../config/role_list");
const verifyRoles = require("../../midleware/verifyRoles");

router
  .route("/")
  .get(employeeController.getAllEmployee)
  .post(
    verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor),
    employeeController.createEmployee
  )
  .put(
    verifyRoles(ROLE_LIST.Admin, ROLE_LIST.Editor),
    employeeController.updateEmployee
  )
  .delete(verifyRoles(ROLE_LIST.Admin), employeeController.deleteEmployee);

router.route("/:id").get(employeeController.getEmployee);

module.exports = router;
