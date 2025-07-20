import NonCompetitiveDropdown from "./NonCompetitiveDropdown.jsx";
import {useState} from "react";
import NonCompetitiveNumber from "./NonCompetitiveNumber.jsx";
import {createNewMatch} from "../../services/players.js";

const NonCompetitiveForm = () => {
    const [homePlayer, setHomePlayer] = useState("")
    const [homeGoals, setHomeGoals] = useState(0)
    const [awayPlayer, setAwayPlayer] = useState("")
    const [awayGoals, setAwayGoals] = useState(0)
    console.log(
        {
            "awayPlayer": awayPlayer,
            "awayGoals": awayGoals,
            "homeGoals": homeGoals,
            "homePlayer": homePlayer
        }
    )
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
            <a
                onClick={() => createNewMatch({
                    awayPlayer,
                    awayGoals,
                    homePlayer,
                    homeGoals
                })}
            >
                Uložit
            </a>
        </div>
    )
}

export default NonCompetitiveForm;