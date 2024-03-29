import React, { useEffect, useState } from "react";
import "./TeamList.css";
import axios from "axios";
import { Link } from "react-router-dom";

function TeamList() {
  const [teams, setTeams] = useState([]);

  const baseURL = process.env.REACT_APP_BASE_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  const host = process.env.REACT_APP_API_HOST;

  const getTeamList = async () => {
    const options = {
      method: "GET",
      url: baseURL + "/teams",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": host,
      },
    };

    await axios
      .request(options)
      .then((response) => {
        console.log(response.data.response);
        setTeams(response.data.response);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  useEffect(() => {
    getTeamList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="teamlist-container">
        <h2>La liste des equipes :</h2>

        {console.log(teams)}
        <div className="teams-container">
          {teams
            .filter(
              (team) => team.nbaFranchise === true && team.allStar === false
            )
            .map((team) => (
              <div key={team.id} className="team-card">
                <div className="team-logo">
                  <img src={`${team.logo}`} alt="" />
                </div>
                <div className="team-item">
                  <Link to={`/team/${team.id}`}>{team.name}</Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default TeamList;
