"use client"
import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Login from "@/app/components/LoginPage";
import Sidebar from "@/app/components/SideBar";


export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is already authenticated by looking for a token
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // Set as authenticated if the token is found
    }
  }, []);

  const handleLoginSuccess = () => {
    // Once the user logs in successfully, set authentication to true
    setIsAuthenticated(true);
  };

  return (
    <div>
      {isAuthenticated ? (
        // Show Dashboard and Sidebar after successful login
        <>
          <Sidebar />
          <Dashboard />
        </>
      ) : (
        // Show the login page until authenticated
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}
