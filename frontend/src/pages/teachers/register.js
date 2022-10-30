import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Navbar";
import TableChart from "../../components/Table";
import { Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function Students() {
  const [data, setData] = useState([]);
  const col = ["name", "email"];
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //fetch data
  const fetchData = async () => {
    await axios
      .get(`http://localhost:3001/api/teacher/students/all`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [loading]);

  //Employee Data Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      email: email,
      password: password,
      name: name,
    };

    await axios
      .post(`http://localhost:3001/api/teacher/students/register`, body)
      .then(() => {
        setName();
        setEmail("");
        setPassword("");
        setLoading(true);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const renderOrderBody = (item, index) => (
    <Table.Row className="bg-white ">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 ">
        {item.name}
      </Table.Cell>
      <Table.Cell> {item.email}</Table.Cell>
    </Table.Row>
  );

  if (loading) {
    return "loading...";
  }

  return (
    <div className="">
      <div className="flex  justify-center ">
        <div className="grid grid-cols-2 gap-4 pt-24 ">
          <div className="block p-6 rounded-lg shadow-lg bg-white max-w ">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
          <div className="block p-6 max-w-fit">
            <TableChart
              data={data}
              col={col}
              renderBody={(item, index) => renderOrderBody(item, index)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
