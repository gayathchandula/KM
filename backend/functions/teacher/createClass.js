const Class = require("../../model/class");

exports.createClass = async (req, res) => {
  const { name, teacher, code } = req.body;

  if (!name || !teacher || !code) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  let reg = new Class({
    name: name,
    teacher: teacher,
    code: code,
  });

  reg
    .save()
    .then((reg) => {
      res.status(200).json("Class created successfully");
    })
    .catch((err) => {
      res.status(400).send({ fail: err });
    });
};
