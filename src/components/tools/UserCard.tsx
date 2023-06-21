import React from "react";
import { deleteUser } from "../../services/api";
import { User } from "../../types";
import "../styles/UserCard.css";

interface UserCardProps {
  userKey?: number;
  user: User;
  onDelete: () => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete, setUsers, userKey }) => {
  const handleDelete = async (): Promise<void> => {
    try {
      await deleteUser(user.id);
      onDelete();
      setUsers((prevUsers) => [...prevUsers.filter((user) => user.id !== userKey)]);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="user-card">
      <img src={user.avatar} alt="User Avatar" className="user-card-avatar" />
      <h4 className="user-card-name">{`${user.first_name} ${user.last_name}`}</h4>
      <p className="user-card-email">{user.email}</p>
      <button className="user-card-delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default UserCard;
