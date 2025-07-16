import React, { useState, useEffect } from 'react'
import { fetchCurrentPlayers, deletePlayers, insertPlayers } from '../../services/players'
import PlayersNamesInput from './PlayersNamesInput.jsx'
import Button from '../button.jsx'

export default function PlayersSettingsForm() {
    const [names, setNames] = useState([''])
    const [loading, setLoading] = useState(false)
    const [initLoading, setInitLoading] = useState(true)

    useEffect(() => {
        ;(async () => {
            const { data, error } = await fetchCurrentPlayers()
            if (!error && data) {
                const players = data.map(p => p.player_name)
                setNames(players.length ? [...players, ''] : ['', ''])
            }
            setInitLoading(false)
        })()
    }, [])

    const handleSave = async () => {
        const trimmed = names.map(n => n.trim()).filter(n => n !== '')
        const unique = Array.from(new Set(trimmed))
        if (unique.length < 2) {
            alert('Zadejte alespoň dvě unikátní jména soutěžících')
            return
        }
        setLoading(true)
        try {
            const { data: existingData, error: fetchError } = await fetchCurrentPlayers()
            if (fetchError) throw fetchError
            const existingNames = existingData.map(p => p.player_name)
            const toAdd = unique.filter(n => !existingNames.includes(n))
            const toRemove = existingNames.filter(n => !unique.includes(n))
            if (toAdd.length === 0 && toRemove.length === 0) {
                alert('Žádné změny jmen.')
            } else {
                if (toRemove.length > 0) await deletePlayers(toRemove)
                if (toAdd.length > 0) await insertPlayers(toAdd)
                alert('Jména soutěžících aktualizována!')
            }
        } catch (e) {
            console.error(e)
            alert('Chyba: ' + e.message)
        } finally {
            setLoading(false)
        }
    }

    if (initLoading) return <>Načítám jména soutěžících…</>

    return (
        <div className="space-y-4">
            <PlayersNamesInput value={names} onChange={setNames} />
            <Button onClick={handleSave} disabled={loading} text={loading ? 'Ukládám…' : 'Uložit jména'}>

            </Button>
        </div>
    )
}
