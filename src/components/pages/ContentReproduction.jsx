import { Center, Container, HStack, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getMovie,
  getSeries,
  markMovieFinished,
  markSeriesFinished,
} from "../../services/content";
import { getCurrentUser, getUser } from "../../services/user";
import AdPopup from "../AdPopup";
import YouTube from "react-youtube";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function ContentReproduction() {
  const query = useQuery();
  const navigate = useNavigate();

  const [type, setType] = useState("");
  const [contentCode, setContentCode] = useState("");
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [src, setSrc] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [studio, setStudio] = useState("");
  const [episode, setEpisode] = useState(0);

  const [episodes, setEpisodes] = useState([]);

  const [adTime, setAdTime] = useState();
  const [showAd, setShowAd] = useState(false);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  useEffect(() => {
    const type = query.get("type");
    const contentCode = query.get("code");
    setContentCode(contentCode);
    setType(type);

    const getSeriesInfo = async () => {
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
        if (type === "movie" && frequency !== 0) {
          createAdTimeout(frequency);
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
        setTitle(data.movie.title);
        setDescription(data.movie.description);
        setPublishedAt(new Date(data.movie.publishedAt).toLocaleDateString());
        setStudio(data.movie.studio.name);
        setSrc(data.movie.url);
      } else {
        goBack();
      }
    };

    if (type === "series") {
      getSeriesInfo();
    } else if (type === "movie") {
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
  const createAdTimeout = (minutes) => {
    const i = setTimeout(function () {
      setShowAd(true);
      clearTimeout(i);
    }, 1000 * minutes);
  };

  /**
   * Go to the previous state
   */
  const goBack = () => {
    navigate("/movies");
  };

  // BEGIN CONTENT EVENTS
  const onContentStart = (event) => {};

  const onContentEnd = async (event) => {
    console.log(type);
    if (type === "movie") {
      await markMovieFinished(contentCode, localStorage.getItem("profileCode"));
    } else {
      console.log("finished");
      await markSeriesFinished(episode, localStorage.getItem("profileCode"));
    }
  };

  const onContentPaused = (event) => {};

  // END CONTENT EVENTS

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
              setEpisode($event.target.value);
              const episode = episodes.find(
                (ep) => ep.episodeCode === $event.target.value
              );
              setSrc(episode ? episode.url : "");
              if (adTime > 0) {
                createAdTimeout(adTime);
              }
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
          {src !== "" && !showAd ? (
            <YouTube
              videoId={src}
              opts={opts}
              onEnd={onContentEnd}
              onPause={onContentPaused}
              onPlay={onContentStart}
            />
          ) : (
            ""
          )}
        </Center>
      </Container>
      <AdPopup
        isOpen={showAd}
        handleClose={() => {
          setShowAd(false);
          if (adTime > 0) {
            createAdTimeout(adTime);
          }
        }}
      />
    </>
  );
}

export default ContentReproduction;
