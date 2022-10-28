const Class = require("../../model/class");

exports.getClass = async (req, res) => {
  try {
    const results = await Class.find({});
    res.status(200).json(results);
  } catch (err) {
    res.status(500).send(err);
  }
};
