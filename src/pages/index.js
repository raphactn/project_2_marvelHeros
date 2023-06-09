import Head from "next/head";
import { useEffect, useState } from "react";
import api from "./api/marvel";
import {
  Image,
  SimpleGrid,
  Box,
  Text,
  Container,
  Center,
} from "@chakra-ui/react";
import { Navbar } from "@/components/Navbar";
import { CharacterModal } from "@/components/CharacterModal";

export default function Home() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    api
      .get("/characters")
      .then((res) => {
        setResults(res.data.data.results);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Marvel Heros</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Container
        maxW="1400px"
        py={50}
        alignItems={"center"}
        display={"flex"}
        flexDirection={"column"}
      >
        <SimpleGrid columns={4} spacing={10}>
          {results.map((person) => (
            <Box
              key={person.id}
              borderBottom={"5px solid"}
              borderColor={"red.500"}
              rounded={"lg"}
              maxW={200}
              h="100%"
              bg="gray.100"
            >
              <Image
                src={`${person.thumbnail.path}.${person.thumbnail.extension}`}
                w="200"
                roundedTop={"lg"}
                h="200"
              />
              <Center flexDirection="column" justifyContent={"space-between"}>
                <Text p={2} fontWeight={"semibold"}>
                  {person.name}
                </Text>
                <CharacterModal person={person}/>
              </Center>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}
