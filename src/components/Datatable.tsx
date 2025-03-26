/*
This React component, DataTable, displays a table of unit extensions.
 It fetches data from a specified API endpoint using Axios, handling 
 authentication with access and refresh tokens stored in local storage.
  The component checks if the access token is expired; if so,
   it attempts to refresh it using the refresh token. If both tokens are expired,
    it navigates the user to the "/react/" route (login page).

The component uses Material-UI components for styling, including Paper,
 Typography, and TextField for a search input. It utilizes the DataGrid
  component from @mui/x-data-grid to display the fetched data in a sortable
   and paginated table. Users can search the data, and the table's columns 
   can be sorted. The component also hides the "ID" column by default
*/

// Import React and necessary hooks for state management and side effects
import React, { useState, useEffect, useCallback } from "react";

// Import Material-UI components for styling
import { Box, TextField, Typography, Paper } from "@mui/material";

// Import DataGrid and related components for tabular data display
import {
  DataGrid,
  GridColDef,
  GridSortModel,
  GridColumnVisibilityModel,
} from "@mui/x-data-grid";

// Import the useNavigate hook for route navigation
import { useNavigate } from "react-router-dom";

// Import Axios for HTTP requests
import axios from "axios";

// Define the structure for DataRow used in the table
interface DataRow {
  id: number;
  location_name: string;
  contact_number: string;
}

// Define a Token interface for access and refresh tokens
interface Token {
  accessToken: string;
  refreshToken: string;
}

// Define the DataTable functional component
const DataTable: React.FC = () => {
  // State for data retrieved from the API
  const [data, setData] = useState<DataRow[]>([]);
  const [filteredData, setFilteredData] = useState<DataRow[]>([]);
  const [search, setSearch] = useState<string>("");

  // Sorting state for the DataGrid
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: "location_name", sort: "asc" },
  ]);

  // State for managing column visibility
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({
      id: false, // Hide the "ID" column
      location_name: true,
      contact_number: true,
    });

  const navigate = useNavigate();

  // Decode JWT token and extract expiration time
  const decodeToken = useCallback((token: string): number | null => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp ? payload.exp * 1000 : null;
    } catch {
      return null;
    }
  }, []);

  // Check if a token has expired
  const isTokenExpired = useCallback(
    (token: string): boolean => {
      const expirationTime = decodeToken(token);
      return expirationTime ? Date.now() > expirationTime : true;
    },
    [decodeToken]
  );

  // Refresh access token using refresh token
  const refreshAccessToken = useCallback(
    async (refreshToken: string): Promise<string | null> => {
      try {
        const response = await axios.post<{ accessToken: string }>(
          "https://msicu.org/api/token/refresh/",
          { refresh: refreshToken }
        );
        return response.data.accessToken;
      } catch {
        return null;
      }
    },
    []
  );

  // Fetch data from API
  const fetchData = useCallback(async (accessToken: string) => {
    try {
      const response = await axios.get<DataRow[]>(
        "https://msicu.org/api/unit-extensions",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setData(response.data);
      setFilteredData(response.data);
    } catch {
      console.error("Error fetching data.");
    }
  }, []);

  // Validate tokens and fetch data
  const checkTokensAndFetchData = useCallback(async () => {
    const tokens: Token = {
      accessToken: localStorage.getItem("accessToken") || "",
      refreshToken: localStorage.getItem("refreshToken") || "",
    };

    if (
      isTokenExpired(tokens.accessToken) &&
      isTokenExpired(tokens.refreshToken)
    ) {
      navigate("/react/");
    } else if (isTokenExpired(tokens.accessToken)) {
      const newAccessToken = await refreshAccessToken(tokens.refreshToken);
      if (newAccessToken) {
        localStorage.setItem("accessToken", newAccessToken);
        fetchData(newAccessToken);
      } else {
        navigate("/react/");
      }
    } else {
      fetchData(tokens.accessToken);
    }
  }, [fetchData, isTokenExpired, navigate, refreshAccessToken]);

  // Trigger token validation and data fetch on component mount
  useEffect(() => {
    checkTokensAndFetchData();
  }, [checkTokensAndFetchData]);

  // Handle search input and filter data
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);

    const filtered = data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
    setFilteredData(filtered);
  };

  // Define the columns
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "location_name", headerName: "Location Name", width: 150 },
    { field: "contact_number", headerName: "Contact Number", width: 150 },
  ];

  return (
    <Paper>
      <Typography
        variant="h4"
        color="primary"
        align="center"
        sx={{ marginBottom: 2 }}
      >
        Unit Extensions
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearch}
          style={{ width: 400 }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          justifyContent: "center",
          "& .MuiDataGrid-cell": {
            fontSize: "18px",
          },
        }}
      >
        <div>
          <DataGrid
            rows={filteredData}
            columns={columns}
            pageSizeOptions={[15, 25, 50, 100]}
            pagination
            sortModel={sortModel}
            onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
            disableColumnMenu
            disableRowSelectionOnClick
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) =>
              setColumnVisibilityModel(newModel)
            }
          />
        </div>
      </Box>
    </Paper>
  );
};

export default DataTable;
