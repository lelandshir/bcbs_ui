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

export {
    type User,
    type UserFormValues
}