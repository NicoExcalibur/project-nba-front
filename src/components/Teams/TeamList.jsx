import React, { useEffect, useState } from "react";
import axios from "axios";

function TeamList() {

    const [teams, setTeams] = useState([]);

    const getTeamList = async () => {
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

    return (
        <>
            <div className="container">
                La liste des equipes
            </div>
            { 
                // console.log(teams)
            }
            {
                teams.map((team) =>
                    <div key={ team.id } className="team-item">{ team.full_name }</div>
                )
            }
        </>
    
    );
}

export default TeamList;