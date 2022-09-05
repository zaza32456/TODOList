import axios from "axios";

const baseUrl =  "/api/persons"

const getPage = () => {
  return axios.get(baseUrl)
}

const getAll = () => {
  const requst = axios.get(baseUrl)
  console.log("get")
  return requst.then(res => res.data)
}

const create = newObject => {
  const requst = axios.post(baseUrl, newObject)
  return requst.then(res => res.data)
}

const update = (id, newObject) => {
  const requst = axios.put(`${baseUrl}/${id}`, newObject)
  return requst.then(res => res.data)
}

const del = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {
  getPage,
  getAll,
  create,
  update,
  del
}