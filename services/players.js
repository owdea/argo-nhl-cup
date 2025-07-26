import {supabase} from "../src/lib/supabaseClient.js";

export async function getCurrentPlayers () {
    return supabase
        .from("option_players")
        .select("player_name")
}

export async function createNewMatch ({ awayPlayer, awayGoals, homePlayer, homeGoals, validationTexts, setValidationTexts}) {
    setValidationTexts([])
    if (awayGoals === homeGoals) {
        setValidationTexts(prev => [...prev, "Góly jsou shodné"]);
    }
    if ((!awayPlayer || !homePlayer) || (homePlayer === "---" || awayPlayer === "---")) {
        setValidationTexts(prev => [...prev, "Zvolte oba hráče"]);
    }
    if ((homePlayer === awayPlayer) && !(homePlayer === "---" || awayPlayer === "---")) {
        setValidationTexts(prev => [...prev, "Hráči nesmí být shodní"]);
    }
    if (!validationTexts) return;
    console.log({
        "awayPlayer": awayPlayer,
        "awayGoals": awayGoals,
        "homePlayer": homePlayer,
        "homeGoals": homeGoals
        }
    )
    setValidationTexts(["create new match"])
}