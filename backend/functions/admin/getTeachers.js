const Teacher = require("../../model/teacher");

exports.getTeachers = async (req, res) => {
  try {
    const results = await Teacher.find({});
    res.status(200).json(results);
  } catch (err) {
    res.status(500).send(err);
  }
};
