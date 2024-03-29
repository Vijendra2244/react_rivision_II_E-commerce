import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Prodcuts from "../pages/Prodcuts";
import SingleProducts from "../pages/SingleProducts";
import { AuthContext } from "../context/AuthContext";

function AllRoutes() {
  const { auth } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/products"
        element={auth ? <Prodcuts /> : <Navigate to="/login" />}
      />
      <Route
        path="/products/:id"
        element={auth ? <SingleProducts /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default AllRoutes;
