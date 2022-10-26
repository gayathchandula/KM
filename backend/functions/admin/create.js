const Admin = require('../../model/admin');

exports.adminCreate = async (req, res) => {

    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    let reg = new Admin({
        name:name,
        email:email,
        password:password
      })

      reg.save().then(reg => {
        res.status(200).json('Admin registered successfully');
    }).catch(err => {
        res.status(400).send({'fail':err});
    });

};
