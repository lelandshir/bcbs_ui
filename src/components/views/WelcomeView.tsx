import React, { useEffect, useState } from "react";
import useUserData from "../../hooks/useUserData";
import UserCard from "../../components/tools/UserCard";
import LoginView from "./LoginView";
import "../styles/WelcomeView.css";
import { User } from "../../types";



const WelcomeView: React.FC = () => {
  const {
    users,
    setUsers,
    currentPage,
    totalPages,
    fetchUsers,
    handleDeleteUser,
    handleAddUser,
    handlePageChange,
    getUniqueId
  } = useUserData();

  const isLoggedIn: boolean = !!localStorage.getItem("token");
  const [showAddUserForm, setShowAddUserForm] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<User>({
    id: getUniqueId(),
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });

  const loggedInUser = users.find((user: User) => user.email === localStorage.getItem("email")) || users.find((user: User) => user.id === Number(localStorage.getItem("userId")));

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    setUsers([]);
  };

  const handleAddUserFormToggle = (): void => {
    setShowAddUserForm(!showAddUserForm);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUserSubmit = (): void => {
    handleAddUser(newUser);
    setShowAddUserForm(false);
    setNewUser({
      id: 0,
      first_name: "",
      last_name: "",
      email: "",
      avatar: ""
    })
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUsers();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <LoginView />;
  }

  return (
    <div className="welcome-view">
      <h2>{`Welcome ${loggedInUser?.first_name}!`}</h2>
      <h3>Your Connections</h3>
      <div className="user-list">
        {users.map((user: any) => (
          <UserCard
            key={user.id}
            userKey={user.id}
            user={user}
            onDelete={() => handleDeleteUser(user.id)}
            setUsers={setUsers}
          />
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
      <button
        className="add-user-button"
        style={{ backgroundColor: showAddUserForm ? "red" : "green" }}
        onClick={handleAddUserFormToggle}
      >
        {showAddUserForm ? "Adding User" : "Add User"}
      </button>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      {showAddUserForm && (
        <div className="add-user-form-modal">
          <div className="add-user-form-content">
            <h2>Add a User</h2>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={newUser.first_name}
              onChange={handleInputChange}
              className="form-input"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={newUser.last_name}
              onChange={handleInputChange}
              className="form-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleInputChange}
              className="form-input"
            />
            <input
              type="text"
              name="avatar"
              placeholder="Avatar URL"
              value={newUser.avatar}
              onChange={handleInputChange}
              className="form-input"
            />
            <button onClick={handleAddUserSubmit} className="form-button">
              Add
            </button>
            <button onClick={handleAddUserFormToggle} className="form-button">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default WelcomeView;
