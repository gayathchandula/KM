const Student = require("../../model/student");
const jwt = require('jsonwebtoken');

exports.studentLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password is required",
      });
    }

    const user = await Student.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });
    }

    // test a matching password
    user.comparePassword(password, function (err, isMatch) {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(
          { id: user._id, email: user.email, role: "Student" },
          process.env.JWT_SECRET
        );
        res.status(200).json({
          role: user.role,
          token,
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Sorry, something went wrong", err });
  }
};
