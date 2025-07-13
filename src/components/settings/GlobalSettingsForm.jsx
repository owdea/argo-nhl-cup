import React, { useState, useEffect } from 'react'
import { fetchCurrentSettings, deactivateSettings, insertSettings } from '../../services/settings'
import PlayersNamesInput from './PlayersNamesInput.jsx'
import NumberChoice from './NumberChoice.jsx'
import Button from '../button.jsx'

export default function GlobalSettingsForm() {
    const [names, setNames] = useState([''])
    const [matchesCount, setMatchesCount] = useState()
    const [playoffLength, setPlayoffLength] = useState()
    const [loading, setLoading] = useState(false)
    const [initLoading, setInitLoading] = useState(true)

    useEffect(() => {
        ;(async () => {
            const { data, error } = await fetchCurrentSettings()
            if (!error && data) {
                setMatchesCount(data.match_count)
                setPlayoffLength(data.playoff_series_length)
                const players = data.option_players.map(p => p.player_name)
                setNames(players.length ? [...players, ''] : ['',''])
            }
            setInitLoading(false)
        })()
    }, [])

    const handleSave = async () => {
        const valid = names.filter(n => n.trim() !== '')
        if (valid.length < 2 || !matchesCount || !playoffLength) {
            alert('Doplňte všechno potřebné')
            return
        }

        setLoading(true)
        try {
            const { data: current } = await fetchCurrentSettings()

            const same =
                current &&
                current.match_count === matchesCount &&
                current.playoff_series_length === playoffLength &&
                current.option_players.map(p => p.player_name).every((n,i) => n === valid[i]) &&
                valid.length === current.option_players.length

            if (same) {
                alert('Nastavení se nezměnilo.')
            } else {
                await deactivateSettings()
                await insertSettings({
                    players: valid,
                    matchCount: matchesCount,
                    playoffLength
                })
                alert('Nastavení uloženo!')
            }
        } catch (e) {
            console.error(e)
            alert('Chyba: ' + e.message)
        } finally {
            setLoading(false)
        }
    }

    if (initLoading) return <div>Načítám aktuální nastavení…</div>
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
                value={playoffLength}
                onChange={setPlayoffLength}
            />
            <PlayersNamesInput value={names} onChange={setNames} />
            <Button
                text={loading ? 'Ukládám…' : 'Uložit nastavení'}
                onClick={handleSave}
                disabled={loading}
            />
        </div>
    )
}
