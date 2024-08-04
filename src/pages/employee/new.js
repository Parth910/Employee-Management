"use client";
import "../../app/globals.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ArrowLeftCircleIcon, BookmarkIcon, PencilIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { createEmployee } from "../api/employee";

const EmployeePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [employee, setEmployee] = useState({});
  const [employeeUpdateDetails, setEmployeeUpdateDetails] = useState({ name: "", address: "", email: "", phone: "" });

  const editDetails = () => {
    const employeeDetails = employee;
    delete employeeDetails._id;
    setEmployeeUpdateDetails(employee);
    setIsEditing(!isEditing);
  };
  const updateInfoHandle = (event) => {
    const { name, value } = event.target;
    setEmployeeUpdateDetails((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const saveDetails = async () => {
    const data = await createEmployee(employeeUpdateDetails);
    const id = data.id;
    router.push(`/employee/${id}`);
  };

  const handleDeleteEmployee = async () => {};

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-8">
      <div className="mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <span className="sm:ml-3">
              <Link href={`/`}>
                <ArrowLeftCircleIcon aria-hidden="true" fill="blue" className="-ml-0.5 mr-1.5 h-8 w-8 " />
              </Link>
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Add New Employee</h2>
            </div>
            {isEditing ? (
              <div className="mt-5 flex lg:ml-4 lg:mt-0">
                <span className="hidden sm:block">
                  <Link href={`/`}>
                    <button
                      type="button"
                      // onClick={editDetails}
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Cancle
                    </button>
                  </Link>
                </span>
                <span className="sm:ml-3">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={saveDetails}
                  >
                    <BookmarkIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" />
                    Create
                  </button>
                </span>
              </div>
            ) : (
              <div className="mt-5 flex lg:ml-4 lg:mt-0">
                <span className="hidden sm:block">
                  <button
                    type="button"
                    onClick={editDetails}
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <PencilIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
                    Edit
                  </button>
                </span>
              </div>
            )}
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
                {!isEditing ? (
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{employee.name}</dd>
                ) : (
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={updateInfoHandle}
                    value={employeeUpdateDetails.name}
                    placeholder={"name"}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                )}
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
                {!isEditing ? (
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{employee.address}</dd>
                ) : (
                  <textarea
                    id="address"
                    name="address"
                    type="text"
                    value={employeeUpdateDetails.address}
                    onChange={updateInfoHandle}
                    placeholder={"Address"}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                )}
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                {!isEditing ? (
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{employee.email}</dd>
                ) : (
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={employeeUpdateDetails.email}
                    onChange={updateInfoHandle}
                    placeholder={"Email"}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                )}
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Phone</dt>
                {!isEditing ? (
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{employee.phone}</dd>
                ) : (
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    onChange={updateInfoHandle}
                    value={employeeUpdateDetails.phone}
                    placeholder={"Phone"}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                )}
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
