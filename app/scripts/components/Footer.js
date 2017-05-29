import React from 'react';
import FilterLink from './FilterLink';

const Footer = () => {
    return (
        <p>
            Show:
            {' '}
            <FilterLink filter='all'>
                All
            </FilterLink>
            {', '}
            <FilterLink filter='completed'>
                Completed
            </FilterLink>
            {', '}
            <FilterLink filter='active'>
                Active
            </FilterLink>
        </p>
    );
};

export default Footer;
