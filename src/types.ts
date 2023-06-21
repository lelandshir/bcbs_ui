interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar?: string;
}

interface UserFormValues {
    first_name?: string;
    last_name?: string;
    email?: string;
    avatar?: string;
  }

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

export {
    type User,
    type UserFormValues,
    type useUserDataResult
}