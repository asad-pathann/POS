import axios from "axios";

let BASE_URL = "http://localhost:8888/api/users";

// regiter the user data
export const RegisterUser = async (userData) => {
  try {
    let response = await axios.post(`${BASE_URL}/register-user`, userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error; // Error ko propagate karein
  }
};

export const LoginUser = async (userData) => {
  let response = await axios.post(`${BASE_URL}/login-user`, userData);
  return response.data;
};

export const GetAllUsers = async () => {
  let response = await axios.get(`${BASE_URL}/get-user`);
  return response.data;
};
