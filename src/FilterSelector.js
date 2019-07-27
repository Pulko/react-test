import React, { Component } from 'react';

const FilterSelector = (props) => {

    function onSubmit(e) {
        e.preventDefault();
        const filterType = e.target.value;
        props.onFilterTypeSubmit && props.onFilterTypeSubmit(filterType);
    }

    return (
        <div>
            Filter by <select name="cafilterTypes" onChange={(e) => onSubmit(e)}>
                <option value="">None</option>
                <option value="id">IDs</option>
                <option value="title">Titles</option>
            </select>
        </div>

    );
}

export default FilterSelector