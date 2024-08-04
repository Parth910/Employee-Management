"use client";
import React, { useState, useEffect } from "react";
import { deleteEmployee, getEmployees } from "./api/employee";
import Link from "next/link";

const EmployeeManagementUI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [pageLimit, setPageLimit] = useState(10);
  const [pageOffset, setPageOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({ name: "", email: "", department: "", role: "", status: "Active" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadEmployees = async () => {
      setIsLoading(true);
      try {
        const data = await getEmployees(pageLimit, pageOffset);
        setEmployees(data.data);
        setPageInfo(data.page);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEmployees();
  }, []);

  useEffect(() => {
    // console.log(employees)
    setFilteredEmployees(employees.filter((employee) => Object.values(employee).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))));
  }, [searchTerm, employees]);

  const handleInputChange = (e) => {
    setCurrentEmployee({ ...currentEmployee, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (currentEmployee.name && currentEmployee.email && currentEmployee.department && currentEmployee.role) {
      if (isEditing) {
        setEmployees(employees.map((emp) => (emp.id === currentEmployee.id ? currentEmployee : emp)));
      } else {
        setEmployees([...employees, { ...currentEmployee, id: employees.length + 1 }]);
      }
      setIsModalOpen(false);
      setCurrentEmployee({ name: "", email: "", department: "", role: "", status: "Active" });
      setIsEditing(false);
    }
  };

  const editEmployee = (employee) => {
    setCurrentEmployee(employee);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteEmployee = async (id) => {
    const data = await deleteEmployee(id);
    setEmployees(data);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="h-screen bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Employee Dashboard</h1>

            <div className="mb-6 flex justify-between items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 text-gray-900 rounded-full border-2 border-gray-300 focus:outline-none focus:border-indigo-500 transition-all duration-300"
                />
                <svg className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <Link href={`/employee/new`}>
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105">
                  Add New Employee
                </button>
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Address</th>
                    <th className="py-3 px-6 text-center">Email</th>
                    <th className="py-3 px-6 text-center">Phone</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee._id} className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-200">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <Link href={`/employee/${employee._id}`}>
                          <div className="flex items-center">
                            <div>
                              <span className="font-medium">{employee.name}</span>
                              <div className="text-xs text-gray-500">{employee.email}</div>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <span>{employee.address}</span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <span className="py-1 px-3 rounded-full text-xs">{employee.email}</span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <span className="py-1 px-3 rounded-full text-xs">{employee.phone}</span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <Link href={`/employee/${employee._id}`}>
                            <button onClick={() => editEmployee(employee)} className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110 transition-all duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </button>
                          </Link>
                          <button onClick={() => handleDeleteEmployee(employee._id)} className="w-6 mr-2 transform hover:text-red-500 hover:scale-110 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" id="my-modal">
          <div className="relative p-8 bg-white w-96 max-w-xl mx-auto rounded-2xl shadow-2xl transform transition-all duration-300 ease-in-out">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{isEditing ? "Edit Employee" : "Add New Employee"}</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={currentEmployee.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={currentEmployee.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={currentEmployee.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={currentEmployee.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mt-8">
              <button
                onClick={handleSubmit}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300"
              >
                {isEditing ? "Update Employee" : "Add Employee"}
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default EmployeeManagementUI;
