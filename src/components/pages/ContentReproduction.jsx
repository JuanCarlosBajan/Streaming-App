import { Center, Container, HStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSeries } from "../../services/content";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function ContentReproduction() {
  const query = useQuery();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [src, setSrc] = useState("");

  useEffect(() => {
    const getSeriesInfo = async () => {
      const seriesCode = query.get("code");
      const data = await getSeries(seriesCode);
      if (data.ok) {
        console.log(data);
        setTitle(data.series.title);
        setDescription(data.series.description);
        setSrc(data.series.episodes[0].url);
      } else {
      }
    };
    getSeriesInfo();
  }, []);

  return (
    <>
      <Container maxW={"1000px"}>
        <Text fontSize={"5xl"}>{title}</Text>
        <Text textAlign={"justify"}>{description}</Text>
        <HStack>
          <Text fontWeight={"bold"}>Estudio</Text>
          <Text>Colocar aqui Estudio</Text>
        </HStack>
        <HStack>
          <Text fontWeight={"bold"}>Actores</Text>
          <Text>Colocar aqui actores principales</Text>
        </HStack>
        <HStack>
          <Text fontWeight={"bold"}>Fecha de estreno</Text>
          <Text>{publishedAt}</Text>
        </HStack>

        <Center className="content__video">
          {src !== "" ? (
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/iyFe0M0zQ0g"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            ""
          )}
        </Center>
      </Container>
    </>
  );
}

export default ContentReproduction;
