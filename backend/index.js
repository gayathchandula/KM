const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

//admin API
const { adminCreate } = require("./functions/admin/create");
const { adminLogin } = require("./functions/admin/login");
const { teacherRegister } = require("./functions/admin/addTeachers");

//teacher API
const { teacherLogin } = require("./functions/teacher/login");
const { createClass } = require("./functions/teacher/createClass");
const { createAssignment } = require("./functions/teacher/createAssignment");
const {
  downloadAssignment,
} = require("./functions/teacher/downloadAssignment");

//student API
const { studentLogin } = require("./functions/student/login");

//middleware
const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
cloudinary.config({
  cloud_name: "dt0jpeqrs",
  api_key: "423843764313348",
  api_secret: "wRF-zPuA2dhuZ9VpYxbnYkR6XW8",
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage });

//configure mongoose
mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

//admin API
app.post("/api/admin", adminCreate);
app.post("/api/admin/login", adminLogin);
app.post("/api/admin/teacher/register", teacherRegister);

//teacher API
app.post("/api/teacher/login", teacherLogin);
app.post("/api/teacher/class", createClass);
app.post("/api/teacher/assignment", upload.single("file"), createAssignment);
app.get("/api/teacher/assignment/:name/:module", downloadAssignment);

//student API
app.post("/api/student/login", studentLogin);

// app.get("/api/getAllPaginated", getAllPaginated);
// app.put("/api/update", update);
// app.delete("/api/delete/:id", deleteById);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

module.exports = app;
