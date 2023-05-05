import api from "@/pages/api/marvel";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Image,
  Text,
  Flex,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const CharacterModal = ({ person }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comics, setComics] = useState([]);

  useEffect(() => {
    if (isOpen) {
      api.get(`/characters/${person.id}/comics`).then((res) => {
        setComics(res.data.data.results);
      });
    }
  }, [isOpen]);

  return (
    <>
      <Button
        my={2}
        onClick={onOpen}
        colorScheme="red"
        bg="red.500"
        color="white"
      >
        Visualizar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{person.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={5}>
              <Image
                src={`${person.thumbnail.path}.${person.thumbnail.extension}`}
                w="200"
                rounded={"lg"}
                h="200"
              />
              <Text>
                {person.description
                  ? person.description
                  : "Nenhuma descrição encontrada."}
              </Text>
            </Flex>
            <Heading size="md" my={5}>
              Comics
            </Heading>
            <SimpleGrid
              columns={4}
              spacing={5}
              mt={5}
              maxH={"md"}
              overflow={"auto"}
            >
              {comics.map((comic) => (
                <Flex direction={"column"} gap={2} key={comic.id}>
                  <Image
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    w="auto"
                    h="200"
                  />
                  <Text>{comic.title}</Text>
                </Flex>
              ))}
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
