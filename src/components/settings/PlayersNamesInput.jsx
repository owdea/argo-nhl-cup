import React from 'react';

const PlayersNamesInput = ({ value, onChange }) => {
    const handleChange = (idx) => (e) => {
        const newNames = [...value];
        newNames[idx] = e.target.value;

        const filled = newNames.filter((n) => n.trim() !== '');

        if (filled.length === 0) {
            onChange(['']);
            return;
        }

        onChange([...filled, '']);
    };

    return (
        <div className="players-names-input">
            {value.map((name, idx) => (
                <input
                    key={idx}
                    name={`Soutěžící ${idx + 1}`}
                    type="text"
                    value={name}
                    onChange={handleChange(idx)}
                    placeholder={`Soutěžící ${idx + 1}`}
                />
            ))}
        </div>
    );
};

export default PlayersNamesInput;
