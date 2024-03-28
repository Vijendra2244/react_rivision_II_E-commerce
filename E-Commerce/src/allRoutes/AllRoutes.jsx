import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Prodcuts from "../pages/Prodcuts";
import SingleProducts from "../pages/SingleProducts";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Prodcuts />} />
      <Route path="/products/:id" element={<SingleProducts />} />
    </Routes>
  );
}

export default AllRoutes;
