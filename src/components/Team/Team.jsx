import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function Team() {
  const params = useParams();
  // console.log(params.id);
  const [players, setPlayers] = useState([]);
  // const [currentTeam, setCurrentTeam] = useState([]);
  const [currentTeamStats, setCurrentTeamStats] = useState([]);
  const [teamStandings, setTeamStandings] = useState(undefined);
  // console.log(params);

  const baseURL = process.env.REACT_APP_BASE_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  const host = process.env.REACT_APP_API_HOST;

  // const getCurrentTeam = async () => {
  //   const options = {
  //     method: "GET",
  //     url: baseURL + "/teams",
  //     params: params,
  //     headers: {
  //       "X-RapidAPI-Key": apiKey,
  //       "X-RapidAPI-Host": host,
  //     },
  //   };

  //   await axios
  //     .request(options)
  //     .then((response) => {
  //       console.log(response.data.response[0]);
  //       setCurrentTeam(response.data.response[0]);
  //     })
  //     .catch((error) => {
  //       console.log(error, "error");
  //     });
  // };

  const getCurrentTeamStats = async () => {
    const options = {
      method: "GET",
      url: baseURL + "/teams/statistics",
      params: {
        id: params.id,
        season: new Date().getFullYear(),
      },
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": host,
      },
    };

    await axios
      .request(options)
      .then((response) => {
        console.log("teamStats :", response.data.response[0]);
        setCurrentTeamStats(response.data.response[0]);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const getTeamStandings = () => {
    const options = {
      method: "GET",
      url: baseURL + "/standings",
      params: {
        league: "standard",
        season: new Date().getFullYear(),
        team: params.id,
      },
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": host,
      },
    };
    console.log("coucou");
    axios
      .request(options)
      .then((response) => {
        console.log("Standings :", response.data.response[0]);
        setTeamStandings(response.data.response[0]);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const getPlayersList = async () => {
    const options = {
      method: "GET",
      url: baseURL + "/players",
      params: {
        team: params.id,
        season: new Date().getFullYear(),
      },
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": host,
      },
    };

    await axios
      .request(options)
      .then((response) => {
        console.log("Players :", response.data.response);
        setPlayers(response.data.response);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  useEffect(() => {
    getTeamStandings();
    getCurrentTeamStats();
    getPlayersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("2", teamStandings);
  return (
    <div className="team-container">
      <h2>Team {!teamStandings ? "loading" : teamStandings.team.name}:</h2>
      <img src="" alt="" />
      <div className="team-stats">
        <div className="team-rank">
          <h3>Rank</h3>
        </div>
      </div>
      <div className="players-container">
        {players.map((player) => (
          <div key={player.id} className="player-card">
            <div className="player-photo"></div>
            <div className="player-item">
              <Link to={`/player/${player.id}`}>
                {player.firstname} {player.lastname}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
