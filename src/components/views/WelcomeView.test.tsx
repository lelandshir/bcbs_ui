import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WelcomeView from './WelcomeView';

describe('WelcomeView component', () => {
  beforeEach(() => {
    render(<WelcomeView />);
  });

  test('renders "Welcome" message correctly', () => {
    const welcomeMessage = screen.getByText(/Welcome/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  test('displays user connections correctly', () => {
    // Mock user data
    const users = [
      { id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com' },
      { id: 2, first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com' },
    ];
    
    // Set users in the component state
    // Note: You may need to mock the useUserData hook to provide the necessary functions and state
    // Example: jest.mock('../../hooks/useUserData', () => ({ useUserData: jest.fn(() => ({ users, setUsers: jest.fn() })) }));

    // Check if user cards are rendered correctly
    users.forEach(user => {
      const userCard = screen.getByText(`${user.first_name} ${user.last_name}`);
      expect(userCard).toBeInTheDocument();
    });
  });

  test('toggles add user form correctly', () => {
    const addUserButton = screen.getByText('Add User');

    // Initial state: add user form is not displayed
    expect(screen.queryByLabelText('First Name')).toBeNull();
    expect(screen.queryByLabelText('Last Name')).toBeNull();
    expect(screen.queryByLabelText('Email')).toBeNull();
    expect(screen.queryByLabelText('Avatar URL')).toBeNull();

    // Click the "Add User" button to show the form
    fireEvent.click(addUserButton);

    // Add user form should be displayed
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Avatar URL')).toBeInTheDocument();

    // Click the "Cancel" button to hide the form
    fireEvent.click(screen.getByText('Cancel'));

    // Add user form should be hidden again
    expect(screen.queryByLabelText('First Name')).toBeNull();
    expect(screen.queryByLabelText('Last Name')).toBeNull();
    expect(screen.queryByLabelText('Email')).toBeNull();
    expect(screen.queryByLabelText('Avatar URL')).toBeNull();
  });

  // Add more tests to cover other functionalities and edge cases
});
