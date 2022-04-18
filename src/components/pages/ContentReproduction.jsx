import { Center, Container, HStack, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getMovie,
  getSeries,
  markMovieFinished,
  markMovieStarted,
  markSeriesAsStarted,
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
  const [actors, setActors] = useState([]);
  const [director, setDirector] = useState();
  const [awards, setAwards] = useState([]);

  const [episodes, setEpisodes] = useState([]);

  const [adTime, setAdTime] = useState();
  const [showAd, setShowAd] = useState(false);

  const [started, setStarted] = useState(false);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
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
        setDirector(data.series.director);
        setStudio(data.series.studio);
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
        setStudio(data.movie.studio);
        setSrc(data.movie.url);
        setActors(data.movie.actors);
        setDirector(data.movie.director);
        setAwards(data.movie.awards);
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
  const onContentStart = async (event) => {
    if (!started) {
      if (type === "movie") {
        await markMovieStarted(
          contentCode,
          localStorage.getItem("profileCode")
        );
      } else {
        await markSeriesAsStarted(episode, localStorage.getItem("profileCode"));
      }
      setStarted(true);
    }
  };

  const onContentEnd = async (event) => {
    if (type === "movie") {
      await markMovieFinished(contentCode, localStorage.getItem("profileCode"));
    } else {
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
          <Text fontWeight={"bold"}>Director</Text>
          <Text>{director}</Text>
        </HStack>
        <HStack>
          <Text fontWeight={"bold"}>Estudio</Text>
          <Text>{studio}</Text>
        </HStack>
        <HStack>
          <Text fontWeight={"bold"}>Actores</Text>
          <Text>
            {actors.map((value, index) => {
              return (
                value.name +
                " " +
                value.lastName +
                (index === actors.length - 1 ? ". " : ", ")
              );
            })}
          </Text>
        </HStack>
        <HStack>
          <Text fontWeight={"bold"}>Premios</Text>
          <Text>
            {awards.map((value, index) => {
              return value.name + (index === awards.length - 1 ? ". " : ", ");
            })}
          </Text>
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
              setStarted(false);
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
              onStateChange={onContentStart}
            />
          ) : (
            ""
          )}
        </Center>
      </Container>
      {showAd ? (
        <AdPopup
          isOpen={showAd}
          contentType={type}
          contentCode={contentCode}
          handleClose={() => {
            setShowAd(false);
            if (adTime > 0) {
              createAdTimeout(adTime);
            }
          }}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default ContentReproduction;
