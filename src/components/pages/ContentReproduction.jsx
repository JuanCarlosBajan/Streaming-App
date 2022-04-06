import { Center, Container, HStack, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMovie, getSeries } from "../../services/content";
import { getCurrentUser, getUser } from "../../services/user";
import AdPopup from "../AdPopup";

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
  const [studio, setStudio] = useState("");

  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState([]);
  const [adTime, setAdTime] = useState();
  let [adInterval, setAdInterval] = useState();
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    const getSeriesInfo = async () => {
      const contentCode = query.get("code");
      if (!type || !contentCode) {
        goBack();
      }
      const data = await getSeries(contentCode);
      if (data.ok) {
        setTitle(data.series.title);
        setDescription(data.series.description);
        setEpisodes(data.series.episodes);
        setPublishedAt(new Date(data.series.publishedAt).toLocaleDateString());
        setStudio(data.series.studio.name);
      } else {
        goBack();
      }
    };
    const getUserInfo = async () => {
      const data = await getUser(getCurrentUser().userCode);
      if (data.ok) {
        const frequency = data.user.plan.adFrequency;
        setAdTime(frequency);
        if (frequency > 0) {
          createAdInterval(frequency);
        }
      }
    };
    const getMovieInfo = async () => {
      const contentCode = query.get("code");
      if (!type || !contentCode) {
        goBack();
      }
      const data = await getMovie(contentCode);
      if (data.ok) {
        setTitle(data.series.title);
        setDescription(data.series.description);
        setPublishedAt(new Date(data.series.publishedAt).toLocaleDateString());
        setStudio(data.series.studio.name);
      } else {
        goBack();
      }
    };

    const type = query.get("type");
    setType(type);
    if (type === "series") {
      getSeriesInfo();
    } else if (type === "movies") {
      getMovieInfo();
    } else {
      goBack();
    }
    getUserInfo(); // Get the user information
  }, []);

  /**
   * Sets a time interval
   * @param {number} minutes
   */
  const createAdInterval = (minutes) => {
    clearInterval();
    setAdInterval(
      setInterval(() => {
        if (!showAd) {
          setShowAd(true);
        }
      }, minutes * 15000)
    );
  };

  /**
   * Clear the interval
   */
  const resetAdInterval = () => {
    console.log(adInterval);
    clearInterval(adInterval);
  };

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
          <Text>{studio}</Text>
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
                {episode.season} - {episode.name}
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
      <AdPopup
        isOpen={showAd}
        handleClose={() => {
          setShowAd(false);
          createAdInterval(adTime);
        }}
      />
    </>
  );
}

export default ContentReproduction;
