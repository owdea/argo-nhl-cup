const NumberChoice = ({ title, numbers, value, onChange }) => {

    const handleChange = (e) => {
        const value = Number(e.target.value);
        onChange(value);
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <div className="number-choice">
            <span>{title}</span>
            <form>
                {numbers.map((n) => (
                    <label key={n}>
                        <input
                            type="radio"
                            name={title}
                            value={n}
                            checked={value === n}
                            onChange={handleChange}
                        />
                        {n}
                    </label>
                ))}
            </form>
        </div>
    );
};

export default NumberChoice;
