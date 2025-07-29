import NonCompetitiveDropdown from "./NonCompetitiveDropdown.jsx";
import {useState} from "react";
import NonCompetitiveNumber from "./NonCompetitiveNumber.jsx";
import {createNewMatch} from "../../services/nonCompetitiveLeague.js";
import NonCompetitiveCheckbox from "./NonCompetitiveCheckbox.jsx";

const NonCompetitiveForm = () => {
    const [homePlayer, setHomePlayer] = useState("")
    const [homeGoals, setHomeGoals] = useState(0)
    const [awayPlayer, setAwayPlayer] = useState("")
    const [awayGoals, setAwayGoals] = useState(0)
    const [hasOvertime, setHasOvertime] = useState(false)

    const [validationTexts, setValidationTexts] = useState([]);
    return (
        <div className={"Non-Competitive-Form"}>
            <h2>New Match</h2>
            <div className={"Non-Competitive-Form__Inputs"}>
                <span>Away</span>
                <span>Goals</span>
                <span></span>
                <span>Goals</span>
                <span>Home</span>
                <span>Overtime</span>
                <NonCompetitiveDropdown
                    onChange={setAwayPlayer}
                />
                <NonCompetitiveNumber
                    onChange={setAwayGoals}
                />
                <span>vs</span>
                <NonCompetitiveNumber
                    onChange={setHomeGoals}
                />
                <NonCompetitiveDropdown
                    onChange={setHomePlayer}
                />
                <NonCompetitiveCheckbox
                    hasOvertime={hasOvertime}
                    setHasOvertime={setHasOvertime}
                />
            </div>
            {validationTexts.length > 0 && (
                <ul>
                    {validationTexts.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            )}
            <a
                className={"Submit-Button"}
                onClick={() => createNewMatch({
                    awayPlayer,
                    awayGoals,
                    homePlayer,
                    homeGoals,
                    hasOvertime,
                    setValidationTexts,
                    setAwayPlayer,
                    setAwayGoals,
                    setHomePlayer,
                    setHomeGoals,
                    setHasOvertime,
                })}
            >
                Add Match
            </a>
        </div>
    )
}

export default NonCompetitiveForm;