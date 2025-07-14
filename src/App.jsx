import './css/main.css';
import GlobalSettingsForm from "./components/settings/GlobalSettingsForm.jsx";
import TableRegularSeason from "./components/season/tableRegularSeason.jsx";
import CreateNewSeason from "./components/season/createNewSeason.jsx";

function App() {


  return (
    <>
        <CreateNewSeason />
        <TableRegularSeason />
        <GlobalSettingsForm />
    </>
  )
}

export default App
