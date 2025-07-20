const NonCompetitiveNumber = (props) => {
    return (
        <>
            <span>{props.title}</span>
            <input
                onChange={(e) => props.onChange(parseInt(e.target.value) || 0)}
                type="number"
                min="0"
                placeholder={0}
            />
        </>
    )
}

export default NonCompetitiveNumber;