// import React, { useState, useEffect } from "react";
// import { Box, TextField, Typography, Paper } from "@mui/material";
// import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
// import axios from "axios";

// interface DataRow {
//   id: number;
//   location_name: string;
//   contact_number: string;
// }

// const DataTable: React.FC = () => {
//   const [data, setData] = useState<DataRow[]>([]);
//   const [filteredData, setFilteredData] = useState<DataRow[]>([]);
//   const [search, setSearch] = useState<string>("");
//   const [sortModel, setSortModel] = useState<GridSortModel>([
//     { field: "location_name", sort: "asc" },
//   ]);
  
//   useEffect(() => {
//     const fetchData = async () => {
//       const accessToken = localStorage.getItem("accessToken");
      
//       if (!accessToken) {
//         console.error("No token found. Please log in.");
//         return;
//       }

//       try {
//         const response = await axios.get<DataRow[]>(
//           "https://msicu.org/api/unit-extensions",
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );
//         setData(response.data);
//         setFilteredData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

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

//   const columns: GridColDef[] = [
//     {
//       field: "location_name",
//       headerName: "Name",
//       width: 250,
//       sortable: true,
//     },
//     {
//       field: "contact_number",
//       headerName: "Extension #",
//       width: 150,
//       sortable: true,
//     },
//   ];

//   return (
//     <Paper>
//       <Typography
//         variant="h4"
//         color="primary"
//         align="center"
//         sx={{ marginBottom: 2 }}
//       >
//         Unit Extensions
//       </Typography>
//       <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
//         <TextField
//           label="Search"
//           variant="outlined"
//           value={search}
//           onChange={handleSearch}
//           style={{ width: 400 }}
//           //style={{ width: '40%' }}
//         />
//       </Box>
//       <Box sx={{ display: "flex", justifyContent: "center" }}>
//         <div style={{ width: 600 }}>
//           <DataGrid
//             rows={filteredData}
//             columns={columns}
//             initialState={{
//               pagination: {
//                 paginationModel: {
//                   pageSize: 10, // Set your initial page size here
//                 },
//               },
//             }}
//             pageSizeOptions={[10, 20, 50, 100]}
//             pagination
//             sortModel={sortModel}
//             onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
//             disableRowSelectionOnClick
//           />
//         </div>
//       </Box>
//     </Paper>
//   );
// };

// export default DataTable;
