import NonCompetitiveDropdown from "./NonCompetitiveDropdown.jsx";
import {useState} from "react";
import NonCompetitiveNumber from "./NonCompetitiveNumber.jsx";
import {createNewMatch} from "../../services/players.js";

const NonCompetitiveForm = () => {
    const [homePlayer, setHomePlayer] = useState("")
    const [homeGoals, setHomeGoals] = useState(0)
    const [awayPlayer, setAwayPlayer] = useState("")
    const [awayGoals, setAwayGoals] = useState(0)

    const [validationTexts, setValidationTexts] = useState([]);
    return (
        <div className={"NonCompetitiveForm"}>
            <div className={"NonCompetitiveFormInput"}>
                <NonCompetitiveDropdown
                    title={"Host"}
                    onChange={setAwayPlayer}
                />
                <NonCompetitiveNumber
                    title={"GH"}
                    onChange={setAwayGoals}
                />
                vs
                <NonCompetitiveNumber
                    title={"GD"}
                    onChange={setHomeGoals}
                />
                <NonCompetitiveDropdown
                    title={"Domácí"}
                    onChange={setHomePlayer}
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
                onClick={() => createNewMatch({
                    awayPlayer,
                    awayGoals,
                    homePlayer,
                    homeGoals,
                    validationTexts,
                    setValidationTexts
                })}
            >
                Uložit
            </a>
        </div>
    )
}

export default NonCompetitiveForm;