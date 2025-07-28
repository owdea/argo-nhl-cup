import {getMatches} from "../../services/nonCompetitiveLeague.js";
import {useState, useEffect} from "react";
import NonCompetitiveMatch from "./NonCompetitiveMatch.jsx";

const NonCompetitiveMatches = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        getMatches().then((data) => {
            setMatches(data);
        });
    }, []);
    const darkCSSClass = "Non-Competitive-Matches__dark-bg heading"
    return (
        <div className={"Non-Competitive-Matches"}>
            <h2>Match history</h2>
            <div className={"Non-Competitive-Matches__Table"}>
                <span className={darkCSSClass}>Date</span>
                <span className={darkCSSClass}>Away</span>
                <span className={darkCSSClass}>G</span>
                <span className={darkCSSClass}></span>
                <span className={darkCSSClass}>G</span>
                <span className={darkCSSClass}>Home</span>
                <span className={darkCSSClass}>Overtime</span>
                <span className={darkCSSClass}>Edit</span>
                {matches.map((m, i) => {
                    return (
                        <NonCompetitiveMatch
                            match={m}
                            key={i}
                            classes={i % 2 === 1 ? "Non-Competitive-Matches__dark-bg" : ""}
                        />
                    )
                })}
            </div>
        </div>
    )


}

export default NonCompetitiveMatches;