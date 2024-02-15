const express = require("express");
const router = express.Router();
const groupController = require("./../controllers/groupController");

router.route("/").post(groupController.createGroup);
router.route("/manage/:studentId").get(groupController.getAllGroups);
router.route("/manage/").get(groupController.getAllGroupsForHOD);

router.route("/students/:groupId").get(groupController.getStudentsList);
router.route("/teacher/:teacherId").get(groupController.getGroups);
router.route("/student/:studentId").get(groupController.getGroupsStudent);

router
  .route("/:groupId")
  .get(groupController.getGroup)
  .patch(groupController.updateStudents)
  .delete(groupController.deleteGroup);

module.exports = router;
