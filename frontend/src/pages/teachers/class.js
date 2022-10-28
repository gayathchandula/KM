import React, { useEffect, useState } from "react";
import axios from "axios";
import TableChart from "../../components/Table";
import Header from "../../components/Navbar";
import { Table } from "flowbite-react";

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

  const renderOrderBody = (item, index) => (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {item.name}
      </Table.Cell>
      <Table.Cell> {item.teacher}</Table.Cell>
      <Table.Cell> {item.code}</Table.Cell>
    </Table.Row>
  );

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
    <div className=" ">
      <div className="flex  justify-center ">
        <div className="grid grid-cols-2 gap-4 pt-24">
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
                  htmlFor="teacher"
                >
                  Teacher
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="teacher"
                  type="text"
                  placeholder="teacher"
                  onChange={(e) => setTeacher(e.target.value)}
                  value={teacher}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="code"
                >
                  Code
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="code"
                  type="text"
                  placeholder="******************"
                  onChange={(e) => setCode(e.target.value)}
                  value={code}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
          <div className="block p-6 max-w-fit">
            <TableChart data={data} col={col} renderBody={(item, index) => renderOrderBody(item, index)}/>
          </div>
        </div>
      </div>
    </div>
  );
}
