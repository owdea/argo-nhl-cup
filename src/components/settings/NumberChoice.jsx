import React from 'react'

const NumberChoice = ({ label, options, value, onChange }) => {
    const handleClick = (n) => {
        onChange(n)
    }

    return (
        <div>
            <span>{label}</span>
            <div>
                {options.map((n) => (
                    <button
                        key={n}
                        type="button"
                        onClick={() => handleClick(n)}
                    >
                        {n}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default NumberChoice
