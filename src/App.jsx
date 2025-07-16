import './css/main.css'
import PlayersSettingsForm from "./components/settings/PlayersSettingsForm.jsx"
import GlobalSettingsForm from "./components/settings/GlobalSettingsForm.jsx"
import TableRegularSeason from "./components/season/tableRegularSeason.jsx"
import CreateNewSeason from "./components/season/createNewSeason.jsx"

function App() {
    return (
        <>
            <PlayersSettingsForm />
            <GlobalSettingsForm />
            <TableRegularSeason />
            <CreateNewSeason />
        </>
    )
}

export default App
