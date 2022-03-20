import React, { Component, useEffect } from 'react';
import Option from './Option';
import { useState } from "react";

export default function OptionList({ options, updateOptionList, ToggleSelectAllOptions, 
  ToggleSelectFilteredOptions, allOptionsChecked, allFilteredOptionsChecked, searchOptions, filteredOptions, updateFilteredList}) {
  const [buttonText, setButtonText] = useState('Select All');
  const [allOptionsMode, setAllOptionsMode] = useState(true);
  const [filteredOptionsMode, setFilteredOptionsMode] = useState(false);

  useEffect(() => {
    handleBtnText()
  },[allOptionsChecked, allFilteredOptionsChecked])

  const handleBtnText = () => {
    if(allOptionsMode && allOptionsChecked) {
      setButtonText('Deselect All');
    } else if(allOptionsMode && !allOptionsChecked ) {
      setButtonText('select All');
    } else if(filteredOptionsMode && allFilteredOptionsChecked) {
      setButtonText('Deselect All');
    } else if(filteredOptionsMode && !allFilteredOptionsChecked) {
      setButtonText('select All');
    }
  }

  const toggleSelection = () => {
    filteredOptions.length === 0 ? handleAllOptionsMode() : handleFilteredOptionsMode()
  }

  const handleAllOptionsMode = () => {
    setAllOptionsMode(true);
    setFilteredOptionsMode(false);
    ToggleSelectAllOptions()
  }

  const handleFilteredOptionsMode = () => {
    setAllOptionsMode(false);
    setFilteredOptionsMode(true);
    ToggleSelectFilteredOptions()
  }

  
  const handleSearchOptions = (userInput) => {
    if(userInput.length === 0) {
      setAllOptionsMode(true)
      setFilteredOptionsMode(false);
    } else {
      setAllOptionsMode(false)
      setFilteredOptionsMode(true);
    }
    searchOptions(userInput);
  }

  return (
        <div className='select-component'>
          <input type="text" placeholder='filter options' className='filter-options' onChange={(e) => handleSearchOptions(e.target.value)}/>
          <ul className="list">
              {filteredOptions.length === 0 ? options.map(option => (
                <Option key={option.id} option={option} updateOptionList={updateOptionList} filteredOptions={filteredOptions}/> 
              )) :
               filteredOptions.map(option => (
                <Option key={option.id} option={option} updateFilteredList={updateFilteredList} filteredOptions={filteredOptions}/> 
              ))} 

            {allOptionsMode && <button className='select-all-btn' onClick={() => toggleSelection()}>{buttonText}</button>}
            {!allOptionsMode && <button className='select-all-btn' onClick={() => toggleSelection()}>{buttonText}</button>}
          </ul>
    </div>
      
        
      );
} 