import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Button,
  ButtonGroup,
  Image,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";

function Products() {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredData, setFilteredData] = useState([]);

  const fetchDataFromApi = async () => {
    try {
      let response = await axios("https://fakestoreapi.com/products");
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const handleSort = (sortBy) => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortBy === "ratings") {
        return sortOrder === "asc"
          ? a.rating.rate - b.rating.rate
          : b.rating.rate - a.rating.rate;
      } else if (sortBy === "title") {
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
    });
    setFilteredData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilter = (filterBy) => {
    const filteredData = [...data].sort((a, b) => {
      return filterBy === "lowToHigh" ? a.price - b.price : b.price - a.price;
    });
    setFilteredData(filteredData);
  };

  return (
    <div>
      <ButtonGroup spacing="2" mb="4">
        <Button
          variant="solid"
          colorScheme="blue"
          onClick={() => handleSort("ratings")}
        >
          Sort by Ratings
        </Button>
        <Button
          variant="solid"
          colorScheme="blue"
          onClick={() => handleSort("title")}
        >
          Sort by Title
        </Button>
        <Button
          variant="ghost"
          colorScheme="blue"
          onClick={() => handleFilter("lowToHigh")}
        >
          Filter Low to High
        </Button>
        <Button
          variant="ghost"
          colorScheme="blue"
          onClick={() => handleFilter("highToLow")}
        >
          Filter High to Low
        </Button>
      </ButtonGroup>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "1rem",
        }}
      >
        {filteredData.map((item, index) => (
          <Link key={index} to={`/products/${item.id}`}>
            <Card key={index} maxW="sm">
              <CardBody>
                <Image w={"30%"} src={item.image} alt="" borderRadius="lg" />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{item.title.substring(0, 30)}...</Heading>
                  <Text>{item.description.substring(0, 70)}...</Text>
                  <Text color="blue.600" fontSize="2xl">
                    INR : {item.price}
                  </Text>
                  <Text color="blue.600" fontSize="2xl">
                    Ratings :{item.rating.rate}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button variant="solid" colorScheme="blue">
                    View Details
                  </Button>
                  <Button variant="ghost" colorScheme="blue">
                    Add to cart
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Products;
