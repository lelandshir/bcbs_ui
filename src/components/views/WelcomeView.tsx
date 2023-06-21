import React, { useEffect } from "react";
import useUserData from "../hooks/useUserData";
import UserCard from "../components/tools/UserCard";
import LoginView from "../components/LoginView"
import "./styles/WelcomeView.css"

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
  } = useUserData();

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    setUsers([]); 
  };

  const isLoggedIn: boolean = !!localStorage.getItem("token");

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
      <h2>Welcome!</h2>
      <h3>List of Friends:</h3>
      <div className="user-list">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            users={users}
            onDelete={() => handleDeleteUser(user.id)}
            setUsers={setUsers}
          />
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <button className="add-user-button" onClick={handleAddUser}>
        Add User
      </button>
      <button onClick={handleLogout} className="logout-link">Logout</button>
    </div>
  );
};

export default WelcomeView;
