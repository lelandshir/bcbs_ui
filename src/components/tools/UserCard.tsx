import React from "react";
import { deleteUser } from "../../services/api";

interface User {
  id: number;
  first_name?: string;
  last_name?: string;
  email: string;
  avatar?: string;
}

interface UserCardProps {
  userKey?: number;
  user: User;
  onDelete: () => void;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete, setUsers, userKey }) => {
  const handleDelete = async (): Promise<void> => {
    try {
      await deleteUser(user.id);
      onDelete();
      setUsers(prevUsers => [...prevUsers.filter(user => user.id !== userKey)])
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="user-card">
      <img src={user.avatar} alt="User Avatar" />
      <h4>{`${user.first_name} ${user.last_name}`}</h4>
      <p>{user.email}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default UserCard;
