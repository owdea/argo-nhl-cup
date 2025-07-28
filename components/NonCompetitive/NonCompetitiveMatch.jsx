import {formatDate} from "../../services/general.js";

const NonCompetitiveMatch = ({match, classes}) => {
    const matchData = {
        "date": formatDate(match.created_at),
        "away_player": match.away_team.player_name,
        "away_goals": match.away_goals,
        "home_player": match.home_team.player_name,
        "home_goals": match.home_goals,
        "overtime": match.overtime
    }
    console.log(matchData)
    return (
        <>
            <span className={classes}>{matchData.date}</span>
            <span className={classes}>{matchData.away_player}</span>
            <span className={classes}>{matchData.away_goals}</span>
            <span className={classes}>VS</span>
            <span className={classes}>{matchData.home_goals}</span>
            <span className={classes}>{matchData.home_player}</span>
            <span className={classes}>
                <input type="checkbox" checked={matchData.overtime} readOnly disabled={true}/>
            </span>
            <span className={classes}></span>
        </>
    )
}

export default NonCompetitiveMatch