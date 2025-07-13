import React, { useState } from 'react';
import PlayersNamesInput from "./PlayersNamesInput.jsx";
import NumberChoice from "./NumberChoice.jsx";


const GlobalSettingsForm = () => {
    const [names, setNames] = useState(['']);
    const [playersCount, setPlayersCount] = useState();
    const [matchesPairs, setMatchesPairs] = useState()
    return (
        <div className="global-settings-form">
            <NumberChoice
                title="Počet vítězných zápasů"
                numbers={[2, 3, 4]}
                value={playersCount}
                onChange={setPlayersCount}
            />
            <NumberChoice
                title="Zápasy soupeřů v základní skupině"
                numbers={[2,4,6]}
                value={matchesPairs}
                onChange={setMatchesPairs}
            />
            <PlayersNamesInput
                value={names}
                onChange={setNames}
            />
        </div>
    )

}

export default GlobalSettingsForm;