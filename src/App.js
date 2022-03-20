import './App.css';
import OptionList from './components/OptionList';
import { useEffect,useState } from 'react';

//data to render the options

const data = [{id: 1,value: 1,label: 'option 1',checked: false},
              {id: 2,value: 2,label: 'option 2',checked: false},
              {id: 3,value: 3,label: 'option 3',checked: false},
              {id: 4,value: 4,label: 'option 4',checked: false},
              {id: 5,value: 5,label: 'option 5',checked: false},
              {id: 11,value: 11,label: 'option 11',checked: false},
              {id: 12,value: 12,label: 'option 12',checked: false}]

function App() {
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [allOptionsChecked, setAllOptionsChecked] = useState(false);
  const [allFilteredOptionsChecked, setAllFilteredOptionsChecked] = useState(false);
  
  // setting the data. triggered only when the component is first loaded
  useEffect(() => {
    setOptions(data);
  }, []);
  
  //trigger when the array dependencies [options, filteredOptions] are chenging
  //checking if all checkboxes are checked on when all options shown and when filtered options shown
  useEffect(()=> {
    if(options.length > 0) {
      const isAllOptionsChecked = options.every(option => option.checked == true);
      isAllOptionsChecked ? setAllOptionsChecked(true) : setAllOptionsChecked(false);
    }
    if(filteredOptions.length > 0) {
      const isAllFilteredOptionsChecked = filteredOptions.every(option => option.checked == true);
      isAllFilteredOptionsChecked ? setAllFilteredOptionsChecked(true) : setAllFilteredOptionsChecked(false);
    }

  }, [options, filteredOptions]);

  //triggered when 'select/deselect all' button is clicked when all options shown
  const ToggleSelectAllOptions = () => {
    !allOptionsChecked ? selectAllOptions() : deSelectAllOptions()
  }

  //triggered when 'select/deselect all' button is clicked when filtered options shown
  const ToggleSelectFilteredOptions = () => {
    !allFilteredOptionsChecked ? selectFilteredOptions() : deSelectFilteredOptions();
     updateAllOptionsOfFilteredSelection();
  }

  //updating all options when user is selecting a checkbox from filtered options
  const updateAllOptionsOfFilteredSelection = () => {
    filteredOptions.map((filteredOption) => {
      options.map((option) => {
        if(filteredOption.id === option.id) {
          option.checked = filteredOption.checked;
        }
      })
    })
      setOptions(options);
  }

  //selecting all the options on all options list
  const selectAllOptions = () => {
    options.map((option) => {
      option.checked = true;
      return option;
    })
    const optionsClone = options.map(option => ({...option}));
    setOptions(optionsClone);
    //updating the state that all options are checked
    setAllOptionsChecked(true);
  }

   //deselecting all the options on all options list
  const deSelectAllOptions = () => {
    options.map((option) => {
      option.checked = false;
      return option;
    });
    const optionsClone = options.map(option => ({...option}));
    setOptions(optionsClone);
    //updating the state that all options are unchecked
    setAllOptionsChecked(false);
  }

  //selecting all the options on filtered options list
  const selectFilteredOptions = () => {
    filteredOptions.map((option) => {
      option.checked = true;
      return option;
    });
    const filteredOptionsClone = filteredOptions.map(option => ({...option}));
    setFilteredOptions(filteredOptionsClone);
    //updating the state that filtered options are checked
    setAllFilteredOptionsChecked(true);
  }

  //deselecting all the options on filtered options list
  const deSelectFilteredOptions = () => {
    filteredOptions.map((option) => {
      option.checked = false;
      return option;
    });
    const filteredOptionsClone = filteredOptions.map(option => ({...option}));
    setFilteredOptions(filteredOptionsClone);
    //updating the state that filtered options are unchecked
    setAllFilteredOptionsChecked(false);
  }

  //triggered when checking a single checkbox from all options list
  const updateOptionList = (id, isChecked) => {
      const optionIndex = options.findIndex((option => option.id == id));
      options[optionIndex].checked = isChecked;
      const optionsClone = options.map(option => ({...option}));
      setOptions(optionsClone);
  }

  //triggered when checking a single checkbox from filtered options list
  //updating all options list
  const updateFilteredList = (id, isChecked) => {
    if (filteredOptions.length > 0) {
      const filteredIndex = filteredOptions.findIndex((option => option.id == id));
      filteredOptions[filteredIndex].checked = isChecked;
      const optionIndex = options.findIndex((option => option.id == id));
      options[optionIndex].checked = isChecked;
      const optionsClone = options.map(option => ({...option}));
      setOptions(optionsClone);
      const filteredOptionsClone = filteredOptions.map(option => ({...option}));
      setFilteredOptions(filteredOptionsClone);
    }
  }

  //triggered when filtering the list
  const searchOptions = (searchValue) => {
    if(searchValue.length === 0) {
      return setFilteredOptions([])
    } 
    //filtering according to label
    const filteredOptions = options.filter((option) => 
       option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
    const filteredOptionsClone = filteredOptions.map(option => ({...option}));
    setFilteredOptions(filteredOptionsClone);
  }

  return (
    <div className="App">
      <OptionList 
        options={options} 
        filteredOptions={filteredOptions} 
        allOptionsChecked={allOptionsChecked}
        allFilteredOptionsChecked={allFilteredOptionsChecked}
        updateOptionList={updateOptionList} 
        updateFilteredList={updateFilteredList}
        ToggleSelectAllOptions={ToggleSelectAllOptions}
        ToggleSelectFilteredOptions={ToggleSelectFilteredOptions} 
        searchOptions={searchOptions} 
      />
    </div>
  );
}

export default App;
