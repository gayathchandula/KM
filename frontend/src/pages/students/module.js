import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Accordion, Button } from "flowbite-react";
import Header from "../../components/Navbar";

export default function Module() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetch data
  const fetchData = async () => {
    const module = params.module;
    await axios
      .get(`http://localhost:3001/api/student/assignment/${module}`)
      .then((res) => {
        setData(res.data.upload);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [loading]);

  return (
    <div className="bg-gray-300 h-screen">
      <Header />
      <div className="flex justify-center items-center">
        <div className="w-max ">
          {data.map((item) => (
            <Accordion alwaysOpen={true} className="m-5 bg-white">
              <Accordion.Panel >
                <Accordion.Title>{item.class}</Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500 ">
                    {item.name}
                  </p>
                  <p className="text-gray-500 ">
                    {item.teacher}{" "}
                    <a
                      href={item.file}
                      target="_blank"
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      <i className="bx bxs-download"></i>
                    </a>
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}
