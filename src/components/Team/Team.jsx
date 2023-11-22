import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function Team() {
  const [players, setPlayers] = useState([]);
  const params = useParams();
  console.log(params);

  console.log(params.id);
  console.log(new Date().getFullYear());

  const baseURL = process.env.REACT_APP_BASE_URL;
  const apiKey = process.env.REACT_APP_API_KEY;

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
        "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
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

  return (
    <div className="team-container">
      <h2>Team {params.id}</h2>
      <div className="players-container">
        {players.map((player) => (
          <div key={player.id} className="player-card">
            <div key={player.id} className="player-photo"></div>
            <div key={player.id} className="player-item">
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
