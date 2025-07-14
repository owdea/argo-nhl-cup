const textInputWithLabel = ({value, onChange, title}) => {
    return (
        <div className="text-input-with-label">
            <h3>{title}</h3>
            <input
                name={title}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={title}
            />
        </div>
    )
}

export default textInputWithLabel;