import React, { useEffect, useState } from "react";
import axios from "axios";
import TableChart from "../../components/Table";
import { Table } from "flowbite-react";

export default function Assignment() {
  const [data, setData] = useState([]);
  const col = ["name", "teacher", "code"];
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState();
  const [teacher, setTeacher] = useState();
  const [module, setModule] = useState();
  const [file, setFile] = useState();

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

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("teacher", teacher);
    formdata.append("module", module);
    formdata.append("file", file);

    await axios
      .post(`http://localhost:3001/api/teacher/assignment`, formdata)
      .then(() => {
        setName();
        setModule();
        setTeacher();
        setFile();
        setLoading(true);
      })
      .catch((error) => {
        throw new Error(error);
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

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-4">
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
                htmlFor="module"
              >
                Module
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="module"
                type="text"
                placeholder="******************"
                onChange={(e) => setModule(e.target.value)}
                value={module}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="file"
              >
                File
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="file"
                type="file"
                placeholder="******************"
                onChange={(e) => setFile(e.target.files[0])}
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
          <TableChart
            data={data}
            col={col}
            renderBody={(item, index) => renderOrderBody(item, index)}
          />
        </div>
      </div>
    </div>
  );
}
