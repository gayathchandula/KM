const Assignment = require("../../model/assignment");

exports.getAssignment = async (req, res) => {
  try {
    const upload = await Assignment.find({});
    if (!upload) {
      throw new Error("no file found");
    }

    res.status(200).json({upload});

  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Sorry, something went wrong", err });
  }
};
