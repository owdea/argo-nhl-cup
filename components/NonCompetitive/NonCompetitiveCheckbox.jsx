const NonCompetitiveCheckbox = ({hasOvertime, setHasOvertime}) => {
    return (
        <label>
            <input
                type="checkbox"
                checked={hasOvertime}
                onChange={(e) => setHasOvertime(e.target.checked)}
            />
            Po prodloužení
        </label>
    )
}

export default NonCompetitiveCheckbox;