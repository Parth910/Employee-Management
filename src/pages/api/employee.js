const base_url = "https://free-ap-south-1.cosmocloud.io/development/api";
// creating header
const myHeaders = new Headers();
myHeaders.append("projectId", "66af25d34399726caf52655f");
myHeaders.append("environmentId", "66af25d34399726caf526560");

// Get list of all employees
const getEmployees = async (limit, offset) => {
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  const response = await fetch(base_url + "/employee?limit=" + limit + "&offset=" + offset, requestOptions);
  const data = await response.json();
  return data;
};

// Get one employee by id
const getEmployee = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  const response = await fetch(base_url + "/employee/" + id, requestOptions);
  const data = await response.json();

  return data;
};

// Create new employee
exports.createEmployee = async (employeeData) => {
  const raw = JSON.stringify(employeeData);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const response = await fetch(base_url + "/employee", requestOptions);
  const data = await response.json();
  return data;
};

// Delete an employee
exports.deleteEmployee = async (id) => {
  const raw = JSON.stringify({});
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const response = await fetch(base_url + "/employee/" + id, requestOptions);
  const updatedDetail = await getEmployees(10, 0);
  return updatedDetail.data;
};

// Update an employee
exports.updateEmployee = async (id, details) => {
  const raw = JSON.stringify(details);
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const response = await fetch(base_url + "/employee/" + id, requestOptions);
  const updatedDetail = await getEmployee(id);
  return updatedDetail;
};

exports.getEmployees = getEmployees;
exports.getEmployee = getEmployee;
