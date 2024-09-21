import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./components/Header";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./services/genre-service";

function Layout() {
  const [currentGenre, setCurrentGenre] = useState<Genre | null>(null);
  const [currentSearchValue, setCurrentSearchValue] = useState("");
  const handleSelectGenre = (genre: Genre) => {
    setCurrentGenre(genre);
  };

  const handleSearch = (searchValue: string) => {
    setCurrentSearchValue(searchValue);
  };

  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "footer footer"`}
      gridTemplateRows={"50px 1fr 30px"}
      gridTemplateColumns={"150px 1fr"}
      h="200px"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
      width="100%"
    >
      <GridItem pl="2" bg="orange.300" area={"header"}>
        <Header onSearch={handleSearch} />
      </GridItem>
      <GridItem pl="2" bg="pink.300" area={"nav"}>
        <GenreList
          onSelectGenre={handleSelectGenre}
          selectedGenre={currentGenre}
        />
      </GridItem>
      <GridItem pl="2" bg="green.300" area={"main"}>
        Main
      </GridItem>
      <GridItem pl="2" bg="blue.300" area={"footer"}>
        Intégration réalisé par Luc Alfred MBIDA
      </GridItem>
    </Grid>
  );
}

export default Layout;
