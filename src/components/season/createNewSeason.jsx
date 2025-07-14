import {useState} from "react";
import TextInputWithLabel from "../textInputWithLabel.jsx";

const CreateNewSeason = () => {
    const [seasonName, setSeasonName] = useState();
    const [seasonTheme, setSeasonTheme] = useState();
    return (
        <div>
            <TextInputWithLabel
                value={seasonName}
                onChange={setSeasonName}
                title="Název sezony"
            />
            <TextInputWithLabel
                value={seasonTheme}
                onChange={setSeasonTheme}
                title="Téma sezony"
            />
        </div>
    )
}

export default CreateNewSeason;