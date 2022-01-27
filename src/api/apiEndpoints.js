import axios from "axios";

const URI = "https://61f16018072f86001749f198.mockapi.io/";

export const fetchData = () => {
  return axios.get(URI + "employees");
};

export const addEmployee = (data) => {
  return axios.post(URI + `employees`, data);
};

export const updateEmpState = (id, stateName) => {
  return axios.put(URI + `employees/${id}`, { status: stateName });
};
