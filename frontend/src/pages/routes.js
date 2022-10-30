import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";

import Admin from "./Admin/index";
import Teacher from "./teachers/index";
import ClassList from "./students/class";
import Module from "./students/module";
import Login from "./auth/index";


const ProtectedRouteAdmin = ({ children }) => {
  let auth = localStorage.getItem("Auth");
  let role = localStorage.getItem("Role");
  console.log(role)

  if (auth == "false" || role != "Admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const ProtectedRouteTeacher = ({ children }) => {
  let auth = localStorage.getItem("Auth");
  let role = localStorage.getItem("Role");
  console.log(role)

  if (auth == "false" || role !== "Teacher") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const ProtectedRouteStudent = ({ children }) => {
  let auth = localStorage.getItem("Auth");
  let role = localStorage.getItem("Role");
  console.log(role)

  if (auth == "false" || role != "Student") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default function PageRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRouteAdmin>
              <Admin />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/teacher"
          element={
            <ProtectedRouteTeacher>
              <Teacher />
            </ProtectedRouteTeacher>
          }
        />
        <Route
          path="/class"
          element={
            <ProtectedRouteStudent>
              <ClassList />
            </ProtectedRouteStudent>
          }
        />
        <Route
          path="/module/:module"
          element={
            <ProtectedRouteStudent>
              <Module />
            </ProtectedRouteStudent>
          }
        />
      </Routes>
    </Router>
  );
}
