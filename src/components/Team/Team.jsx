import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function Team() {
  const params = useParams();
  const [players, setPlayers] = useState([]);
  const [currentTeam, setCurrentTeam] = useState([]);
  console.log(params);

  const baseURL = process.env.REACT_APP_BASE_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  const host = process.env.REACT_APP_API_HOST;

  const getCurrentTeam = async () => {
    const options = {
      method: "GET",
      url: baseURL + "/teams",
      params: params,
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": host,
      },
    };

    await axios
      .request(options)
      .then((response) => {
        console.log(response.data.response[0]);
        setCurrentTeam(response.data.response[0]);
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
        console.log(response.data.response);
        setPlayers(response.data.response);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  useEffect(() => {
    getPlayersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCurrentTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(currentTeam);
  return (
    <div className="team-container">
      <h2>Team {currentTeam.name}</h2>
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
