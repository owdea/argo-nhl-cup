import { supabase } from '../lib/supabaseClient'

// 1) Načíst poslední aktivní nastavení
export async function fetchCurrentSettings() {
    return supabase
        .from('options')
        .select('id, match_count, playoff_series_length, option_players(player_name)')
        .eq('is_active', true)
        .single()
}

// 2) Deaktivovat všechny dosud aktivní řádky
export async function deactivateSettings() {
    return supabase
        .from('options')
        .update({ is_active: false })
        .eq('is_active', true)
}

// 3) Vložit novou sadu nastavení + hráče
export async function insertSettings({ players, matchCount, playoffLength }) {
    // a) nový řádek v options
    const { data: opt, error: err1 } = await supabase
        .from('options')
        .insert({
            players_count: players.length,
            match_count: matchCount,
            playoff_series_length: playoffLength,
            is_active: true
        })
        .select('id')
        .single()
    if (err1) throw err1

    // b) payload pro option_players
    const payload = players.map(name => ({
        option_id: opt.id,
        player_name: name.trim()
    }))
    const { error: err2 } = await supabase
        .from('option_players')
        .insert(payload)
    if (err2) throw err2

    return opt
}
