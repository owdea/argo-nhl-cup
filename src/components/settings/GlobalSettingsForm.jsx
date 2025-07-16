import React, { useState, useEffect } from 'react'
import { fetchCurrentSettings, deactivateSettings, insertSettings } from '../../services/settings'
import NumberChoice from './NumberChoice.jsx'
import Button from '../button.jsx'

export default function GlobalSettingsForm() {
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
            }
            setInitLoading(false)
        })()
    }, [])

    const handleSave = async () => {
        if (!matchesCount || !playoffLength) {
            alert('Doplňte všechno potřebné')
            return
        }
        setLoading(true)
        try {
            const { data: current } = await fetchCurrentSettings()
            const same =
                current &&
                current.match_count === matchesCount &&
                current.playoff_series_length === playoffLength
            if (same) {
                alert('Nastavení se nezměnilo.')
            } else {
                await deactivateSettings()
                await insertSettings({ matchCount: matchesCount, playoffLength })
                alert('Nastavení uloženo!')
            }
        } catch (e) {
            console.error(e)
            alert('Chyba: ' + e.message)
        } finally {
            setLoading(false)
        }
    }

    if (initLoading) return <>Načítám aktuální nastavení…</>

    return (
        <div className="space-y-4">
            <NumberChoice
                label="Počet zápasů mezi soupeři"
                options={[2, 4, 6]}
                value={matchesCount}
                onChange={setMatchesCount}
            />
            <NumberChoice
                label="Počet zápasů v sérii playoff"
                options={[2, 3, 4, 5]}
                value={playoffLength}
                onChange={setPlayoffLength}
            />
            <Button onClick={handleSave} disabled={loading}>
                {loading ? 'Ukládám…' : 'Uložit nastavení'}
            </Button>
        </div>
    )
}
