import { useEffect, useState, useMemo } from "react";
import { getTableData } from "../../services/nonCompetitiveLeague.js";

const NonCompetitiveTable = () => {
    const [tableData, setTableData] = useState([]);
    const [sortKey, setSortKey]   = useState("avg_points_per_match");
    const [desc, setDesc]         = useState(true);

    useEffect(() => {
        getTableData().then((data) => {
            setTableData(data);
        });
    }, []);

    const headings = [
        ["Player", "Player"],
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

    // property names in same order as headings
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

    // universal sort handler
    const handleSort = (key) => {
        if (key === sortKey) {
            setDesc(d => !d);
        } else {
            setSortKey(key);
            setDesc(true);
        }
    };

    // memoized sorted data
    const sortedData = useMemo(() => {
        return [...tableData].sort((a, b) => {
            const aV = a[sortKey] ?? 0;
            const bV = b[sortKey] ?? 0;
            return desc ? bV - aV : aV - bV;
        });
    }, [tableData, sortKey, desc]);

    return (
        <div className="table-container">
            <h2>Non Competitive League</h2>
            <div className="table Non-Competitive-Table">
                {/* 1) Heading */}
                {headings.map(([short, long], hi) => (
                    <span
                        key={`h-${hi}`}
                        className="short-desc"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSort(fields[hi])}
                    >
            <span className="long-desc">{long}</span>
                        {short}
                        {sortKey === fields[hi] && (desc ? " ▼" : " ▲")}
          </span>
                ))}

                {/* 2) Table data */}
                {sortedData.map((row, ri) =>
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
