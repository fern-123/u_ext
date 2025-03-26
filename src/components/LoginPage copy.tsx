// import React, { useState } from "react";
// import axios, { AxiosError, AxiosResponse } from "axios";
// import { useNavigate } from "react-router-dom";
// import { TextField, Button, Typography, Box } from "@mui/material";

// interface TokenResponse {
//   access: string;
//   refresh: string;
// }


// // arrow function arguments sit inside the parenthesis
// // React.FC = React.FunctionComponent
// const LoginPage: React.FC = () => {
//   // State always needs to be initialized with a value

//   // useState returns an array with two elements
//   // The first element is the current value of the state
//   const [username, setUsername] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   console.log(username, password, " states initialized");

//   // The <string | null> part in useState <string | null>(null) is a TypeScript union type. 
//   // It means that the error state can hold either a string value or null
//   const [error, setError] = useState<string | null>(null);

//   // useNavigate is a hook from react-router-dom that provides 
//   // a navigate function to redirect the user to another page
//   const navigate = useNavigate();

//   // The function handleLogin is an asynchronous 
//   // function that takes an event as an argument
//   const handleLogin = async (e: React.FormEvent) => {
//     // preventDefault is a method on the event object;
//     // overrides the default behavior of the form submission
//     // 
    
    
//     console.log ("entering handleLogin function")
//     e.preventDefault();
//     console.log ("default form submission overridden")
//     // clear error message, rerender page
//     setError(null);
//     console.log ("error message cleared")
//     try {
//       // Axios is a promise-based HTTP client for the browser and Node.js
//       console.log ("sending post request to https://msicu.org/api/token")
//       console.log ("username: " + username + " password: " + password)
//       const response: AxiosResponse<TokenResponse> = await axios.post(
//         "https://msicu.org/api/token",
//         { username, password }
//       );
      
//       console.log("token received")
//       localStorage.setItem("accessToken", response.data.access);
//       localStorage.setItem("refreshToken", response.data.refresh);

//       console.log(localStorage.getItem('accessToken') + " access token stored in local storage")
//       console.log(localStorage.getItem('refreshToken') + " refresh token stored in local storage")
      
//       // navigate to the /u_ext route once tokens are saved in local storage.
//       console.log("navigating to /u_ext");
//       navigate("/react/u_ext");
      
//     } catch (err) {
//       if (axios.isAxiosError(err)) {
//         const axiosError = err as AxiosError;
//         if (axiosError.response) {
//           setError(`Login failed: ${JSON.stringify(axiosError.response.data)}`);
//         } else {
//           setError("Login failed: Network error.");
//         }
//       } else {
//         setError("An unexpected error occurred.");
//       }
//     }
//   };

//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       alignItems="center"
//       //justifyContent="center"
//       minHeight="100vh"
//       padding={3}
//       bgcolor="#f5f5f5"
//     >
//       <form onSubmit={handleLogin} style={{ width: "300px" }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Login
//         </Typography>
//         {error && (
//           <Typography variant="body1" color="error" align="center" gutterBottom>
//             {error}
//           </Typography>
//         )}
//         <TextField
//           label="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           fullWidth
//           margin="normal"
//           autoFocus
//           placeholder="Username"
//         />
//         <TextField
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//           margin="normal"
//           placeholder="Password"
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           type="submit"
//           style={{ marginTop: "16px" }}
//         >
//           Login
//         </Button>
//       </form>
      
      
//     </Box>
//   );
// };

// export default LoginPage;
