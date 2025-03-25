import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DataTable from './components/Datatable';
const App: React.FC = () => {
     const isAuthenticated = !!localStorage.getItem('accessToken'); // Check if user is logged in (token exists)

     return (
        <Router>
            <Routes>
                {/* Redirect to DataTable if authenticated, else go to LoginPage */}
                <Route
                    path="/react"
                    element={<LoginPage />}
                    //element={isAuthenticated ? <Navigate to="/u_ext" /> : <LoginPage />}
                />
                <Route
                    path="/react/u_ext"
                    element={isAuthenticated ? <DataTable /> : <Navigate to="/react/u_ext" />}
                />
            </Routes>
        </Router>
    );
};

export default App;


