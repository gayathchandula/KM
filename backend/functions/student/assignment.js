const Assignment = require("../../model/assignment");

exports.Assignment = async (req, res) => {
  const { module } = req.params;

  try {
    if (!module) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const upload = await Assignment.find({ class: module });
    if (!upload) {
      throw new Error("no file found");
    }

    res.status(200).json({ upload });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Sorry, something went wrong", err });
  }
};
