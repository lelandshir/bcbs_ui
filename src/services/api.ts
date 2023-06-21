import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const fetchUsers = async (page: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

export const deleteUser = async (userId: number) => {
  try {
    await axios.delete(`${API_BASE_URL}/users/${userId}`);
  } catch (error) {
    throw new Error("Error deleting user");
  }
};
