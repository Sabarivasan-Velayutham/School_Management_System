const mongoose = require("mongoose");
const Group = require("../models/Group");
const asyncHandler = require("express-async-handler");

// @desc Get Groups for each Teacher
// @route GET /Group/teacher/teacherId
// @access Everyone
const getGroups = asyncHandler(async (req, res) => {
  if (!req?.params?.teacherId) {
    return res.status(400).json({ message: "Teacher ID Missing" });
  }
  const groups = await Group.find({
    teacher: req.params.teacherId,
  })
    .select("-students")
    .exec();
  if (!groups) {
    return res.status(404).json({
      message: `No Group(s) found`,
    });
  }
  res.json(groups);
});

// @desc Get Groups for each Student
// @route GET /group/student/:studentId
// @access Everyone
const getGroupsStudent = asyncHandler(async (req, res) => {
  if (!req?.params?.studentId) {
    return res.status(400).json({ message: "Student ID Missing" });
  }
  const groups = await Group.aggregate([
    {
      $lookup: {
        from: "teachers",
        localField: "teacher",
        foreignField: "_id",
        as: "teacher",
      },
    },
    {
      $unwind: "$teacher",
    },
    {
      $project: {
        students: {
          $in: [new mongoose.Types.ObjectId(req.params.studentId), "$students"],
        },
        semester: 1,
        year: 1,
        group: 1,
        "teacher.name": 1,
      },
    },
    {
      $match: { students: true },
    },
  ]);
  if (!groups) {
    return res.status(404).json({
      message: `No Group(s) found`,
    });
  }
  res.json(groups);
});

// @desc Get All Groups
// @route GET /group/
// @access Everyone
const getAllGroups = asyncHandler(async (req, res) => {
  if (!req?.params?.studentId) {
    return res.status(400).json({ message: "Student ID Missing" });
  }

  const groups = await Group.aggregate([
    {
      $lookup: {
        from: "teachers",
        localField: "teacher",
        foreignField: "_id",
        as: "teacher",
      },
    },
    {
      $unwind: "$teacher",
    },
    {
      $project: {
        semester: 1,
        year: 1,
        group: 1,
        "teacher.name": 1,
        students: 1,
        department: 1,
        joined: {
          $in: [new mongoose.Types.ObjectId(req.params.studentId), "$students"],
        },
      },
    },
  ]);
  if (!groups) {
    return res.status(404).json({
      message: `No Group(s) found`,
    });
  }
  res.json(groups);
});

// @desc Get All Groups for HOD
// @route GET /groups/hod
// @access Private (HOD only)
const getAllGroupsForHOD = asyncHandler(async (req, res) => {
  const groups = await Group.find().exec();
  if (!groups) {
    return res.status(404).json({
      message: `No Groups found`,
    });
  }

  res.json(groups);
});

// @desc Get Students for each group
// @route GET /group/students/:groupId
// @access Private
const getStudentsList = asyncHandler(async (req, res) => {
  if (!req?.params?.groupId) {
    return res
      .status(400)
      .json({ message: "Incomplete Request: Params Missing" });
  }

  const students = await Group.findById(req.params.groupId)
    .select("students")
    .populate({ path: "students", select: "name" })
    .exec();
  if (!students?.students) {
    return res.status(400).json({ message: "No Students Found" });
  }
  res.json(students.students);
});

// @desc Get Group
// @route GET /Group
// @access Everyone
const getGroup = asyncHandler(async (req, res) => {
  if (!req?.params?.groupId) {
    return res
      .status(400)
      .json({ message: "Incomplete Request: Params Missing" });
  }
  const group = await Group.findOne({
    _id: req.params.groupId,
  })
    .populate({ path: "teacher", select: "name" })
    .populate({ path: "students", select: "name" })
    .exec();
  if (!group) {
    return res.status(404).json({
      message: `No Group(s) found`,
    });
  }
  res.json(group);
});

// @desc create Group
// @route POST /Group
// @access Private
const createGroup = asyncHandler(async (req, res) => {
  const { group, students, teacher } = req.body;

  // Confirm Data
  if (!group || !students || !teacher) {
    return res
      .status(400)
      .json({ message: "Incomplete Request: Fields Missing" });
  }

  // Check for Duplicates
  const duplicate = await Group.findOne({
    group: req.body.group,
    students: req.body.students,
    teacher: req.body.teacher,
  })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Group already exists" });
  }

  const GroupObj = {
    group,
    students,
    teacher,
  };

  // Create and Store New teacher
  const record = await Group.create(GroupObj);

  if (record) {
    res.status(201).json({
      message: `New Group ${req.body.group} added `,
    });
  } else {
    res.status(400).json({ message: "Invalid data received" });
  }
});

// @desc Update Group
// @route PATCH /Group
// @access Private
const updateStudents = asyncHandler(async (req, res) => {
  const { id, students } = req.body;

  // Confirm Data
  if (!id || !students) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Find Record
  const record = await Group.findById(id).exec();

  if (!record) {
    return res.status(404).json({ message: "Group doesn't exist" });
  }

  // record.students = students;
  // Check for Duplicate Students
  const uniqueStudents = [...new Set(students)];
  if (uniqueStudents.length !== students.length) {
    return res.status(400).json({ message: "Duplicate student entries found" });
  }

  // Update Record with Unique Students
  record.students = uniqueStudents;

  const save = await record.save();
  if (save) {
    res.json({ message: "Updated" });
  } else {
    res.json({ message: "Save Failed" });
  }
});

// @desc Delete Group
// @route DELETE /Group
// @access Private
const deleteGroup = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Group ID required" });
  }

  const record = await Group.findById(id).exec();

  if (!record) {
    return res.status(404).json({ message: "Group not found" });
  }

  await record.deleteOne();

  res.json({ message: `${group} deleted` });
});

module.exports = {
  createGroup,
  getAllGroups,
  getAllGroupsForHOD,
  getGroups,
  getGroupsStudent,
  getStudentsList,
  getGroup,
  updateStudents,
  deleteGroup,
};
