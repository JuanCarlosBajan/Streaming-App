import { Center, Container, HStack, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSeries } from "../../services/content";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function ContentReproduction() {
  const query = useQuery();
  const navigate = useNavigate();

  const [type, setType] = useState("");
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [src, setSrc] = useState("");
  const [publishedAt, setPublishedAt] = useState("");

  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState([]);

  useEffect(() => {
    const getSeriesInfo = async () => {
      const contentCode = query.get("code");
      const type = query.get("type");
      if (!type || !contentCode) {
        goBack();
      }
      let data = {};

      if (type === "series") {
        data = await getSeries(contentCode);
      } else if (type === "movies") {
      } else {
        goBack();
      }

      if (data.ok) {
        setTitle(data.series.title);
        setDescription(data.series.description);
        setEpisodes(data.series.episodes);
        setPublishedAt(new Date(data.series.publishedAt).toLocaleDateString());
      } else {
        goBack();
      }
      setType(type);
    };
    getSeriesInfo();
  }, []);

  /**
   * Go to the previous state
   */
  const goBack = () => {
    navigate("/movies");
  };

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
        {type === "series" ? (
          <Select
            placeholder="Selecciona un episodio"
            onChange={($event) => {
              const episode = episodes.find(
                (ep) => ep.episodeCode === $event.target.value
              );
              setSrc(episode ? episode.url : "");
            }}
          >
            {episodes.map((episode) => (
              <option value={episode.episodeCode} key={episode.episodeCode}>
                {episode.name}
              </option>
            ))}
          </Select>
        ) : (
          ""
        )}

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
