import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginView from "./LoginView";
import axios from "axios"; // Remove this line

// Mock the axios module
jest.mock("axios");

describe("LoginView", () => {
  test("renders login form", () => {
    render(<LoginView />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test("allows user to switch between login and register mode", () => {
    render(<LoginView />);
    const toggleButton = screen.getByText(/switch to register/i);

    fireEvent.click(toggleButton);
    expect(screen.getByText(/register/i)).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});
