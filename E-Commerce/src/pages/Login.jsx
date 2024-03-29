import React, { useContext, useState } from "react";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "@chakra-ui/react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });
  const toast = useToast();
  const { setToken, setAuth } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email: formData.email,
        password: formData.pass,
      });

      if (response.data.token) {
        setToken(response.data.token);
        setAuth(true);
        toast({
          title: "Account created.",
          description: "Login successfully!!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
      setFormData({
        email: "",
        pass: "",
      });
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      w={"30%"}
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
          required
        />
        <label htmlFor="pass">Enter your password</label>
        <input
          style={{ border: "1px solid black" }}
          type="password"
          name="pass"
          id="pass"
          value={formData.pass}
          onChange={handleChange}
          required
        />
        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </Box>
  );
}

export default Login;
