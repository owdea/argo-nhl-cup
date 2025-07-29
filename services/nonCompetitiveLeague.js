import {supabase} from "../src/lib/supabaseClient.js";

export async function createNewMatch({ awayPlayer, awayGoals, homePlayer, homeGoals, hasOvertime, setValidationTexts }) {
    setValidationTexts([])
    // Krok 1: Zjisti ID hráčů podle jména
    const { data: players, error: playerError } = await supabase
        .from("option_players")
        .select("id, player_name")
        .in("player_name", [homePlayer, awayPlayer]);

    if (playerError || !players) {
        setValidationTexts(prev => [...prev, "Chyba při získávání hráčů"])
        return;
    }

    const home = players.find(p => p.player_name === homePlayer);
    const away = players.find(p => p.player_name === awayPlayer);

    if (!home || !away) {
        setValidationTexts(prev => [...prev, "Hráči nebyli nalezeni"])
        return;
    }

    // Krok 2: Validace vstupů
    if (home.id === away.id) {
        setValidationTexts(prev => [...prev, "Hráči se nemohou shodovat"])
        return;
    }

    // Krok 3: Uložení zápasu
    const { error: insertError } = await supabase.from("non_competitive_matches").insert([
        {
            home_team: home.id,
            away_team: away.id,
            home_goals: parseInt(homeGoals),
            away_goals: parseInt(awayGoals),
            overtime: hasOvertime,
        }
    ]);

    if (insertError) {
        console.error("Chyba při ukládání zápasu", insertError);
    } else {
        console.log("Zápas úspěšně uložen");
    }
}


export async function getMatches () {
    const { data, error } = await supabase
        .from('non_competitive_matches')
        .select(`
        *,
        home_team ( player_name ),
        away_team ( player_name )
      `);
    return data;
}

export async function getTableData () {
    const {data, error} = await supabase
        .from('non_competitive_leaderboard')
        .select('*')
    return data
}
