import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Admin from './Admin/index';
import Teacher from './teachers/index';
import ClassList from './students/class';
import Module from './students/module';
import Login from './auth/index';



export default function PageRoutes() {
    return (
      <Router>
          <Routes>
          <Route path="/login" element={<Login/>} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/teacher" element={<Teacher/>} />
            <Route path="/class" element={<ClassList/>} />
            <Route path="/module/:module" element={<Module/>} />
          </Routes>
      </Router>
    );
  }