import {supabase} from "../src/lib/supabaseClient.js";

export async function getCurrentPlayers () {
    return supabase
        .from("option_players")
        .select("player_name")
}

