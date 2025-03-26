// Import React and useState for state management in the component.
import React, { useState } from "react";

// Import Axios for making HTTP requests and Axios-related types for error handling.
import axios, { AxiosError, AxiosResponse } from "axios";

// Import the useNavigate hook from react-router-dom for page navigation.
import { useNavigate } from "react-router-dom";

// Import Material-UI components for creating a styled login form.
import { TextField, Button, Typography, Box } from "@mui/material";

// Define the structure of the token response returned from the API.
interface TokenResponse {
  access: string;
  refresh: string;
}

// Define the LoginPage functional component as a React FunctionComponent.
const LoginPage: React.FC = () => {
  // State to store the username entered by the user.
  const [username, setUsername] = useState<string>("");

  // State to store the password entered by the user.
  const [password, setPassword] = useState<string>("");

  // State to store error messages for the login process.
  const [error, setError] = useState<string | null>(null);

  // Hook to enable navigation to other routes in the application.
  const navigate = useNavigate();

  // State to manage the loading state of the login button.
  const [loading, setLoading] = useState<boolean>(false);

  // Function to handle the click event for the login button.
  const handleClick = async () => {
    console.log("Login button clicked."); // Log button click
    setLoading(true); // Set loading to true to show the loading indicator.
    try {
      console.log("Sending login request with:", { username, password }); // Log input data
      // Send a POST request to the API with the username and password.
      const response: AxiosResponse<TokenResponse> = await axios.post(
        "https://msicu.org/api/token",
        { username, password }
      );

      console.log("Login successful. Tokens received:", response.data); // Log received tokens

      // Store the access and refresh tokens in local storage.
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      // Navigate to the unit extensions page after successful login.
      navigate("/react/u_ext");
    } catch (err) {
      console.error("Login failed:", err); // Log the error
      // Handle Axios errors specifically for failed requests.
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        if (axiosError.response) {
          console.error(
            "API returned an error:",
            axiosError.response.data
          ); // Log server response
          setError(`Login failed: ${JSON.stringify(axiosError.response.data)}`);
        } else {
          console.error("Network error occurred."); // Log network errors
          setError("Login failed: Network error.");
        }
      } else {
        console.error("Unexpected error:", err); // Log unexpected errors
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false); // Reset the loading state after the request completes.
      console.log("Login request completed."); // Log completion
    }
  };

  // Function to handle the form submission event for logging in.
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior.
    console.log("Form submitted."); // Log form submission
    setError(null); // Clear any existing error messages before submission.
    try {
      console.log("Sending login request with:", { username, password }); // Log input data
      // Send a POST request to the API with the username and password.
      const response: AxiosResponse<TokenResponse> = await axios.post(
        "https://msicu.org/api/token",
        { username, password }
      );

      console.log("Login successful. Tokens received:", response.data); // Log received tokens

      // Store the access and refresh tokens in local storage.
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      // Navigate to the unit extensions page after successful login.
      navigate("/react/u_ext");
    } catch (err) {
      console.error("Login failed:", err); // Log the error
      // Handle Axios errors specifically for failed requests.
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;

        if (axiosError.response) {
          console.error(
            "API returned an error:",
            axiosError.response.data
          ); // Log server response
          setError(`Login failed: ${JSON.stringify(axiosError.response.data)}`);
        } else {
          console.error("Network error occurred."); // Log network errors
          setError("Login failed: Network error.");
        }
      } else {
        console.error("Unexpected error:", err); // Log unexpected errors
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false); // Reset the loading state after the request completes.
      console.log("Login request completed."); // Log completion
    }
  };

  // Render the login form and display the error messages if present.
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      padding={3}
      sx={{
        m: { xs: 2, sm: 3, md: 5 },
      }}
    >
      {/* Define the form for the login inputs and submit button */}
      <form onSubmit={handleLogin} style={{ width: "300px" }}>
        {/* Display the login title */}
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        {error && (
          // Show an error message if present
          <Typography variant="body1" color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        <TextField
          label="Username"
          value={username}
          onChange={(e) => {
            console.log("Username changed to:", e.target.value); // Log username input
            setUsername(e.target.value);
          }}
          fullWidth
          margin="normal"
          autoFocus
          placeholder="Username"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            console.log("Password changed to:", e.target.value); // Log password input
            setPassword(e.target.value);
          }}
          fullWidth
          margin="normal"
          placeholder="Password"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          style={{ marginTop: "16px" }}
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
