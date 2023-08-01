import React from 'react'

const Select = ({ options }) => {
    return (
        //Select that recive a list of options from a fetch
        <select>
            <option selected value={options}>
                Choose an option
            </option>
            {options.map((option) => (
                <option key={option.id}>{option.name}</option>
            ))}
        </select>
    );
};

Select.defaultProps = {
    options: [],
}

export default Select
