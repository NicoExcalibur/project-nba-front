import React, { useEffect, useState } from "react";
import "./TeamList.css";
import axios from "axios";

function TeamList() {
  const [teams, setTeams] = useState([]);

  const getTeamList = async () => {
    // let teamsApi = [];
    const options = {
      method: "GET",
      url: "https://api-nba-v1.p.rapidapi.com/teams",
      headers: {
        "X-RapidAPI-Key": "0e6190caecmsh8fa6ff975750c12p15cc8fjsn1434a49d0401",
        "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
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
  }, []);

  return (
    <>
      <div className="teamlist-container">
        <h2>La liste des equipes :</h2>

        {console.log(teams)}
        <div className="teams-container">
          {teams.map((team) => (
            <div key={team.id} className="team-card">
              <div key={team.abbreviation} className="team-logo">
                <img src={`${team.logo}`} alt="" />
              </div>
              <div key={team.id} className="team-item">
                {team.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TeamList;
