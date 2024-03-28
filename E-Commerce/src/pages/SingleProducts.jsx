import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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

function SingleProducts() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div>
      {product && (
        <Card maxW="sm">
          <CardBody>
            <Image w={"30%"} src={product.image} alt="" borderRadius="lg" />
            <Stack mt="6" spacing="3">
              <Heading size="md">{product.title.substring(0, 30)}...</Heading>
              <Text>{product.description}</Text>
              <Text color="blue.600" fontSize="2xl">
                INR : {product.price}
              </Text>
              <Text color="blue.600" fontSize="2xl">
                Ratings : {product.rating.rate}
              </Text>
              <Text color="blue.600" fontSize="2xl">
                Number of reviews : {product.rating.count}
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
      )}
    </div>
  );
}

export default SingleProducts;
