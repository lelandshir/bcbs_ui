import { useState, useEffect } from "react";
import axios from "axios";


interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface useUserDataResult {
  users: User[];
  currentPage: number;
  totalPages: number;
  fetchUsers: () => Promise<void>;
  handleDeleteUser: (id: number) => Promise<void>;
  handleAddUser: () => Promise<void>;
  handlePageChange: (pageNumber: number) => void;
  setUsers:any;
}

const useUserData = (): useUserDataResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [deletedUsers, setDeletedUsers] = useState<number[]>([]);


  const getUniqueId = () => {
    const min = 100000; 
    const max = 999999; 
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum;
  };

  // useEffect(() => {
  //   fetchUsers();
  // });

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

  const handleAddUser = async (): Promise<void> => {
    const newUser = {
      password: 'spongey123',
      job: "Software Engineer",
      id: getUniqueId(), 
      first_name: "John", 
      last_name: "Doe", 
      email: "jd@gmail.com", 
      avatar: "https://static.wikia.nocookie.net/cartoons/images/e/ed/Profile_-_SpongeBob_SquarePants.png/revision/latest?cb=20230305115632"
    };

    try {
      await axios.post("https://reqres.in/api/users", newUser);
      // fetchUsers(); // Note: Can fetch user list after addition however API doesn't allow us to add users so it is pointless
      setUsers(prevUsers => [...prevUsers, newUser])
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
  };
};

export default useUserData;
