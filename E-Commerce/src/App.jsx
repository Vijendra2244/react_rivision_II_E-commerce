import { Link } from "react-router-dom";
import "./App.css";
import AllRoutes from "./allRoutes/AllRoutes";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <>
      <Box
        display={"flex"}
        p="15px"
        justifyContent={"space-between"}
        backgroundColor={"grey"}
        borderRadius={"10px"}
        w="99%"
        m="5px auto"
      >
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/products">Products</Link>
      </Box>
      <AllRoutes />
    </>
  );
}

export default App;
