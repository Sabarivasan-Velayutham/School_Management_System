import axios from "axios";

export default axios.create({
  // baseURL: "https://kollege-api.onrender.com",
  baseURL: "http://localhost:3500",

  headers: { "Content-Type": "application/json" },
});

export const uploadFile = async (data) => {
  try {
      let response = await axios.post("http://localhost:3500/files/upload", data);
      return response.data;
  } catch (error) {
      console.error('Error while calling the api', error.message);
  }
}