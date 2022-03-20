import React from 'react';
import { useState } from 'react';

export default function Option({option, updateOptionList, updateFilteredList, filteredOptions}) {

  return (
     <div className="list-item">
       {filteredOptions.length === 0 ? 
       <li> 
          <input checked={option.checked} 
          className="checkbox-custom"
          type="checkbox" 
          value={option.value} 
          label={option.label} 
          onChange={(e) => updateOptionList(option.id, e.target.checked)}/>
          <span className="checkbox-custom">{option.label}</span> 
        </li> : 
        <li> 
          <input checked={option.checked} 
          className="checkbox-custom"
          type="checkbox" 
          value={option.value} 
          label={option.label} 
          onChange={(e) => updateFilteredList(option.id, e.target.checked)}/>
          <span className="checkbox-custom">{option.label}</span> 
        </li> }
    </div> 
  );
}