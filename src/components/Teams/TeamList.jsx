import React, { useEffect, useState } from "react";
import "./TeamList.css";
import axios from "axios";


function TeamList() {

    const [teams, setTeams] = useState([]);

    const getTeamList = async () => {
        // let teamsApi = [];
        const options = {
            method: 'GET',
            url: 'https://www.balldontlie.io/api/v1/teams',
            headers: {
              Accept: 'application/json',
            }
        };

        await axios
            .request(options)
            .then(response => { setTeams(response.data.data); })
            .catch(error => { console.log(error, "error"); });

    }
        
    useEffect(() => {
        getTeamList();
    }, []); 

    const baseUrl = "img/";

    return (
        <>
            <div className="teamlist-container">
                <h2>
                    La liste des equipes :
                </h2>

                { 
                    console.log(teams)
                }
                <div className="teams-container">
                {
                    teams.map((team) =>
                    <div key={team.id} className="team-card">
                        <div key={team.abbreviation} className="team-logo">
                        <img src={`${baseUrl}${ team.name }.svg`} alt=""/>
                        </div>
                        <div key={team.city} className="team-item">
                        { team.full_name }
                        </div>
                    </div>
                    
                    )
                }
                </div>
            </div>
        </>
    );
}

export default TeamList;