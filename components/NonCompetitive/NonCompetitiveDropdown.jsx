import {useEffect, useState} from "react";
import {getCurrentPlayers} from "../../services/players.js";

const NonCompetitiveDropdown = (props) => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        (async () => {
            const { data, error } = await getCurrentPlayers()
            if (error) {
                console.error('Chyba při načítání hráčů:', error)
            } else {
                setPlayers(data)
            }
        })()
    }, []);

    return (
        <>
            <span>{props.title}</span>
            <select onChange={(e) => props.onChange(e.currentTarget.value)}>
                <option key={"default"}>---</option>
                {players.map((p, i) => (
                    <option key={i}>{p.player_name}</option>
                ))}
            </select>
        </>
    )
}
export default NonCompetitiveDropdown