import {supabase} from "../src/lib/supabaseClient.js";

export async function getCurrentPlayers () {
    return supabase
        .from("option_players")
        .select("player_name")
}

export async function createNewMatch ({ awayPlayer, awayGoals, homePlayer, homeGoals}) {
    console.log({
        "awayPlayer": awayPlayer,
        "awayGoals": awayGoals,
        "homePlayer": homePlayer,
        "homeGoals": homeGoals
        }
    )
    console.log("create new match")
}