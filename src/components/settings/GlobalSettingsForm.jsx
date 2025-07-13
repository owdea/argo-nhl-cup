import React, { useState } from 'react';
import PlayersNamesInput from "./PlayersNamesInput.jsx";


const GlobalSettingsForm = () => {
    const [names, setNames] = useState(['']);
    console.log(names)
    return (
        <div>
            <PlayersNamesInput
                value={names}
                onChange={setNames}
            />
        </div>
    )

}

export default GlobalSettingsForm;