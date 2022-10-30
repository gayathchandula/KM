import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../components/Navbar";
import { Card, Button } from "flowbite-react";

export default function Class() {
  const [data, setData] = useState([]);
  const col = ["name", "teacher", "code"];
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState();
  const [teacher, setTeacher] = useState();
  const [code, setCode] = useState();

  //fetch data
  const fetchData = async () => {
    await axios.get(`http://localhost:3001/api/student/class`).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, [loading]);

  //Data Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      code: code,
      teacher: teacher,
      name: name,
    };

    await axios
      .post(`http://localhost:3001/api/teacher/class`, body)
      .then(() => {
        setName();
        setCode();
        setTeacher();
        setLoading(true);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <div className="bg-gray-300 h-screen">
      <Header />
      <div className="flex justify-center items-center">
        <div className="w-1/2">
          {data.map((item) => (
            <Link
              to={{
                pathname: `/module/${item.name}`,
              }}
            >
              <Card className="m-5">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                  {item.name}
                </h5>
                <p className="font-normal text-gray-700 ">
                  {item.teacher}
                </p>
                <Button>
                  Check Assignemnts
                  <svg
                    className="ml-2 -mr-1 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
