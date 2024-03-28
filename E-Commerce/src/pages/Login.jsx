import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://reqres.in/login", formData);
      console.log(response);
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Error during login:", error);
    }
  };

  return (
    <Box
      display="flex"
      w={"15%"}
      m={"auto"}
      border={"1px solid black"}
      borderRadius={"10px"}
      p="1rem"
    >
      <form
        style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">Enter email</label>
        <input
          style={{ border: "1px solid black" }}
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="pass">Enter your password</label>
        <input
          style={{ border: "1px solid black" }}
          type="password"
          name="pass"
          id="pass"
          value={formData.pass}
          onChange={handleChange}
        />
        <input
          style={{
            backgroundColor: "blue",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
          type="submit"
          value="Submit"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </Box>
  );
}

export default Login;
