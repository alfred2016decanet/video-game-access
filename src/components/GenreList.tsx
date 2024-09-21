import { useEffect, useState } from "react";
import { CanceledError } from "../services/api-client";
import GenreService, { Genre } from "../services/genre-service";
import {
  Button,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";

interface Props {
  onSelectGenre: (genre: Genre) => void;
}

const GenreList = ({ onSelectGenre }: Props) => {
  const [currentGenre, setCurrentGenre] = useState<Genre | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = GenreService.getAll<Genre>();
    request
      .then((response) => {
        setGenres(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setErrorMessage(error.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  if (errorMessage) return null;

  if (loading) return <Spinner />;

  return (
    <>
      <Heading fontSize="2xl" marginTop={9} marginBottom={3}>
        Genres
      </Heading>
      <List>
        {genres.map((genre) => (
          <ListItem key={genre.id} paddingY="5px">
            <HStack>
              <Image
                boxSize="32px"
                borderRadius={8}
                objectFit="cover"
                src={genre.image_background}
              />
              <Button
                whiteSpace="normal"
                textAlign="left"
                fontWeight={genre.id === currentGenre?.id ? "bold" : "normal"}
                onClick={() => {
                  setCurrentGenre({ ...genre });
                  onSelectGenre(genre);
                }}
                fontSize="md"
                variant="link"
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
