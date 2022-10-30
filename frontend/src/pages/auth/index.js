import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Tabs } from "flowbite-react";
import LoginPage from "../../components/Login";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const adminLogin = async (e) => {
    e.preventDefault();

    const body = {
      email: email,
      password: password,
    };

    await axios
      .post(`http://localhost:3001/api/admin/login`, body)
      .then((res) => {
        setEmail("");
        setPassword("");
        localStorage.setItem("Token", res.data.token);
        localStorage.setItem("Role", "Admin");
        localStorage.setItem("Auth", true);
        navigate("/admin", { replace: true });
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const teacherLogin = async (e) => {
    e.preventDefault();

    const body = {
      email: email,
      password: password,
    };

    await axios
      .post(`http://localhost:3001/api/teacher/login`, body)
      .then((res) => {
        setEmail("");
        setPassword("");
        localStorage.setItem("Token", res.data.token);
        localStorage.setItem("Role", "Teacher");
        localStorage.setItem("Auth", true);
        navigate("/teacher", { replace: true });
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const studentLogin = async (e) => {
    e.preventDefault();

    const body = {
      email: email,
      password: password,
    };

    await axios
      .post(`http://localhost:3001/api/student/login`, body)
      .then((res) => {
        setEmail("");
        setPassword("");
        localStorage.setItem("Token", res.data.token);
        localStorage.setItem("Role", "Student");
        localStorage.setItem("Auth", true);
        navigate("/class", { replace: true });
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <div className="flex h-screen">
      <div className="shadow  w-1/2 justify-center items-center m-auto">
        <Tabs.Group aria-label="Full width tabs" style="fullWidth">
          <Tabs.Item title="Admin">
            <LoginPage
              email={email}
              password={password}
              onClick={adminLogin}
              handleEmail={handleEmail}
              handlePassword={handlePassword}
            />
          </Tabs.Item>
          <Tabs.Item title="Teachers">
            <LoginPage
              email={email}
              password={password}
              onClick={teacherLogin}
              handleEmail={handleEmail}
              handlePassword={handlePassword}
            />
          </Tabs.Item>
          <Tabs.Item title="Students">
            <LoginPage
              email={email}
              password={password}
              onClick={studentLogin}
              handleEmail={handleEmail}
              handlePassword={handlePassword}
            />
          </Tabs.Item>
        </Tabs.Group>
      </div>
    </div>
  );
}
