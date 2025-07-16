import { supabase } from '../lib/supabaseClient'

export async function fetchCurrentPlayers() {
    return supabase
        .from('option_players')
        .select('player_name')
}

export async function deletePlayers(players) {
    return supabase
        .from('option_players')
        .delete()
        .in('player_name', players)
}

export async function insertPlayers(players) {
    const payload = players.map(name => ({ player_name: name.trim() }))
    const { error } = await supabase
        .from('option_players')
        .insert(payload)
    if (error) throw error
}
