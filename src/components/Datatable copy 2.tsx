// // Import React and various hooks for state management and side effects.
// import React, { useState, useEffect, useCallback } from "react";

// // Import MUI components for UI styling.
// import { Box, TextField, Typography, Paper } from "@mui/material";

// // Import DataGrid and related components for displaying and managing tabular data.
// import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";

// // Import the useNavigate hook for navigation between routes.
// import { useNavigate } from "react-router-dom";

// // Import Axios for making HTTP requests.
// import axios from "axios";

// // Define a TypeScript interface for the structure of data rows.
// interface DataRow {
//   id: number;
//   location_name: string;
//   contact_number: string;
// }

// // Define a TypeScript interface for tokens used in authentication.
// interface Token {
//   accessToken: string;
//   refreshToken: string;
// }

// // Define the DataTable functional component.
// const DataTable: React.FC = () => {
//   // Initialize state for storing and managing fetched data.
//   const [data, setData] = useState<DataRow[]>([]);

//   // Initialize state for storing and managing filtered data.
//   const [filteredData, setFilteredData] = useState<DataRow[]>([]);

//   // Initialize state for managing the search query entered by the user.
//   const [search, setSearch] = useState<string>("");

//   // Initialize state for handling sorting of the DataGrid.
//   const [sortModel, setSortModel] = useState<GridSortModel>([
//     { field: "location_name", sort: "asc" },
//   ]);

//   // Create a navigate function for routing within the app.
//   const navigate = useNavigate();

//   // Decode the JWT token to extract the expiration time.
//   const decodeToken = useCallback((token: string): number | null => {
//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       return payload.exp ? payload.exp * 1000 : null;
//     } catch {
//       return null;
//     }
//   }, []);

//   // Check if a token is expired by comparing its expiration time with the current time.
//   const isTokenExpired = useCallback(
//     (token: string): boolean => {
//       const expirationTime = decodeToken(token);
//       return expirationTime ? Date.now() > expirationTime : true;
//     },
//     [decodeToken]
//   );

//   // Refresh the access token using the refresh token via an API call.
//   const refreshAccessToken = useCallback(
//     async (refreshToken: string): Promise<string | null> => {
//       try {
//         const response = await axios.post<{ accessToken: string }>(
//           "https://msicu.org/api/token/refresh",
//           { refreshToken }
//         );
//         return response.data.accessToken;
//       } catch (error) {
//         console.error("Error refreshing token:", error);
//         return null;
//       }
//     },
//     []
//   );

//   // Fetch data from the API using the access token for authentication.
//   const fetchData = useCallback(async (accessToken: string) => {
//     try {
//       const response = await axios.get<DataRow[]>(
//         "https://msicu.org/api/unit-extensions",
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );
//       setData(response.data);
//       setFilteredData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }, []);

//   // Validate tokens and decide whether to refresh the token or fetch data directly.
//   const checkTokensAndFetchData = useCallback(async () => {
//     const tokens: Token = {
//       accessToken: localStorage.getItem("accessToken") || "",
//       refreshToken: localStorage.getItem("refreshToken") || "",
//     };

//     if (
//       isTokenExpired(tokens.accessToken) &&
//       isTokenExpired(tokens.refreshToken)
//     ) {
//       console.error("Both tokens have expired. Please log in.");
//       navigate("/react/");
//     } else if (isTokenExpired(tokens.accessToken)) {
//       const newAccessToken = await refreshAccessToken(tokens.refreshToken);
//       if (newAccessToken) {
//         localStorage.setItem("accessToken", newAccessToken);
//         fetchData(newAccessToken);
//       } else {
//         console.error("Error refreshing access token. Please log in.");
//         navigate("/react/");
//       }
//     } else {
//       fetchData(tokens.accessToken);
//     }
//   }, [fetchData, isTokenExpired, navigate, refreshAccessToken]);

//   // Trigger data validation and fetching when the component mounts.
//   useEffect(() => {
//     checkTokensAndFetchData();
//   }, [checkTokensAndFetchData]);

//   // Filter the data based on the search query entered by the user.
//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const query = event.target.value.toLowerCase();
//     setSearch(query);

//     const filtered = data.filter((row) =>
//       Object.values(row).some((value) =>
//         String(value).toLowerCase().includes(query)
//       )
//     );
//     setFilteredData(filtered);
//   };

//   // Define the columns to be displayed in the DataGrid.
//   const columns: GridColDef[] = [
//     { field: "id", headerName: "ID", width: 10, sortable: true },
//     { 
//       field: "location_name", 
//       headerName: "Name", 
//       width: 280, 
//       sortable: true,
//     },
//     {
//       field: "contact_number",
//       headerName: "Extension #",
//       width: 250,
//       sortable: true,
//       },
//   ];  
//   const [columnVisibilityModel, setColumnVisibilityModel] = useState<Record<string, boolean>>({
//     id: false, // Hide the "id" column
//   });
  
  
//   // Render the DataTable component.
//   return (
//     <Paper> 
//       {/* Display the title at the top of the page */}
//       <Typography
//         variant="h4"
//         color="primary"
//         align="center"
//         sx={{ marginBottom: 2 }}
//       >
//         Unit Extensions
//       </Typography>

//       {/* Display the search bar */}
//       <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
//         <TextField
//           label="Search"
//           variant="outlined"
//           value={search}
//           onChange={handleSearch}
//           style={{ width: 400 }}
//         />
//       </Box>

//       {/* Display the DataGrid */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           "& .MuiDataGrid-cell": {
//             fontSize: "18px", // Customize cell font size
//           },
//         }}
//       >
//         <div style={{ width: 600 }}>
//           <DataGrid
//             rows={filteredData}
//             columns={columns}
//             sx={{
//               margin: 0, // Adds margin around the DataGrid (spacing unit from the theme)
//               padding: 4
//               , // Adds padding inside the DataGrid container
//               "& .MuiDataGrid-root": {
//                 border: "none", // Removes the border around the entire grid
//               },
//               "& .MuiDataGrid-footerContainer": {
//                 borderTop: "none", // Removes the border at the footer
//               },
              
//             }}
//             initialState={{
//               pagination: {
//                 paginationModel: {
//                   pageSize: 100
//                 },
//               },
//             }}
//             pageSizeOptions={[15, 25, 50, 100]}
//             pagination
//             sortModel={sortModel}
//             onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
//             disableRowSelectionOnClick
//             columnVisibilityModel={columnVisibilityModel}
//             onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel (newModel)}
//           />
//         </div>
//       </Box>
//     </Paper> 
//   );
// };

// export default DataTable;
