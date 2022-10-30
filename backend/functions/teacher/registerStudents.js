const Student = require('../../model/student');

exports.studentRegister = async (req, res) => {

    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    let reg = new Student({
        name:name,
        email:email,
        password:password
      })

      reg.save().then(reg => {
        res.status(200).json('Student registered successfully');
    }).catch(err => {
        console.log(err);
        res.status(400).send({'fail':err});
    });

};




exports.getStudents = async (req, res) => {
  try {
    const results = await Student.find({});
    res.status(200).json(results);
  } catch (err) {
    res.status(500).send(err);
  }
};
