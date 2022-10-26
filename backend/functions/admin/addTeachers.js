const Teacher = require('../../model/teacher');

exports.teacherRegister = async (req, res) => {

    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    let reg = new Teacher({
        name:name,
        email:email,
        password:password
      })

      reg.save().then(reg => {
        res.status(200).json('Teacher registered successfully');
    }).catch(err => {
        console.log(err);
        res.status(400).send({'fail':err});
    });

};
