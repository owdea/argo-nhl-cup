import React from 'react';

const PlayersNamesInput = ({ value, onChange }) => {
    const handleChange = (idx) => (e) => {
        const newNames = [...value];
        newNames[idx] = e.target.value;

        const filled = newNames.filter((n) => n.trim() !== '');
        onChange(filled.length ? [...filled, ''] : ['']);
    };

    const handleRemove = (idx) => () => {
        const newNames = value.filter((_, i) => i !== idx);
        const filled = newNames.filter((n) => n.trim() !== '');
        onChange(filled.length ? [...filled, ''] : ['']);
    };

    return (
        <div className="players-names-input">
            {value.map((name, idx) => (
                <div key={idx} className="player-input-row">
                    <input
                        type="text"
                        value={name}
                        onChange={handleChange(idx)}
                        placeholder={`Soutěžící ${idx + 1}`}
                    />
                    {
                        idx < value.length - 1 && (
                            <button
                                type="button"
                                onClick={handleRemove(idx)}
                                aria-label="Odstranit soutěžícího"
                                style={{ cursor: 'pointer' }}
                            >
                                ×
                            </button>
                        )
                    }
                </div>
            ))}
        </div>
    );
};

export default PlayersNamesInput;
