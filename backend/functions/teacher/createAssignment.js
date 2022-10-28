const Assignment = require("../../model/assignment");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dt0jpeqrs",
  api_key: "423843764313348",
  api_secret: "wRF-zPuA2dhuZ9VpYxbnYkR6XW8",
});

exports.createAssignment = async (req, res) => {
  const { name, teacher, module } = req.body;

  if (!name || !teacher || !module) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const upload = await cloudinary.v2.uploader.upload(req.file.path,{ resource_type: "raw" });

    let reg = new Assignment({
      name: name,
      teacher: teacher,
      class: module,
      file: upload.secure_url,
    });

    reg
      .save()
      .then((reg) => {
        res.status(200).json("Assignment add successfully");
      })
      .catch((err) => {
        res.status(400).send({ fail: err });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Sorry, something went wrong", err });
  }
};
