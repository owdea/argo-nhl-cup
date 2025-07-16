import { supabase } from '../lib/supabaseClient'

// 1) Načíst poslední aktivní nastavení
export async function fetchCurrentSettings() {
    return supabase
        .from('options')
        .select('id, match_count, playoff_series_length')
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
export async function insertSettings({ matchCount, playoffLength }) {
    // a) nový řádek v options
    const { data: opt, error } = await supabase
        .from('options')
        .insert({
            match_count: matchCount,
            playoff_series_length: playoffLength,
            is_active: true
        })
        .select('id')
        .single()
    if (error) throw error
    return opt
}
