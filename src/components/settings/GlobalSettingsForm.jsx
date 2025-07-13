import React, { useState, useEffect } from 'react';
import PlayersNamesInput from "./PlayersNamesInput.jsx";
import NumberChoice from "./NumberChoice.jsx";
import Button from "../button.jsx";
import { supabase } from '../../lib/supabaseClient'

const GlobalSettingsForm = () => {
    const [names, setNames] = useState(['']);
    const [matchesCount, setMatchesCount] = useState();
    const [playoffMatchesCount, setPlayoffMatchesCount] = useState();
    const [loading, setLoading] = useState(false);
    const [initLoading, setInitLoading] = useState(true);

    // Krátká funkce pro načtení posledních nastavení z DB
    const fetchLatestSettings = async () => {
        console.log("Fetchuji data")
        setInitLoading(true);
        const { data, error } = await supabase
            .from('options')
            .select('match_count, playoff_series_length, option_players(player_name)')
            .order('updated_at', { ascending: false })
            .limit(1)
            .single();

        if (error) {
            console.error('Chyba při načítání nastavení:', error);
        } else if (data) {
            setMatchesCount(data.match_count);
            setPlayoffMatchesCount(data.playoff_series_length);
            const playerNames = data.option_players.map(p => p.player_name);
            setNames(playerNames.length ? playerNames : ['']);
        }
        setInitLoading(false);
    };

    useEffect(() => {
        fetchLatestSettings();
    }, []);

    const handleSave = async () => {
        const validNames = names.filter(n => n.trim() !== '');
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

    if (initLoading) {
        return <div>Načítám aktuální nastavení…</div>;
    }

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
    );
}

export default GlobalSettingsForm;
