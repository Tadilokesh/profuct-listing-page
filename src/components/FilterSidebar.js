// src/components/FilterSidebar.js
import React from 'react';
import { Form, Accordion } from 'react-bootstrap';

const FilterSidebar = ({ filterOptions, onFilterChange, onClose, isMobile }) => {
  // Filter categories with their options
  const filterCategories = [
    {
      id: 'customizable',
      label: 'CUSTOMIZABLE',
      type: 'checkbox',
      options: [{ value: true, label: 'Customizable' }]
    },
    {
      id: 'ideal',
      label: 'IDEAL FOR',
      type: 'dropdown',
      options: [
        { value: 'All', label: 'All' },
        { value: 'Men', label: 'Men' },
        { value: 'Women', label: 'Women' },
        { value: 'Baby & Kids', label: 'Baby & Kids' }
      ]
    },
    {
      id: 'occasion',
      label: 'OCCASION',
      type: 'dropdown',
      options: [
        { value: 'All', label: 'All' },
        { value: 'Casual', label: 'Casual' },
        { value: 'Formal', label: 'Formal' },
        { value: 'Party', label: 'Party' },
        { value: 'Travel', label: 'Travel' }
      ]
    },
    {
      id: 'work',
      label: 'WORK',
      type: 'dropdown',
      options: [
        { value: 'All', label: 'All' },
        { value: 'Handmade', label: 'Handmade' },
        { value: 'Machine-made', label: 'Machine-made' },
        { value: 'Artisanal', label: 'Artisanal' }
      ]
    },
    {
      id: 'fabric',
      label: 'FABRIC',
      type: 'dropdown',
      options: [
        { value: 'All', label: 'All' },
        { value: 'Cotton', label: 'Cotton' },
        { value: 'Leather', label: 'Leather' },
        { value: 'Wool', label: 'Wool' },
        { value: 'Synthetic', label: 'Synthetic' }
      ]
    },
    {
      id: 'segment',
      label: 'SEGMENT',
      type: 'dropdown',
      options: [
        { value: 'All', label: 'All' },
        { value: 'Luxury', label: 'Luxury' },
        { value: 'Budget', label: 'Budget' },
        { value: 'Premium', label: 'Premium' }
      ]
    },
    {
      id: 'suitable',
      label: 'SUITABLE FOR',
      type: 'dropdown',
      options: [
        { value: 'All', label: 'All' },
        { value: 'Gifting', label: 'Gifting' },
        { value: 'Personal Use', label: 'Personal Use' },
        { value: 'Collection', label: 'Collection' }
      ]
    }
  ];

  // Function to handle "Unselect all" for a category
  const handleUnselectAll = (categoryId) => {
    onFilterChange(categoryId, []);
  };

  return (
    <div className="filter-sidebar pe-md-4">
      {isMobile && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Filters</h5>
          <button 
            onClick={onClose} 
            className="btn-close"
            aria-label="Close filters"
          ></button>
        </div>
      )}

      {/* Customizable filter */}
      <div className="mb-4 pb-3 border-bottom">
        <Form.Check
          type="checkbox"
          id="customizable"
          label="CUSTOMIZABLE"
          checked={filterOptions.customizable}
          onChange={() => onFilterChange('customizable', !filterOptions.customizable)}
          className="mb-1 fw-medium"
        />
      </div>

      {/* Other filter categories */}
      {filterCategories.slice(1).map((category) => (
        <div key={category.id} className="mb-4 pb-3 border-bottom">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="filter-group-title mb-0 fw-medium">{category.label}</h6>
            <i className="bi bi-chevron-up"></i>
          </div>
          
          <div className="mb-2">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted">{filterOptions[category.id].length > 0 ? filterOptions[category.id].join(', ') : 'All'}</span>
              {filterOptions[category.id].length > 0 && (
                <button 
                  className="btn btn-link p-0 text-secondary small"
                  onClick={() => handleUnselectAll(category.id)}
                >
                  Unselect all
                </button>
              )}
            </div>
          </div>

          <Form>
            {category.options.map((option) => (
              <Form.Check
                key={option.value}
                type="checkbox"
                id={`${category.id}-${option.value}`}
                label={option.label}
                checked={filterOptions[category.id].includes(option.value)}
                onChange={() => onFilterChange(category.id, option.value)}
                className="mb-1"
              />
            ))}
          </Form>
        </div>
      ))}
      
      {/* For mobile, add apply filters button */}
      {isMobile && (
        <div className="d-grid gap-2 d-md-none mt-4">
          <button 
            className="btn btn-dark" 
            onClick={onClose}
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;