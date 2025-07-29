import { useEffect, useState } from "react";
import { getTableData } from "../../services/nonCompetitiveLeague.js";

const NonCompetitiveTable = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        getTableData().then((data) => {
            setTableData(data);
        });
    }, []);

    const headings = [
        ["Player", ""],
        ["MP", "Matches Played"],
        ["W", "Wins"],
        ["OW", "Overtime Wins"],
        ["OL", "Overtime Losses"],
        ["L", "Losses"],
        ["GF", "Goals For"],
        ["GA", "Goals Against"],
        ["+/-", "Goal Difference"],
        ["PTS", "Points"],
        ["ØPTS", "Avg Points per Match"],
    ];

    // Pole property names ve stejném pořadí jako headings
    const fields = [
        "player",
        "matches_played",
        "wins",
        "overtime_wins",
        "overtime_losses",
        "losses",
        "goals_scored",
        "goals_conceded",
        "goal_difference",
        "points",
        "avg_points_per_match",
    ];

    return (
        <div className="table-container">
            <h2>Non Competitive League</h2>
            <div className="table Non-Competitive-Table">
                {/* 1) Heading */}
                {headings.map(([short, long], hi) => (
                <span key={`h-${hi}`} className="short-desc">
                    <span className="long-desc">{long}</span>
                    {short}
                </span>
                ))}

                {/* 2) Table data */}
                {tableData.map((row, ri) =>
                        fields.map((field, ci) => (
                    <span key={`r${ri}-c${ci}`}>
                  {row[field]}
                    </span>
                    ))
                )}
            </div>
        </div>
    );
};

export default NonCompetitiveTable;
