import React, { useState } from 'react';
import PlayersNamesInput from "./PlayersNamesInput.jsx";
import NumberChoice from "./NumberChoice.jsx";
import Button from "../button.jsx";
import { supabase } from '../../lib/supabaseClient'


const GlobalSettingsForm = () => {
    const [names, setNames] = useState(['']);
    const [matchesCount, setMatchesCount] = useState();
    const [playoffMatchesCount, setPlayoffMatchesCount] = useState();
    const [loading, setLoading] = useState(false)

    const handleSave = async () => {
        // odfiltrujeme všechna jména, která jsou jen prázdné stringy
        const validNames = names.filter((n) => n.trim() !== '');

        // validace—teď kontrolujeme against validNames
        if (validNames.length < 2) {
            alert('Vyplňte alespoň 2 hráče');
            return;
        }
        if (!matchesCount || !playoffMatchesCount) {
            alert('Vyberte všechny potřebné hodnoty.');
            return;
        }

        setLoading(true);
        try {
            // 1) vložím do options a vyzvednu id
            const { data: option, error: err1 } = await supabase
                .from('options')
                .insert({
                    players_count: validNames.length,          // počet bez té prázdné položky
                    match_count: matchesCount,
                    playoff_series_length: playoffMatchesCount
                })
                .select('id')
                .single();
            if (err1) throw err1;

            // 2) payload jen z těch platných jmen
            const playersPayload = validNames.map((name) => ({
                option_id: option.id,
                player_name: name.trim(),
            }));

            const { error: err2 } = await supabase
                .from('option_players')
                .insert(playersPayload);
            if (err2) throw err2;

            alert('Nastavení uloženo!');
        } catch (error) {
            console.error(error);
            alert('Chyba při ukládání: ' + error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="global-settings-form">
            <NumberChoice
                title="Zápasy soupeřů v základní skupině"
                numbers={[2, 4, 6]}
                value={matchesCount}
                onChange={setMatchesCount}
            />
            <NumberChoice
                title="Počet nutných vítězství v PlayOff"
                numbers={[2, 3, 4]}
                value={playoffMatchesCount}
                onChange={setPlayoffMatchesCount}
            />
            <PlayersNamesInput
                value={names}
                onChange={setNames}
            />
            <Button
                text={loading ? 'Ukládám…' : 'Uložit nastavení'}
                onClick={handleSave}
                disabled={loading}
            />
        </div>
    )

}

export default GlobalSettingsForm;