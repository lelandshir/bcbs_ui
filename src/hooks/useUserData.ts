import { useState, useEffect } from "react";
import axios from "axios";
import { User, UserFormValues } from "../types"

// TODO: Create a types file for all types

interface useUserDataResult {
  users: User[];
  currentPage: number;
  totalPages: number;
  fetchUsers: () => Promise<void>;
  handleDeleteUser: (id: number) => Promise<void>;
  handleAddUser: (formValues: UserFormValues) => Promise<void>;
  handlePageChange: (pageNumber: number) => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  getUniqueId: () => number;
}

const useUserData = (): useUserDataResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [deletedUsers, setDeletedUsers] = useState<number[]>([]);

  const getUniqueId = (): number => {
    const min = 100000; 
    const max = 999999; 
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum;
  };

  const fetchUsers = async (): Promise<void> => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${currentPage}`);
      const { data, total_pages } = response.data;
      const filteredUsers = data.filter((user: User) => !deletedUsers.includes(user.id));

      setUsers(filteredUsers);
      setTotalPages(total_pages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDeleteUser = async (id: number): Promise<void> => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      // fetchUsers(); // Fetch updated user list after deletion
      setUsers(prevUsers => [...prevUsers.filter(user => user.id !== id)])
      setDeletedUsers((prevDeletedUsers) => [...prevDeletedUsers, id]);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddUser = async (formValues: UserFormValues): Promise<void> => {
    console.log(formValues)
      const newUser = {
        id: getUniqueId(),
        first_name: formValues.first_name || "",
        last_name: formValues.last_name || "",
        email: formValues.email || "",
        avatar: formValues.avatar === "" ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmuppets.disney.com%2Fkermit-the-frog&psig=AOvVaw2IxyFXa4AMHZhE5T9mnu5O&ust=1687455904325000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNjT35_11P8CFQAAAAAdAAAAABAK" : formValues.avatar
      };

      try {
        await axios.post("https://reqres.in/api/users", newUser);
        setUsers((prevUsers: User[]) => [...prevUsers, newUser]);
      } catch (error) {
        console.error("Error adding user:", error);
      }
  };

  const handlePageChange = (pageNumber: number): void => {
    const nextPage = pageNumber;
  
    if (nextPage < 1 || nextPage > totalPages) {
      return; 
    }
  
    if (nextPage > currentPage && users.length === 0) {
      return; 
    }
  
    setCurrentPage(nextPage);
    fetchUsers();
  };

  return {
    users,
    setUsers,
    currentPage,
    totalPages,
    fetchUsers,
    handleDeleteUser,
    handleAddUser,
    handlePageChange,
    getUniqueId
  };
};

export default useUserData;
