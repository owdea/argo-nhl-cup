import './css/main.css'
import NonCompetitiveForm from "../components/NonCompetitive/NonCompetitiveForm.jsx";
import NonCompetitiveMatches from "../components/NonCompetitive/NonCompetitiveMatches.jsx";
import NonCompetitiveTable from "../components/NonCompetitive/NonCompetitiveTable.jsx";

function App() {
    return (
        <>
            <NonCompetitiveTable/>
            <NonCompetitiveForm/>
            <NonCompetitiveMatches />
        </>

    )
}

export default App
