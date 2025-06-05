import React from 'react'
import { useState } from 'react';
import { Icons } from './icon/icons';

const Dropdown = ({ label, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className="dropdown-container flex gap-5"  onClick={toggleDropdown} style={{ position: 'relative', width: '200px' }}>
     <img src={Icons.jobTypeIcon} alt="jobType" className='w-[18px]' />
     <div className='flex justify-between w-full'>
        <label className='font-[500] text-[#787777]'>{selectedOption ? selectedOption.label : "Job type"}</label>
      <div 
        className="dropdown-header" 
        style={{
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
      
        <img src={ Icons.dropDownIcon} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} alt="" />
        
      </div>
      </div>
      {isOpen && (
        <div 
          className="dropdown-options"
          style={{
            position: 'absolute',
            top: '200%',
            left: '0',
            right: '0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: 'white',
            marginTop: '4px',
            zIndex: 10,
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
        >
          {options.map((option) => (
            <div 
              key={option.value}
              className="dropdown-option"
              onClick={() => handleOptionClick(option)}
              style={{
                padding: '10px',
                cursor: 'pointer',
                borderBottom: '1px solid #f0f0f0'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#f5f5f5'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const DropDownMenu = () => {
  const options = [ 
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Part-time', label: 'Part-time' },
    { value: ' Contract', label: ' Contract' },
    { value: 'Internship', label: 'Internship' },
  ];

  const handleChange = (option) => {
    console.log('Selected option:', option);
  };

  return (
  
    <Dropdown 
        options={options} 
        onChange={handleChange}
      />
  );
};

export default DropDownMenu;