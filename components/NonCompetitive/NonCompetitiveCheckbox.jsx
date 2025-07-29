const NonCompetitiveCheckbox = ({hasOvertime, setHasOvertime}) => {
    return (
        <label>
            <input
                type="checkbox"
                checked={hasOvertime}
                onChange={(e) => setHasOvertime(e.target.checked)}
            />
        </label>
    )
}

export default NonCompetitiveCheckbox;