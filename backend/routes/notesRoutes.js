const express = require("express");
const router = express.Router();
const notesController = require("./../controllers/notesController");

// TODO Student Side
// router.route('/group')
// .get()
router
  .route("/:noteId")
  .get(notesController.getNote)
  .patch(notesController.updateNotes)
  .delete(notesController.deleteNotes);

router
  .route("/group/:groupId")
  .get(notesController.getNotes)
  .post(notesController.addNotes);

module.exports = router;
